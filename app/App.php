<?php

namespace Mentosmenno2\MaartenBday2025;

use \Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\SongParser;

class App
{
	protected static ?App $instance = null;

	final protected function __construct()
	{
		( new SongParser( MAARTEN_BDAY_2025_ROOT_DIR . '/assets/music-files/beat-saber/a909 (Time Lapse - Timeweaver).zip' ) )->parse();
	}

	public static function getInstance(): App
	{
		if (! static::$instance) {
			static::$instance = new static();
		}

		return static::$instance;
	}
}
