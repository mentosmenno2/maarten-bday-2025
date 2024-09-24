<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use \Exception;

use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2\InfoFileParser as InfoFileParserV2;

class ParserFactory
{
	/**
	 * @param array<string,mixed> $info_file_data
	 */
	public function getInfoFileParser(array $info_file_data): AbstractInfoFileParser
	{
		$version = $info_file_data['_version'];
		$version_parts = explode('.', $version);
		$parser_version = $version_parts[0];

		switch ($parser_version) {
			case '2':
				$parser = new InfoFileParserV2($info_file_data);
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
