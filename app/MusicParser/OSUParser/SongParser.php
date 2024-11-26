<?php

namespace Mentosmenno2\MaartenBday2025\MusicParser\OSUParser;

use \Exception;
use \ZipArchive;
use \Mentosmenno2\MaartenBday2025\MusicParser\AbstractSong;
use \Mentosmenno2\MaartenBday2025\MusicParser\SongParserInterface;

class SongParser implements SongParserInterface
{
	public function __construct(
		private string $pathToZip
	) {
	}

	public function parse(): AbstractSong
	{
		$zip = new ZipArchive();
		$opened = $zip->open($this->pathToZip);
		if (! $opened) {
			throw new Exception(sprintf('Cannot open file %s', $this->pathToZip));
		}

		$osuFilesData = $this->getOSUFilesData($zip);
		$firstOSUFileIndex = array_key_first($osuFilesData);
		$firstOsuFile = $osuFilesData[$firstOSUFileIndex];

		$zip->close();
		return new Song(
			$firstOsuFile['General'],
			$firstOsuFile['Metadata'],
			$firstOsuFile['Events'],
			$osuFilesData,
		);
	}

	/**
	 * @return array<string,mixed>
	 */
	private function getOSUFilesData(ZipArchive $zip): array
	{
		$filesData = array();
		for ($i = 0; $i < $zip->numFiles; $i++) {
			$filename = $zip->getNameIndex($i);
			if (! $filename || ! str_ends_with($filename, '.osu')) {
				continue;
			}

			$fileContents = $zip->getFromName($filename);
			if (! $fileContents) {
				throw new Exception(sprintf('Cannot open file %s', $filename));
			}

			$filesData[ $filename ] = $this->getOSUFileData($fileContents);
		}

		return $filesData;
	}

	/**
	 * @return array<string,mixed>
	 */
	private function getOSUFileData(string $fileContents): array
	{
		$sectionsData = $this->osuFileRawSectionsData($fileContents);
		$sectionsData['General'] = $this->formatColonnedData($sectionsData['General']);
		$sectionsData['Editor'] = $this->formatColonnedData($sectionsData['Editor']);
		$sectionsData['Metadata'] = $this->formatColonnedData($sectionsData['Metadata']);
		$sectionsData['Difficulty'] = $this->formatDifficulty($sectionsData['Difficulty']);
		$sectionsData['Events'] = $this->formatCommaSeparatedData($sectionsData['Events']);
		$sectionsData['HitObjects'] = $this->formatCommaSeparatedData($sectionsData['HitObjects']);

		return $sectionsData;
	}

	/**
	 * @return array<string,mixed>
	 */
	private function osuFileRawSectionsData(string $fileContents): array
	{
		$sectionsData = array();

		$lines = explode(PHP_EOL, $fileContents);

		$currentSection = 'osu file format';
		foreach ($lines as $line) {
			$line = trim($line);
			if (empty($line) || str_starts_with($line, '//')) {
				continue;
			}

			if (str_starts_with($line, '[') && str_ends_with($line, ']')) {
				$currentSection = substr($line, 1, strlen($line) - 2);
				continue;
			}

			$sectionsData[$currentSection][] = $line;
		}
		return $sectionsData;
	}

	/**
	 * @param string[] $data
	 * @return array<string,string>
	 */
	private function formatColonnedData(array $data): array
	{
		$formattedData = array();
		foreach ($data as $dataLine) {
			$dataLineParts = explode(':', $dataLine);
			$key = trim($dataLineParts[0]);
			$value = trim($dataLineParts[1]);
			$formattedData[$key] = $value;
		}
		return $formattedData;
	}

	/**
	 * @param string[] $data
	 * @return array<array<string>>
	 */
	private function formatCommaSeparatedData(array $data): array
	{
		$formattedData = array();
		foreach ($data as $dataLine) {
			$formattedData[] = explode(',', $dataLine);
		}
		return $formattedData;
	}

	/**
	 * @param string[] $data
	 * @return array<string,float>
	 */
	private function formatDifficulty(array $data): array
	{
		$formattedData = $this->formatColonnedData($data);
		return array_map('floatval', $formattedData);
	}
}
