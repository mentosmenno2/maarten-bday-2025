<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Exception;
use \ZipArchive;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;
use \Mentosmenno2\MaartenBday2025\MusicParser\SongParserInterface;

class SongParser implements SongParserInterface
{
	public function __construct(
		private string $path_to_zip
	) {
	}

	public function parse(): AbstractSong
	{
		$zip = new ZipArchive();
		$opened = $zip->open($this->path_to_zip);
		if (! $opened) {
			throw new Exception(sprintf('Cannot open file %s', $this->path_to_zip));
		}

		$osu_files_data = $this->getOSUFilesData($zip);
		$first_osu_file_index = array_key_first($osu_files_data);
		$first_osu_file = $osu_files_data[$first_osu_file_index];

		$zip->close();
		return new Song(
			$first_osu_file['General'],
			$first_osu_file['Metadata'],
			$first_osu_file['Events'],
			$osu_files_data,
		);
	}

	/**
	 * @return array<string,mixed>
	 */
	private function getOSUFilesData(ZipArchive $zip): array
	{
		$files_data = array();
		for ($i = 0; $i < $zip->numFiles; $i++) {
			$filename = $zip->getNameIndex($i);
			if (! $filename || ! str_ends_with($filename, '.osu')) {
				continue;
			}

			$file_contents = $zip->getFromName($filename);
			if (! $file_contents) {
				throw new Exception(sprintf('Cannot open file %s', $filename));
			}

			$files_data[ $filename ] = $this->getOSUFileData($file_contents);
		}

		return $files_data;
	}

	/**
	 * @return array<string,mixed>
	 */
	private function getOSUFileData(string $file_contents): array
	{
		$sections_data = $this->osuFileRawSectionsData($file_contents);
		$sections_data['General'] = $this->formatColonnedData($sections_data['General']);
		$sections_data['Editor'] = $this->formatColonnedData($sections_data['Editor']);
		$sections_data['Metadata'] = $this->formatColonnedData($sections_data['Metadata']);
		$sections_data['Difficulty'] = $this->formatDifficulty($sections_data['Difficulty']);
		$sections_data['Events'] = $this->formatCommaSeparatedData($sections_data['Events']);
		$sections_data['HitObjects'] = $this->formatCommaSeparatedData($sections_data['HitObjects']);

		var_dump($sections_data['HitObjects']);

		return $sections_data;
	}

	/**
	 * @return array<string,mixed>
	 */
	private function osuFileRawSectionsData(string $file_contents): array
	{
		$sections_data = array();

		$lines = explode(PHP_EOL, $file_contents);

		$current_section = 'osu file format';
		foreach ($lines as $line_index => $line) {
			$line = trim($line);
			if (empty($line) || str_starts_with($line, '//')) {
				continue;
			}

			if (str_starts_with($line, '[') && str_ends_with($line, ']')) {
				$current_section = substr($line, 1, strlen($line) - 2);
				continue;
			}

			$sections_data[$current_section][] = $line;
		}
		return $sections_data;
	}

	/**
	 * @param string[] $data
	 * @return array<string,string>
	 */
	private function formatColonnedData(array $data): array
	{
		$formatted_data = array();
		foreach ($data as $data_line) {
			$data_line_parts = explode(':', $data_line);
			$key = trim($data_line_parts[0]);
			$value = trim($data_line_parts[1]);
			$formatted_data[$key] = $value;
		}
		return $formatted_data;
	}

	/**
	 * @param string[] $data
	 * @return array<array<string>>
	 */
	private function formatCommaSeparatedData(array $data): array
	{
		$formatted_data = array();
		foreach ($data as $data_line) {
			$formatted_data[] = explode(',', $data_line);
		}
		return $formatted_data;
	}

	/**
	 * @param string[] $data
	 * @return array<string,float>
	 */
	private function formatDifficulty(array $data): array
	{
		$formatted_data = $this->formatColonnedData($data);
		return array_map('floatval', $formatted_data);
	}
}
