<?php

require_once __DIR__ . '/bootstrap.php';

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=0">
		<title>Maarten Bday 2025</title>

		<link rel="icon" type="image/png" href="assets/images/favicon.png">

		<link rel="stylesheet" href="dist/styles/main.css" />
	</head>
	<body>
		<header>
			<h1>Maarten Bday 2025</h1>
		</header>
		<main>
			<canvas
				id="game"
				tabindex="1"
			>
			</canvas>
			<canvas
				id="pre-render"
				tabindex="1"
			>
			</canvas>
		</main>
		<script type="module" src="dist/scripts/main.js"></script>
	</body>
</html>
