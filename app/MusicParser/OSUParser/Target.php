<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractTarget;
use \Mentosmenno2\MaartenBday2025\MusicParser\PositionsEnum;

class Target extends AbstractTarget
{

	/**
	 * @param array<int,string> $hit_object_data
	 */
	public function __construct(
		private array $hit_object_data
	) {
	}

	/**
	 * Gets the time of the target in milliseconds from the beginning of the audio
	 */
	public function getTime(): int
	{
		return (int) $this->hit_object_data[2];
	}

	/**
	 * Set position based on the osu pixel position of the hit object on the playfield screen
	 *
	 * @see https://osu.ppy.sh/wiki/en/Client/Playfield
	 */
	public function getPosition(): PositionsEnum
	{
		$osu_pixel_x = (int) $this->hit_object_data[0];
		return $osu_pixel_x < 256 ? PositionsEnum::LEFT : PositionsEnum::RIGHT;
	}
}
