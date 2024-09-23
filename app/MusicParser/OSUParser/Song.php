<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;

class Song extends AbstractSong
{
	public function __construct(
		private array $general,
		private array $metadata,
		private array $events,
	) {
	}

	public function getTitle(): string
	{
		$this->metadata['Title'];
	}

	public function getArtist(): string
	{
		$this->metadata['Artist'];
	}

	public function getBuilder(): string
	{
		$this->metadata['Creator'];
	}

	public function getFileName(): string
	{
		$this->general['AudioFilename'];
	}

	public function getCoverImageFileName(): string
	{
		foreach ($events as $event) {
			if ($event[0] !== '0') {
				continue;
			}

			return $event[2];
		}
		return '';
	}

	public function getDifficulties(): array
	{
		return array();
	}
}
