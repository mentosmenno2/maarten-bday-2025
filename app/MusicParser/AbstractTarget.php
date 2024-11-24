<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;
use \Mentosmenno2\MaartenBday2025\MusicParser\PositionsEnum;

abstract class AbstractTarget implements JsonSerializable
{

	/**
	 * Gets the time of the target in milliseconds from the beginning of the audio
	 */
	abstract public function getTime(): int;

	/**
	 * Gets the position
	 */
	abstract public function getPosition(): PositionsEnum;

	/**
	 * @return array<string,mixed>
	 */
	public function getData(): array
	{
		return array(
			'time' => $this->getTime(),
			'position' => $this->getPosition(),
		);
	}

	public function jsonSerialize(): mixed
	{
		return $this->getData();
	}
}
