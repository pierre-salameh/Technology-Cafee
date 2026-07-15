FROM php:8.2-cli

WORKDIR /app

# تثبيت dependencies النظام
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev

# تثبيت extensions PHP
RUN docker-php-ext-install pdo pdo_mysql mbstring

# تثبيت Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# نسخ المشروع
COPY . .

# تثبيت Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# إعطاء صلاحيات
RUN chmod -R 775 storage bootstrap/cache

# فتح المنفذ
EXPOSE 8000

# تشغيل السيرفر
CMD php artisan serve --host=0.0.0.0 --port=$PORT