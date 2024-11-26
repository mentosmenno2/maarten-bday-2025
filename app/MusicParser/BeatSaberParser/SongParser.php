<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use \Exception;
use \ZipArchive;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;
use \Mentosmenno2\MaartenBday2025\MusicParser\SongParserInterface;

class SongParser implements SongParserInterface
{
	public function __construct(
		private string $pathToZip
	) {
	}

	public function parse(): AbstractSong
	{
		$zip = new ZipArchive();
		$opened = $zip->open($this->pathToZip);
		if (! $opened) {
			throw new Exception(sprintf('Cannot open file %s', $this->pathToZip));
		}

		$parsedSong = $this->getSongFromInfoFileData($zip);

		$zip->close();
		return $parsedSong;
	}

	private function getSongFromInfoFileData(ZipArchive $zip): AbstractSong
	{
		$infoFile = 'info.dat';
		$infoFileContents = $zip->getFromName($infoFile);
		if (! $infoFileContents) {
			throw new Exception(sprintf('Cannot open info file %s', $infoFile));
		}

		$infoFileJSON = json_decode($infoFileContents, true, 512, JSON_THROW_ON_ERROR);
		$infoFileParser = ( new ParserFactory() )->getInfoFileParser($infoFileJSON);
		return $infoFileParser->parse();
	}
}
