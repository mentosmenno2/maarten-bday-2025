<?php

namespace Mentosmenno2\MaartenBday2025;

class Templates
{

	public const TEMPLATE_PART_DIRECTORY = 'templates';

	/**
	 * @param string $_template
	 * @param array<string,mixed> $_template_args
	 * @return string
	 */
	public function getTemplate(string $_template, array $_template_args = array()): string
	{
		ob_start();
		$this->echoTemplate($_template, $_template_args);
		$data = ob_get_clean();
		if (! $data) {
			return '';
		}

		return $data;
	}

	/**
	 * @param string $_template
	 * @param array<string,mixed> $_template_args
	 * @return void
	 */
	public function echoTemplate(string $_template, array $_template_args = array()): void
	{
		$_filepath = constant('MAARTEN_BDAY_2025_ROOT_DIR') . '/' . self::TEMPLATE_PART_DIRECTORY . '/' . $_template . '.php';
		if (! file_exists($_filepath)) {
			return;
		}

		extract($_template_args);
		require $_filepath;
	}
}
