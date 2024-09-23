<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractSong implements JsonSerializable
{

	public abstract function getTitle(): string;

	public abstract function getArtist(): string;

	public abstract function getBuilder(): string;

	public abstract function getFileName(): string;

	public abstract function getCoverImageFileName(): string;

	public abstract function getDifficulties(): array;

	public function getData(): array {
		return array(
			'title' => $this->getTitle(),
			'artist' => $this->getArtist(),
			'builder' => $this->getBuilder(),
			'fileName' => $this->getFileName(),
			'coverImageFilename' => $this->getCoverImageFileName(),
			'difficulties' => $this->getDifficulties(),
		);
	}

	public function jsonSerialize(): mixed {
		return $this->getData();
	}
}
