<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractDifficulty;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractTarget;
use Mentosmenno2\MaartenBday2025\Tools\Toolbox;

class Difficulty extends AbstractDifficulty
{

	/**
	 * @param array<string,mixed> $difficultyFileData
	 */
	public function __construct(
		private array $difficultyFileData
	) {
	}

	public function getName(): string
	{
		return $this->difficultyFileData['Metadata']['Version'];
	}

	public function getDifficultyRating(): float
	{
		return $this->difficultyFileData['Difficulty']['OverallDifficulty'];
	}

	/**
	 * @return array<AbstractTarget>
	 */
	public function getTargets(): array
	{
		$targets = array_map(function (array $hitObjectData): AbstractTarget {
			return new Target($hitObjectData);
		}, $this->difficultyFileData['HitObjects']);

		return (new Toolbox())->removeDuplicateTargets($targets);
	}
}
