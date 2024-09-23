<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractTarget implements JsonSerializable
{

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
