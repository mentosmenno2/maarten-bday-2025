<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractDifficulty implements JsonSerializable
{

	abstract public function getName(): string;

	abstract public function getDifficultyRating(): float;

	/**
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
