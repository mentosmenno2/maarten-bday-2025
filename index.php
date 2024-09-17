<?php

// Define constants

use Mentosmenno2\MaartenBday2025\App;
use Mentosmenno2\MaartenBday2025\Templates;

define('MAARTEN_BDAY_2025_NAMESPACE', 'Mentosmenno2\\MaartenBday2025\\');
define('MAARTEN_BDAY_2025_ROOT_DIR', __DIR__);
define('MAARTEN_BDAY_2025_CLI', php_sapi_name() === 'cli');

// Autoload
require_once __DIR__ . '/autoloader.php';

$app = App::getInstance();

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Maarten Bday 2025</title>

		<link rel="icon" type="image/png" href="assets/images/favicon.png">

		<link rel="stylesheet" href="assets/css/main.css" />

		<?php if ($currentLevel) { ?>
			<link rel="stylesheet" href="assets/css/<?php echo $currentLevel->getId(); ?>.css" />
		<?php } ?>
	</head>
	<body>
		<header>
			<h1>Maarten Bday 2025</h1>
		</header>
		<main>
		</main>
		<footer>
			<div class="volume-settings">
				<div>
					<label for="volume-music">Music volume: <span class="volume-value volume-audio-music-value"></span>%</label>
					<input type="range" min="0" max="100" value="0" class="slider slider-volume" id="volume-audio-music">
				</div>
				<div>
					<label for="volume-audio-effect">Effects volume: <span class="volume-value volume-audio-effect-value"></span>%</label>
					<input type="range" min="0" max="100" value="0" class="slider slider-volume" id="volume-audio-effect">
				</div>
			</div>
			<p class="copyright">&#169; Menno van den Ende - 2025</p>
		</footer>

		<script src="assets/js/main.js"></script>
	</body>
</html>
