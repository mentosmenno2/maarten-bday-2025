<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractTarget;
use \Mentosmenno2\MaartenBday2025\MusicParser\PositionsEnum;

class Target extends AbstractTarget
{

	/**
	 * @param array<int,string> $hitObjectData
	 */
	public function __construct(
		private array $hitObjectData
	) {
	}

	/**
	 * Gets the time of the target in milliseconds from the beginning of the audio
	 */
	public function getTime(): int
	{
		return (int) $this->hitObjectData[2];
	}

	/**
	 * Set position based on the horizontal osu pixel position of the hit object on the playfield screen
	 *
	 * @see https://osu.ppy.sh/wiki/en/Client/Playfield
	 */
	public function getPosition(): PositionsEnum
	{
		$osuPixelX = (int) $this->hitObjectData[0];
		return $osuPixelX < 256 ? PositionsEnum::LEFT : PositionsEnum::RIGHT;
	}
}
