<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2;

use Exception;
use \Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\AbstractInfoFileParser;
use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\ParserFactory;
use Mentosmenno2\MaartenBday2025\Tools\Toolbox;

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

		// Load audio
		$audioFilename = $this->infoFileData['_songFilename'];
		$audioResource = $audioFilename ? $this->zip->getStream($audioFilename) : null;
		$data['audioBase64'] = $audioResource ? ( new Toolbox() )->fileToBase64($audioResource) : null;

		// Load cover image
		$coverImageFilename = $this->infoFileData['_coverImageFilename'];
		$coverImageResource = $coverImageFilename ? $this->zip->getStream($coverImageFilename) : null;
		$data['coverImageBase64'] = $coverImageResource ? ( new Toolbox() )->fileToBase64($coverImageResource) : null;
		if ($coverImageResource) {
			fclose($coverImageResource);
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
