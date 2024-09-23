<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

use JsonSerializable;

interface SongInterface extends JsonSerializable
{
	public function getTitle(): string;

	public function getArtist(): string;

	public function getBuilder(): string;

	public function getFileName(): string;

	public function getCoverImageFileName(): string;

	public function getDifficulties(): array;
}
