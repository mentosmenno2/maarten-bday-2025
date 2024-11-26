<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;

abstract class AbstractInfoFileParser
{
	/**
	 * @param array<string,mixed> $infoFileData
	 */
	public function __construct(
		protected array $infoFileData
	) {
	}

	abstract public function parse(): AbstractSong;
}
