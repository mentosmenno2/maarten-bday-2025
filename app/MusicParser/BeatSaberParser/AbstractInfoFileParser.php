<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;
use ZipArchive;

abstract class AbstractInfoFileParser
{
	/**
	 * @param array<string,mixed> $infoFileData
	 */
	public function __construct(
		protected ZipArchive $zip,
		protected array $infoFileData
	) {
	}

	abstract public function parse(): AbstractSong;
}
