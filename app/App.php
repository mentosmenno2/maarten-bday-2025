<?php

namespace Mentosmenno2\MaartenBday2025;

use \Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\SongParser as BeatSaberSongParser;
use \Mentosmenno2\MaartenBday2025\MusicParser\OSUParser\SongParser as OSUSongParser;

class App
{
	protected static ?App $instance = null;

	final protected function __construct()
	{
		// $song = ( new BeatSaberSongParser( MAARTEN_BDAY_2025_ROOT_DIR . '/assets/music-files/beat-saber/a909 (Time Lapse - Timeweaver).zip' ) )->parse();
		$song = ( new OSUSongParser(MAARTEN_BDAY_2025_ROOT_DIR . '/assets/music-files/osu/987012 TheFatRat - MAYDAY (feat. Laura Brehm).osz') )->parse();
		echo json_encode($song);
	}

	public static function getInstance(): App
	{
		if (! static::$instance) {
			static::$instance = new static();
		}

		return static::$instance;
	}
}
