<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;

class Song extends AbstractSong
{
	/**
	 * @param array<string,string> $general
	 * @param array<string,string> $metadata
	 * @param array<string,array<string,mixed>> $difficultiesData
	 */
	public function __construct(
		private array $general,
		private array $metadata,
		private ?string $audioBase64,
		private ?string $coverImageBase64,
		private ?string $backgroundImageBase64,
		private array $difficultiesData,
	) {
	}

	public function getId(): string
	{
		return sprintf('osu-%s', $this->metadata['BeatmapSetID']);
	}

	public function getTitle(): string
	{
		return $this->metadata['Title'];
	}

	public function getArtist(): string
	{
		return $this->metadata['Artist'];
	}

	public function getBuilder(): ?string
	{
		return $this->metadata['Creator'] ?? null;
	}

	public function getFileName(): string
	{
		return $this->general['AudioFilename'];
	}

	public function getAudioBase64(): ?string
	{
		return $this->audioBase64;
	}

	public function getCoverImageBase64(): ?string
	{
		return $this->coverImageBase64;
	}

	public function getbackgroundImageBase64(): ?string
	{
		return $this->backgroundImageBase64;
	}

	public function getDifficulties(): array
	{
		$difficulties = array();
		foreach ($this->difficultiesData as $difficultyData) {
			$difficulties[] = new Difficulty($difficultyData);
		}
		return $difficulties;
	}
}
