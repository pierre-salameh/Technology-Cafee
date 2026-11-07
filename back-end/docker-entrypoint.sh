#!/bin/sh
set -e

cd /app

# Make sure Laravel's writable folders exist
mkdir -p storage/logs storage/framework/cache/data storage/framework/sessions storage/framework/views bootstrap/cache public/images
chmod -R 775 storage bootstrap/cache public/images

# Send logs to the host's log viewer
export LOG_CHANNEL="${LOG_CHANNEL:-stderr}"

# If APP_KEY was not provided, generate a temporary one for this run.
# (Better: set a fixed APP_KEY in the hosting dashboard.)
if [ -z "$APP_KEY" ]; then
  export APP_KEY="$(php artisan key:generate --show)"
  echo "WARNING: APP_KEY not set, using a temporary key."
fi

php artisan config:clear
php artisan migrate --force

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
