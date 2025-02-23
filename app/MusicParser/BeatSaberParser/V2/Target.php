<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractTarget;
use \Mentosmenno2\MaartenBday2025\MusicParser\PositionsEnum;

class Target extends AbstractTarget
{

	/**
	 * @param array<string,mixed> $noteData
	 */
	public function __construct(
		private array $noteData
	) {
	}

	/**
	 * Gets the time of the target in milliseconds from the beginning of the audio
	 */
	public function getTime(): int
	{
		return $this->noteData['timestampMilliseconds'];
	}

	/**
	 * Set position based on the horizontal position of the note on the playfield screen
	 *
	 * @see https://bsmg.wiki/mapping/map-format/beatmap.html#color-notes-line-index
	 */
	public function getPosition(): PositionsEnum
	{
		$lineIndex = $this->noteData['_lineIndex'];
		return $lineIndex < 2 ? PositionsEnum::LEFT : PositionsEnum::RIGHT;
	}
}
