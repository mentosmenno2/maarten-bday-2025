<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractDifficulty;

class Difficulty extends AbstractDifficulty
{

	/**
	 * @param array<string,mixed> $difficulty_data
	 */
	public function __construct(
		private string $characteristicName,
		private array $difficulty_data
	) {
	}

	public function getName(): string
	{
		return sprintf('%s / %s', $this->characteristicName, $this->difficulty_data['_difficulty']);
	}

	public function getDifficultyRating(): float
	{
		return $this->difficulty_data['_difficultyRank'];
	}

	public function getTargets(): array
	{
		return array();
	}
}
