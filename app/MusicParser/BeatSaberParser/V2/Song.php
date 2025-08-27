<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;

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
		return $this->infoFileData['_songName'];
	}

	public function getArtist(): string
	{
		return $this->infoFileData['_songAuthorName'];
	}

	public function getBuilder(): ?string
	{
		return $this->infoFileData['_levelAuthorName'] ?? null;
	}

	public function getFileName(): string
	{
		return $this->infoFileData['_songFilename'];
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
		$beatmapSets = $this->infoFileData['_difficultyBeatmapSets'];
		foreach ($beatmapSets as $beatmapSet) {
			foreach ($beatmapSet['_difficultyBeatmaps'] as $difficultyBeatmap) {
				$difficulties[] = new Difficulty(
					$beatmapSet['_beatmapCharacteristicName'],
					$difficultyBeatmap,
				);
			}
		}
		return $difficulties;
	}
}
