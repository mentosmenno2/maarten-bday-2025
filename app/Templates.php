<?php

namespace Mentosmenno2\MaartenBday2025;

class Templates
{

	public const TEMPLATE_PART_DIRECTORY = 'templates';

	/**
	 * @param string $_template
	 * @param array<string,mixed> $_templateArgs
	 * @return string
	 */
	public function getTemplate(string $_template, array $_templateArgs = array()): string
	{
		ob_start();
		$this->echoTemplate($_template, $_templateArgs);
		$data = ob_get_clean();
		if (! $data) {
			return '';
		}

		return $data;
	}

	/**
	 * @param string $_template
	 * @param array<string,mixed> $_templateArgs
	 * @return void
	 */
	public function echoTemplate(string $_template, array $_templateArgs = array()): void
	{
		$_filepath = constant('MAARTEN_BDAY_2025_ROOT_DIR') . '/' . self::TEMPLATE_PART_DIRECTORY . '/' . $_template . '.php';
		if (! file_exists($_filepath)) {
			return;
		}

		extract($_templateArgs);
		require $_filepath;
	}
}
