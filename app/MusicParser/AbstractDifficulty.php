<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractDifficulty implements JsonSerializable
{

	/**
	 * Get the ame of the difficulty
	 */
	abstract public function getName(): string;

	/**
	 * Get the rating of the difficulty on a scale of 0-10
	 */
	abstract public function getDifficultyRating(): float;

	/**
	 * Get the list of targets
	 *
	 * @return AbstractTarget[]
	 */
	abstract public function getTargets(): array;

	/**
	 * @return array<string,mixed>
	 */
	public function getData(): array
	{
		return array(
			'name' => $this->getName(),
			'difficultyRating' => $this->getDifficultyRating(),
			'targets' => $this->getTargets(),
		);
	}

	public function jsonSerialize(): mixed
	{
		return $this->getData();
	}
}
