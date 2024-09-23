<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser;

interface SongInterface
{
	public function getTitle(): string;

	public function getArtist(): string;

	public function getBuilder(): string;

	public function getFileName(): string;

	public function getCoverImageFileName(): string;

	public function getDifficulties(): array;
}
