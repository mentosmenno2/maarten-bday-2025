<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Exception;
use \ZipArchive;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;
use \Mentosmenno2\MaartenBday2025\MusicParser\SongParserInterface;
use Mentosmenno2\MaartenBday2025\Tools\Toolbox;

class SongParser implements SongParserInterface
{
	public function __construct(
		private string $pathToZip
	) {
	}

	public function canParse(): bool
	{
		$zip = new ZipArchive();
		$opened = $zip->open($this->pathToZip);
		if (! $opened) {
			return false;
		}

		for ($i = 0; $i < $zip->numFiles; $i++) {
			$filename = $zip->getNameIndex($i);
			if (! $filename || ! str_ends_with($filename, '.osu')) {
				continue;
			}

			return true;
		}

		return false;
	}

	public function parse(): AbstractSong
	{
		$zip = new ZipArchive();
		$opened = $zip->open($this->pathToZip);
		if (! $opened) {
			throw new Exception(sprintf('Cannot open file %s', $this->pathToZip));
		}

		$osuFilesData = $this->getOSUFilesData($zip);
		$firstOSUFileIndex = array_key_first($osuFilesData);
		$firstOsuFile = $osuFilesData[$firstOSUFileIndex];

		$albumArtBase64 = $this->coverImageBase64($zip, $firstOsuFile['General']['AudioFilename']);
		$backgroundBase64 = $this->backgroundImageBase64($zip, $firstOsuFile['Events']);

		$zip->close();
		return new Song(
			$firstOsuFile['General'],
			$firstOsuFile['Metadata'],
			$albumArtBase64,
			$backgroundBase64,
			$osuFilesData,
		);
	}

	/**
	 * @return array<string,mixed>
	 */
	private function getOSUFilesData(ZipArchive $zip): array
	{
		$filesData = array();
		for ($i = 0; $i < $zip->numFiles; $i++) {
			$filename = $zip->getNameIndex($i);
			if (! $filename || ! str_ends_with($filename, '.osu')) {
				continue;
			}

			$fileContents = $zip->getFromName($filename);
			if (! $fileContents) {
				throw new Exception(sprintf('Cannot open file %s', $filename));
			}

			$filesData[ $filename ] = $this->getOSUFileData($zip, $fileContents);
		}

		return $filesData;
	}

	/**
	 * @return array<string,mixed>
	 */
	private function getOSUFileData(ZipArchive $zip, string $fileContents): array
	{
		$sectionsData = $this->osuFileRawSectionsData($fileContents);
		$sectionsData['General'] = $this->formatColonnedData($sectionsData['General']);
		$sectionsData['Editor'] = $this->formatColonnedData($sectionsData['Editor']);
		$sectionsData['Metadata'] = $this->formatColonnedData($sectionsData['Metadata']);
		$sectionsData['Difficulty'] = $this->formatDifficulty($sectionsData['Difficulty']);
		$sectionsData['Events'] = $this->formatCommaSeparatedData($sectionsData['Events']);
		$sectionsData['HitObjects'] = $this->formatCommaSeparatedData($sectionsData['HitObjects']);

		return $sectionsData;
	}

	/**
	 * @return array<string,mixed>
	 */
	private function osuFileRawSectionsData(string $fileContents): array
	{
		$sectionsData = array();

		$lines = explode(PHP_EOL, $fileContents);

		$currentSection = 'osu file format';
		foreach ($lines as $line) {
			$line = trim($line);
			if (empty($line) || str_starts_with($line, '//')) {
				continue;
			}

			if (str_starts_with($line, '[') && str_ends_with($line, ']')) {
				$currentSection = substr($line, 1, strlen($line) - 2);
				continue;
			}

			$sectionsData[$currentSection][] = $line;
		}
		return $sectionsData;
	}

	private function coverImageBase64(ZipArchive $zip, string $songFile): ?string
	{
		// Use ID3 if able
		$songFile = $zip->getStream($songFile);
		if ($songFile) {
			$coverImageBase64 = ( new Toolbox() )->getImageBase64FromAudio($songFile);
			fclose($songFile);

			if ($coverImageBase64) {
				return $coverImageBase64;
			}
		}

		return null;
	}

	/**
	 * @param array<array<string>> $events
	 */
	private function backgroundImageBase64(ZipArchive $zip, array $events): ?string
	{
		$backgroundFileResource = null;
		foreach ($events as $event) {
			if ((int) $event[0] !== 0) {
				continue;
			}

			$quotesTrimmed = trim($event[2], '"');
			$backgroundFileName = $quotesTrimmed;
			$backgroundFileResource = $backgroundFileName ? $zip->getStream($backgroundFileName) : null;
			if ($backgroundFileResource) {
				break;
			}
		}
		if ($backgroundFileResource) {
			$backgroundImageBase64 = ( new Toolbox() )->fileToBase64($backgroundFileResource);
			fclose($backgroundFileResource);
			return $backgroundImageBase64;
		}

		return null;
	}

	/**
	 * @param string[] $data
	 * @return array<string,string>
	 */
	private function formatColonnedData(array $data): array
	{
		$formattedData = array();
		foreach ($data as $dataLine) {
			$dataLineParts = explode(':', $dataLine);
			$key = trim($dataLineParts[0]);
			$value = trim($dataLineParts[1]);
			$formattedData[$key] = $value;
		}
		return $formattedData;
	}

	/**
	 * @param string[] $data
	 * @return array<array<string>>
	 */
	private function formatCommaSeparatedData(array $data): array
	{
		$formattedData = array();
		foreach ($data as $dataLine) {
			$formattedData[] = explode(',', $dataLine);
		}
		return $formattedData;
	}

	/**
	 * @param string[] $data
	 * @return array<string,float>
	 */
	private function formatDifficulty(array $data): array
	{
		$formattedData = $this->formatColonnedData($data);
		return array_map('floatval', $formattedData);
	}
}
