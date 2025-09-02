<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V4;

use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractDifficulty;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractTarget;
use Mentosmenno2\MaartenBday2025\Tools\Toolbox;

class Difficulty extends AbstractDifficulty
{

	/**
	 * @param array<string,mixed> $difficultyData
	 */
	public function __construct(
		private array $difficultyData
	) {
	}

	public function getName(): string
	{
		return sprintf('%s / %s', $this->difficultyData['characteristic'], $this->difficultyData['difficulty']);
	}

	public function getDifficultyRating(): float
	{
		return match ($this->difficultyData['difficulty']) {
			'Easy' => 1.0,
			'Normal' => 3.0,
			'Hard' => 5.0,
			'Expert' => 7.0,
			'Expert+' => 9.0,
			default => 0.0,
		};
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
