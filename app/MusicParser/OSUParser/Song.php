<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;

class Song extends AbstractSong
{
	/**
	 * @param array<string,string> $general
	 * @param array<string,string> $metadata
	 * @param array<array<string>> $events
	 */
	public function __construct(
		private array $general,
		private array $metadata,
		private array $events,
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

	public function getBuilder(): string
	{
		return $this->metadata['Creator'];
	}

	public function getFileName(): string
	{
		return $this->general['AudioFilename'];
	}

	public function getCoverImageFileName(): string
	{
		foreach ($this->events as $event) {
			if ($event[0] !== '0') {
				continue;
			}

			$quotes_trimmed = trim($event[2], '"');
			return $quotes_trimmed;
		}
		return '';
	}

	public function getDifficulties(): array
	{
		return array();
	}
}
