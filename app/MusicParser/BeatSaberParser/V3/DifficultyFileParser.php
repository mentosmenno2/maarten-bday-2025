<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V3;

use Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\AbstractDifficultyFileParser;

class DifficultyFileParser extends AbstractDifficultyFileParser
{
	/**
	 * @return array<string,mixed>
	 */
	public function parse(): array
	{
		$data = $this->dataFileData;

		foreach ($data['colorNotes'] as $noteIndex => $note) {
			$data['colorNotes'][$noteIndex]['timestampMilliseconds'] = $this->beatToMilliseconds($note['b']);
		}

		return $data;
	}

	private function beatToMilliseconds(float $beat): int
	{
		$beatsPerMinute = $this->infoFileData['_beatsPerMinute'];
		$secondsPerBeat = 60 / $beatsPerMinute;
		$beatSeconds = $secondsPerBeat * $beat;
		$beatMilliseconds = $beatSeconds * 1000;
		return (int) $beatMilliseconds;
	}
}
