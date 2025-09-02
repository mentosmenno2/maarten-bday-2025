<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use \Exception;
use \ZipArchive;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;
use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2\Song;
use \Mentosmenno2\MaartenBday2025\MusicParser\SongParserInterface;

class SongParser implements SongParserInterface
{
	public function __construct(
		private string $pathToZip
	) {
	}

	public function canParse(): bool
	{
		$zip = new ZipArchive();
		$opened = $zip->open($this->pathToZip);
		if ($opened !== true) {
			return false;
		}

		$hasInfoFile = $zip->locateName('info.dat') !== false || $zip->locateName('Info.dat') !== false;
		if (! $hasInfoFile) {
			$zip->close();
			return false;
		}

		$zip->close();
		return true;
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
		$infoFileOptions = array( 'info.dat', 'Info.dat' );
		$infoFile = null;
		foreach ($infoFileOptions as $infoFileOption) {
			if ($zip->locateName($infoFileOption) !== false) {
				$infoFile = $infoFileOption;
				break;
			}
		}

		$infoFileContents = $infoFile ? $zip->getFromName($infoFile) : null;
		if (! $infoFileContents) {
			throw new Exception(sprintf('Cannot open info file %s', $infoFile));
		}

		$infoFileJSON = json_decode($infoFileContents, true, 512, JSON_THROW_ON_ERROR);
		if (! is_array($infoFileJSON)) {
			throw new Exception(sprintf('Info file %s contains invalid content', $infoFile));
		}

		$infoFileParser = ( new ParserFactory() )->getInfoFileParser($zip, $infoFileJSON);
		$song = $infoFileParser->parse();
		return $song;
	}
}
