<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;

class Song extends AbstractSong
{

	/**
	 * @param array<string,mixed> $info_file_data
	 */
	public function __construct(
		protected array $info_file_data
	) {
	}

	public function getTitle(): string
	{
		return $this->info_file_data['_songName'];
	}

	public function getArtist(): string
	{
		return $this->info_file_data['_songAuthorName'];
	}

	public function getBuilder(): string
	{
		return $this->info_file_data['_levelAuthorName'];
	}

	public function getFileName(): string
	{
		return $this->info_file_data['_songFilename'];
	}

	public function getCoverImageFileName(): string
	{
		return $this->info_file_data['_coverImageFilename'];
	}

	public function getDifficulties(): array
	{
		return array();
	}
}
