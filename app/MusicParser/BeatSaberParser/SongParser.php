<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\BeatSaberParser;

use \Exception;
use \ZipArchive;
use \Mentosmenno2\MaartenBday2025\MusicParser\SongInterface;
use \Mentosmenno2\MaartenBday2025\MusicParser\SongParserInterface;

class SongParser implements SongParserInterface
{
	public function __construct(
		private string $path_to_zip
	) {}

	public function parse(): SongInterface {
		$zip = new ZipArchive();
		$opened = $zip->open( $this->path_to_zip );
		if ( ! $opened ) {
			throw new Exception( sprintf( 'Cannot open file %s', $this->path_to_zip ) );
		}

		$info_file_data = $this->get_info_file_data( $zip );
		var_dump($info_file_data);

		$zip->close();
		return new Song();
	}

	private function get_info_file_data( ZipArchive $zip ): array {
		$info_file = 'info.dat';
		$info_file_contents = $zip->getFromName( $info_file );
		if ( ! $info_file_contents ) {
			throw new Exception( sprintf( 'Cannot open info file %s', $info_file ) );
		}

		$info_file_json = json_decode( $info_file_contents, true, 512, JSON_THROW_ON_ERROR );
		$info_file_parser = ( new ParserFactory() )->get_info_file_parser( $info_file_json );
		return $info_file_parser->parse();
	}
}
