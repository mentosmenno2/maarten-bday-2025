<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V4;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;
use Mentosmenno2\MaartenBday2025\Tools\Toolbox;

class Song extends AbstractSong
{

	/**
	 * @param array<string,mixed> $infoFileData
	 */
	public function __construct(
		protected array $infoFileData
	) {
	}

	public function getId(): string
	{
		return sprintf('beat-saber-%s', sha1(json_encode($this->infoFileData) ?: ''));
	}

	public function getTitle(): string
	{
		return $this->infoFileData['song']['title'];
	}

	public function getArtist(): string
	{
		return $this->infoFileData['song']['author'];
	}

	public function getBuilder(): ?string
	{
		$firstDifficulty = $this->infoFileData['difficultyBeatmaps'][0] ?? null;
		if (! $firstDifficulty) {
			return null;
		}

		$authorsObject = $firstDifficulty['beatmapAuthors'] ?? null;
		if (! $authorsObject) {
			return null;
		}

		$authors = $authorsObject['mappers'] ?? null;
		if (! $authors) {
			return null;
		}

		return implode(', ', $authors);
	}

	public function getFileName(): string
	{
		return $this->infoFileData['audio']['songFilename'];
	}

	public function getAudioBase64(): ?string
	{
		return $this->infoFileData['audioBase64'] ?? null;
	}

	public function getCoverImageBase64(): string
	{
		return $this->infoFileData['coverImageBase64'];
	}

	public function getbackgroundImageBase64(): ?string
	{
		return null; // No support for backgorund images
	}

	public function getDifficulties(): array
	{
		$difficulties = array();
		$difficultyBeatmaps = $this->infoFileData['difficultyBeatmaps'];
		foreach ($difficultyBeatmaps as $difficultyBeatmap) {
			$difficulties[] = new Difficulty(
				$difficultyBeatmap,
			);
		}

		return ( new Toolbox() )->sortDifficulties($difficulties);
	}
}
