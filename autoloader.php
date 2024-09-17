<?php

$autoload_file = MAARTEN_BDAY_2025_ROOT_DIR . '/vendor/autoload.php';
if (file_exists($autoload_file)) {
	require_once $autoload_file;
} else {
	/**
	 * Autoload using spl_autoload_register
	 * @see https://www.php.net/manual/en/language.oop5.autoload.php#120258
	 */
	function maartenBday2025AutoLoad(string $class): bool
	{
		$no_plugin_ns_class = str_replace(MAARTEN_BDAY_2025_NAMESPACE, '', $class);
		if ($no_plugin_ns_class === $class) {
			return false; // Class not in plugin namespace, skip autoloading
		}

		$file = str_replace('\\', DIRECTORY_SEPARATOR, $no_plugin_ns_class) . '.php';
		$file = MAARTEN_BDAY_2025_ROOT_DIR . '/app' . DIRECTORY_SEPARATOR . $file;
		if (file_exists($file)) {
			require_once $file;
		}
		return true;
	}

	spl_autoload_register('maartenBday2025AutoLoad'); // @phpstan-ignore-line
}
