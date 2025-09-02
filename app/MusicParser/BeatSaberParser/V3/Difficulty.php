<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V3;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractDifficulty;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractTarget;
use Mentosmenno2\MaartenBday2025\Tools\Toolbox;

class Difficulty extends AbstractDifficulty
{

	/**
	 * @param array<string,mixed> $difficultyData
	 */
	public function __construct(
		private string $characteristicName,
		private array $difficultyData
	) {
	}

	public function getName(): string
	{
		return sprintf('%s / %s', $this->characteristicName, $this->difficultyData['_difficulty']);
	}

	public function getDifficultyRating(): float
	{
		return $this->difficultyData['_difficultyRank'];
	}

	/**
	 * @return array<AbstractTarget>
	 */
	public function getTargets(): array
	{
		$targets = array_map(function (array $hitObjectData): AbstractTarget {
			return new Target($hitObjectData);
		}, $this->difficultyData['beatmapFileData']['colorNotes']);

		return (new Toolbox())->removeDuplicateTargets($targets);
	}
}
