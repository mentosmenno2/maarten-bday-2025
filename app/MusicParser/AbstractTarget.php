<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractTarget implements JsonSerializable
{

	/**
	 * Gets the time of the target in milliseconds from the beginning of the audio
	 */
	abstract public function getTime(): int;

	/**
	 * Gets the X position
	 */
	abstract public function getPositionX(): int;

	/**
	 * Gets the X position
	 */
	abstract public function getPositionY(): int;

	/**
	 * @return array<string,mixed>
	 */
	public function getData(): array
	{
		return array(
		);
	}

	public function jsonSerialize(): mixed
	{
		return $this->getData();
	}
}
