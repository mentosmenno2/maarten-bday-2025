<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use \Exception;

use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2\InfoFileParser as InfoFileParserV2;

class ParserFactory
{
	/**
	 * @param array<string,mixed> $infoFileData
	 */
	public function getInfoFileParser(array $infoFileData): AbstractInfoFileParser
	{
		$version = $infoFileData['_version'];
		$versionParts = explode('.', $version);
		$parserVersion = $versionParts[0];

		switch ($parserVersion) {
			case '2':
				$parser = new InfoFileParserV2($infoFileData);
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
