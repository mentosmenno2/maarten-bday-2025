<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;

abstract class AbstractInfoFileParser
{
	/**
	 * @param array<string,mixed> $info_file_data
	 */
	public function __construct(
		protected array $info_file_data
	) {
	}

	abstract public function parse(): AbstractSong;
}
