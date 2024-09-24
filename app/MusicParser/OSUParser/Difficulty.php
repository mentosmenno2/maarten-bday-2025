<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractDifficulty;

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

	public function getTargets(): array
	{
		return array();
	}
}
