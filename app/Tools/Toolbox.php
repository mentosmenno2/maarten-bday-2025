<?php

namespace Mentosmenno2\MaartenBday2025\Tools;

use getID3;
use Mentosmenno2\MaartenBday2025\MusicParser\AbstractDifficulty;
use Mentosmenno2\MaartenBday2025\MusicParser\AbstractTarget;

class Toolbox
{

	/**
	 * @param resource $resource
	 */
	public function fileToBase64($resource): string
	{
		$tempResource = $this->getTempFileIfNotLocalFile($resource);
		$actualResource = $tempResource ?: $resource;

		$base64 = $this->fileContentToBase64(mime_content_type($actualResource) ?: '', stream_get_contents($actualResource, null, 0) ?: '');

		if ($tempResource) {
			$fileLocation = stream_get_meta_data($tempResource)['uri'];
			fclose($tempResource);
			unlink($fileLocation);
		}

		return $base64;
	}

	public function fileContentToBase64(string $mime, string $content): string
	{
		return 'data: ' . $mime . ';base64,' . base64_encode($content);
	}

	/**
	 * @param resource $resource
	 * @return resource|null $resource
	 */
	public function getTempFileIfNotLocalFile($resource)
	{
		// If local file do nothing
		$actualResource = $resource;
		$metadata = stream_get_meta_data($resource);
		if ($metadata['stream_type'] === 'STDIO') {
			return null;
		}

		// Make local file
		$localtempfilename = tempnam(sys_get_temp_dir(), 'mbd');
		$tempFile = fopen($localtempfilename, 'a+');
		if (! $tempFile) {
			return null;
		}
		while ($buffer = fread($actualResource, 8192)) {
			fwrite($tempFile, $buffer);
		}
		return $tempFile;
	}

	/**
	 * @param resource $resource
	 */
	public function getImageBase64FromAudio($resource): ?string
	{
		$id3 = $this->getID3($resource);
		if (! $id3) {
			return null;
		}

		$imageData = $id3['tags']['id3v2']['picture'][0] ?? null;
		$imageData = $imageData ?: ( $id3['tags']['id3v2']['attached_picture'][0] ?? null );
		$imageData = $imageData ?: ( $id3['tags']['id3v2']['attached_picture'][0] ?? null );
		$imageData = $imageData ?: ( $id3['comments']['picture'][0] ?? null );
		$imageData = $imageData ?: ( $id3['comments']['attached_picture'][0] ?? null );
		if (! $imageData) {
			return null;
		}

		return $this->fileContentToBase64($imageData['image_mime'], $imageData['data']);
	}

	/**
	 * @param resource $resource
	 * @return array<string,mixed>|null
	 */
	public function getID3($resource): ?array
	{
		$tempResource = $this->getTempFileIfNotLocalFile($resource);

		$actualResource = $tempResource ?: $resource;
		$fileLocation = stream_get_meta_data($actualResource)['uri'];

		$getID3 = new getID3();
		$data = $getID3->analyze($fileLocation);

		if ($tempResource) {
			fclose($tempResource);
			unlink($fileLocation);
		}
		return $data;
	}

	/**
	 * Removes targets with the same name and position
	 *
	 * @param array<AbstractTarget> $targets
	 * @return array<AbstractTarget>
	 */
	public function removeDuplicateTargets(array $targets): array
	{
		$uniqueTargets = [];
		foreach ($targets as $target) {
			$key = $target->getTime() . ':' . $target->getPosition()->value;
			if (!isset($uniqueTargets[$key])) {
				$uniqueTargets[$key] = $target;
			}
		}

		return array_values($uniqueTargets);
	}

	/**
	 * Sorts difficulties by their difficulty rating ascending
	 *
	 * @param array<AbstractDifficulty> $difficulties
	 * @return array<AbstractDifficulty>
	 */
	public function sortDifficulties(array $difficulties): array
	{
		usort($difficulties, fn($a, $b) => $a->getDifficultyRating() <=> $b->getDifficultyRating());
		return $difficulties;
	}
}
