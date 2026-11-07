<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Comma-separated list in the hosting dashboard, e.g.
    // CORS_ALLOWED_ORIGINS=https://technology-cafee.vercel.app
    // Leave unset to allow any origin.
    'allowed_origins' => array_filter(array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', '*')))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // The frontend uses Bearer tokens, not cookies
    'supports_credentials' => false,

];
