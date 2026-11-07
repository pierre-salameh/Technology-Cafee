FROM php:8.2-cli

WORKDIR /app

# System dependencies (libpq-dev is needed for PostgreSQL)
RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions (MySQL and PostgreSQL both supported)
RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring

# Allow uploading product images (default PHP limit is 2MB)
RUN printf "upload_max_filesize=10M\npost_max_size=12M\nmemory_limit=256M\n" \
    > /usr/local/etc/php/conf.d/uploads.ini

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Project files
COPY . .

# Laravel dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Entrypoint (runs migrations, then starts the server)
RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

EXPOSE 8000

CMD ["/app/docker-entrypoint.sh"]
