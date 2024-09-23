<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

abstract class AbstractSong implements SongInterface
{

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
