<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractDifficulty implements JsonSerializable
{

	public abstract function getName(): string;

	public abstract function rating(): float;

	public abstract function getTargets(): array;

	public function getData(): array {
		return array(
			'name' => $this->getTitle(),
			'rating' => $this->getRating(),
		);
	}

	public function jsonSerialize(): mixed {
		return $this->getData();
	}
}
