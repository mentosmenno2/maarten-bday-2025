<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

abstract class AbstractDifficultyFileParser
{
	/**
	 * @param array<string,mixed> $infoFileData
	 * @param array<string,mixed> $dataFileData
	 */
	public function __construct(
		protected array $infoFileData,
		protected array $dataFileData
	) {
	}

	/**
	 * @return array<string,mixed>
	 */
	abstract public function parse(): array;
}
