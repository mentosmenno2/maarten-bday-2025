<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractDifficulty implements JsonSerializable
{

	abstract public function getName(): string;

	abstract public function rating(): float;

	abstract public function getTargets(): array;

	public function getData(): array
	{
		return array(
			'name' => $this->getTitle(),
			'rating' => $this->getRating(),
		);
	}

	public function jsonSerialize(): mixed
	{
		return $this->getData();
	}
}
