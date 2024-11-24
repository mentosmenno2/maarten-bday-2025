<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractDifficulty;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractTarget;

class Difficulty extends AbstractDifficulty
{

	/**
	 * @param array<string,mixed> $difficulty_file_data
	 */
	public function __construct(
		private array $difficulty_file_data
	) {
	}

	public function getName(): string
	{
		return $this->difficulty_file_data['Metadata']['Version'];
	}

	public function getDifficultyRating(): float
	{
		return $this->difficulty_file_data['Difficulty']['OverallDifficulty'];
	}

	/**
	 * @return array<AbstractTarget>
	 */
	public function getTargets(): array
	{
		return array_map(function (array $hitObjectData): AbstractTarget {
			return new Target($hitObjectData);
		}, $this->difficulty_file_data['HitObjects']);
	}
}
