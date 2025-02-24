<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

abstract class AbstractSong implements JsonSerializable
{
	/**
	 * Get the identifier of the song
	 */
	abstract public function getId(): string;

	/**
	 * Get the title of the song
	 */
	abstract public function getTitle(): string;

	/**
	 * Get the artist of the song
	 */
	abstract public function getArtist(): string;

	/**
	 * Get the builder/mapper of the beatmap
	 */
	abstract public function getBuilder(): string;

	/**
	 * Get the file name of the audio file
	 */
	abstract public function getFileName(): string;

	/**
	 * Get the base64 cover image file
	 */
	abstract public function getCoverImageBase64(): ?string;

	/**
	 * Get a list of available difficulties
	 *
	 * @return AbstractDifficulty[]
	 */
	abstract public function getDifficulties(): array;

	/**
	 * @return array<string,mixed>
	 */
	public function getData(): array
	{
		return array(
			'id' => $this->getId(),
			'title' => $this->getTitle(),
			'artist' => $this->getArtist(),
			'builder' => $this->getBuilder(),
			'fileName' => $this->getFileName(),
			'coverImageBase64' => $this->getCoverImageBase64(),
			'difficulties' => $this->getDifficulties(),
		);
	}

	public function jsonSerialize(): mixed
	{
		return $this->getData();
	}
}
