<?php

namespace Mentosmenno2\MaartenBday2025;

use \Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\SongParser as BeatSaberSongParser;
use \Mentosmenno2\MaartenBday2025\MusicParser\OSUParser\SongParser as OSUSongParser;
use Mentosmenno2\MaartenBday2025\MusicParser\SongParserInterface;

class App
{
	protected static ?App $instance = null;

	final protected function __construct()
	{
	}

	public static function getInstance(): App
	{
		if (! static::$instance) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	public function getSongParser(string $filePath): ?SongParserInterface
	{
		$parsers = [
			new BeatSaberSongParser($filePath),
			new OSUSongParser($filePath),
		];

		foreach ($parsers as $parser) {
			if ($parser->canParse()) {
				return $parser;
			}
		}

		return null;
	}

	public function demo(): void
	{
		$beatsaberv2 = ( new BeatSaberSongParser(MAARTEN_BDAY_2025_ROOT_DIR . '/music-files/beat-saber/a909 (Time Lapse - Timeweaver).zip') )->parse();
		echo '<h2>Beat Saber V2</h2>';
		echo '<pre>';
		echo json_encode($beatsaberv2, JSON_PRETTY_PRINT) ?: 'ERROR parsing JSON';
		echo '</pre>';

		$beatsaverv4 = ( new BeatSaberSongParser(MAARTEN_BDAY_2025_ROOT_DIR . '/music-files/beat-saber/482a9 (HONK - dotGet).zip') )->parse();
		echo '<h2>Beat Saber V4</h2>';
		echo '<pre>';
		echo json_encode($beatsaverv4, JSON_PRETTY_PRINT) ?: 'ERROR parsing JSON';
		echo '</pre>';

		$osu = ( new OSUSongParser(MAARTEN_BDAY_2025_ROOT_DIR . '/music-files/osu/987012 TheFatRat - MAYDAY (feat. Laura Brehm).osz') )->parse();
		echo '<h2>OSU</h2>';
		echo '<pre>';
		echo json_encode($osu, JSON_PRETTY_PRINT) ?: 'ERROR parsing JSON';
		echo '</pre>';
	}
}
