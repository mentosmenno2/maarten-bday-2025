<?php

// Define constants

use Mentosmenno2\MaartenBday2025\App;

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
	</head>
	<body>
		<header>
			<h1>Maarten Bday 2025</h1>
		</header>
		<main>
			<canvas id="app"></canvas>
		</main>
		<script src="assets/js/main.js"></script>
	</body>
</html>
