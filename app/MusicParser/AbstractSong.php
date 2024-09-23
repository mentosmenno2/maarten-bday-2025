<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractSong implements JsonSerializable
{

	abstract public function getTitle(): string;

	abstract public function getArtist(): string;

	abstract public function getBuilder(): string;

	abstract public function getFileName(): string;

	abstract public function getCoverImageFileName(): string;

	/**
	 * @return AbstractDifficulty[]
	 */
	abstract public function getDifficulties(): array;

	/**
	 * @return array<string,mixed>
	 */
	public function getData(): array
	{
		return array(
			'title' => $this->getTitle(),
			'artist' => $this->getArtist(),
			'builder' => $this->getBuilder(),
			'fileName' => $this->getFileName(),
			'coverImageFilename' => $this->getCoverImageFileName(),
			'difficulties' => $this->getDifficulties(),
		);
	}

	public function jsonSerialize(): mixed
	{
		return $this->getData();
	}
}
