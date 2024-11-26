<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\V2;

use \Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser\AbstractInfoFileParser;

class InfoFileParser extends AbstractInfoFileParser
{
	public function parse(): Song
	{
		return new Song($this->infoFileData);
	}
}
