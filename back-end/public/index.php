<?php

use Illuminate\Http\Request;

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';

$response = $app->handleRequest(Request::capture());

echo "<h2>STATUS: ".$response->getStatusCode()."</h2>";

echo "<pre>";
print_r($response->headers->all());
echo "</pre>";

echo "<hr>";

echo $response->getContent();

exit;