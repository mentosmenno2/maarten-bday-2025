<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2;

use Exception;
use \Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\AbstractInfoFileParser;
use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\ParserFactory;

class InfoFileParser extends AbstractInfoFileParser
{
	/**
	 * @return array<string,mixed>
	 */
	public function parse(): array
	{
		$data = $this->infoFileData;

		// Load difficulty files
		foreach ($data['_difficultyBeatmapSets'] as $beatmapSetIndex => $beatmapSet) {
			foreach ($beatmapSet['_difficultyBeatmaps'] as $difficultyBeatmapIndex => $difficultyBeatmap) {
				$filename = $difficultyBeatmap['_beatmapFilename'];
				$difficultyFileData = $this->loadAndParseDifficultyFile($filename);

				$data['_difficultyBeatmapSets'][$beatmapSetIndex]['_difficultyBeatmaps'][$difficultyBeatmapIndex]['beatmapFileData'] = $difficultyFileData;
			}
		}

		return $data;
	}

	/**
	 * @param string $difficultyFile
	 * @return array<string,mixed>
	 */
	private function loadAndParseDifficultyFile(string $difficultyFile): array
	{
		$difficultyFileContents = $this->zip->getFromName($difficultyFile);
		if (! $difficultyFileContents) {
			throw new Exception(sprintf('Cannot open difficulty file %s', $difficultyFile));
		}

		$difficultyFileJSON = json_decode($difficultyFileContents, true, 512, JSON_THROW_ON_ERROR);
		if (! is_array($difficultyFileJSON)) {
			throw new Exception(sprintf('Difficulty file %s contains invalid content', $difficultyFile));
		}

		$dataFileParser = ( new ParserFactory() )->getDifficultyFileParser($this->infoFileData, $difficultyFileJSON);
		return $dataFileParser->parse();
	}
}
