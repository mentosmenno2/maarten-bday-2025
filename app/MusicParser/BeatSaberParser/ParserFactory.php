<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use \Exception;

use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2\InfoFileParser as InfoFileParserV2;
use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2\DifficultyFileParser as DifficultyFileParserV2;
use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V3\InfoFileParser as InfoFileParserV3;
use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V3\DifficultyFileParser as DifficultyFileParserV3;
use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V4\InfoFileParser as InfoFileParserV4;
use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V4\DifficultyFileParser as DifficultyFileParserV4;


use ZipArchive;

class ParserFactory
{
	/**
	 * @param ZipArchive $zip
	 * @param array<string,mixed> $infoFileData
	 */
	public function getInfoFileParser(ZipArchive $zip, array $infoFileData): AbstractInfoFileParser
	{
		$version = $infoFileData['_version'] ?? $infoFileData['version'];
		$versionParts = explode('.', $version);
		$parserVersion = $versionParts[0];

		switch ($parserVersion) {
			case '2':
				$parser = new InfoFileParserV2($zip, $infoFileData);
				break;
			case '3':
				$parser = new InfoFileParserV3($zip, $infoFileData);
				break;
			case '4':
				$parser = new InfoFileParserV4($zip, $infoFileData);
				break;
			default:
				$parser = null;
				break;
		}

		if (! $parser) {
			throw new Exception(sprintf('No info file parser found for info file version %s', $version));
		}

		return $parser;
	}

	/**
	 * @param array<string,mixed> $infoFileData
	 * @param array<string,mixed> $dataFileData
	 */
	public function getDifficultyFileParser(array $infoFileData, array $dataFileData): AbstractDifficultyFileParser
	{
		$version = $dataFileData['_version'] ?? $dataFileData['version'];
		$versionParts = explode('.', $version);
		$parserVersion = $versionParts[0];

		switch ($parserVersion) {
			case '2':
				$parser = new DifficultyFileParserV2($infoFileData, $dataFileData);
				break;
			case '3':
				$parser = new DifficultyFileParserV3($infoFileData, $dataFileData);
				break;
			case '4':
				$parser = new DifficultyFileParserV4($infoFileData, $dataFileData);
				break;
			default:
				$parser = null;
				break;
		}

		if (! $parser) {
			throw new Exception(sprintf('No info file parser found for info file version %s', $version));
		}

		return $parser;
	}
}
