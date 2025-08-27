<?php

use Mentosmenno2\MaartenBday2025\App;

require_once __DIR__ . '/../../bootstrap.php';

header('Content-Type: application/json');

// Validate POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	echo json_encode([
		'success' => false,
		'error' => 'Method not allowed'
	]);
	exit;
}

// Validate file upload
if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
	http_response_code(400);
	echo json_encode([
		'success' => false,
		'error' => 'Invalid file upload'
	]);
	exit;
}

// Determine parser
$app = App::getInstance();
$parser = $app->getSongParser($_FILES['file']['tmp_name']);
if (! $parser) {
	http_response_code(400);
	echo json_encode([
		'success' => false,
		'error' => 'Unsupported file format'
	]);
	exit;
}

// Parse
try {
	$song = $parser->parse();
} catch (Exception $e) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'error' => 'Failed to parse file: ' . $e->getMessage()
	]);
	exit;
}

// File uploaded successfully
http_response_code(200);
echo json_encode([
	'success' => true,
	'song' => $song
]);
