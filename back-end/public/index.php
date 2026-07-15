<?php

echo "1<br>";

require __DIR__.'/../vendor/autoload.php';

echo "2<br>";

$app = require_once __DIR__.'/../bootstrap/app.php';

echo "3<br>";

$app->handleRequest(Illuminate\Http\Request::capture());

echo "4";