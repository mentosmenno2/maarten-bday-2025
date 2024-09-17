<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

abstract class AbstractInfoFileParser
{
	public function __construct(
		protected array $file_data
	) {}

	/**
	 * @return array{
	 * 	'song_name': string,
	 * 	'artist': string,
	 * 	'bpm': string,
	 * 	'builder': string,
	 * 	'song_name': string
	 * }
	 */
	public abstract function parse(): array;
}
