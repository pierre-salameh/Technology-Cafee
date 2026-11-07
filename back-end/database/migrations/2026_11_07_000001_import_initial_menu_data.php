<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * One-time import of the original categories and products
 * (migrated from the local XAMPP database to the hosted database).
 * Runs once only, because Laravel records it in the migrations table.
 */
return new class extends Migration
{
    public function up(): void
    {
        // Do nothing if someone already added data by hand
        if (DB::table('categories')->count() > 0 || DB::table('products')->count() > 0) {
            return;
        }

        DB::table('categories')->insert([
            ['id' => 1, 'name' => 'Drinks',              'created_at' => '2025-05-04 12:39:28', 'updated_at' => '2025-05-04 12:39:28'],
            ['id' => 2, 'name' => 'Appetizers',          'created_at' => '2025-05-04 12:40:57', 'updated_at' => '2025-05-04 12:40:57'],
            ['id' => 3, 'name' => 'Additional Services', 'created_at' => '2025-05-04 12:41:28', 'updated_at' => '2025-05-04 12:41:28'],
            ['id' => 6, 'name' => 'milk',                'created_at' => '2026-06-30 15:01:07', 'updated_at' => '2026-06-30 15:01:07'],
        ]);

        DB::table('products')->insert([
            ['id' => 1, 'title' => 'Coffee',       'description' => '...', 'price' => 6000.00,  'image' => '20250504125910.png', 'category_id' => 1, 'created_at' => '2025-05-04 12:59:10', 'updated_at' => '2025-05-04 12:59:10'],
            ['id' => 2, 'title' => 'Tea',          'description' => '...', 'price' => 4000.00,  'image' => '20250504125935.png', 'category_id' => 1, 'created_at' => '2025-05-04 12:59:35', 'updated_at' => '2025-05-04 12:59:35'],
            ['id' => 3, 'title' => 'Salad',        'description' => '...', 'price' => 25000.00, 'image' => '20250504130352.png', 'category_id' => 2, 'created_at' => '2025-05-04 13:03:52', 'updated_at' => '2025-05-04 13:03:52'],
            ['id' => 4, 'title' => 'Coal Service', 'description' => '...', 'price' => 10000.00, 'image' => '20250504131324.png', 'category_id' => 3, 'created_at' => '2025-05-04 13:13:24', 'updated_at' => '2025-05-04 13:13:24'],
        ]);

        // PostgreSQL: move the id counters past the imported ids,
        // otherwise the next product created from the dashboard would collide.
        if (DB::getDriverName() === 'pgsql') {
            foreach (['categories', 'products'] as $table) {
                DB::statement("SELECT setval(pg_get_serial_sequence('{$table}', 'id'), (SELECT COALESCE(MAX(id), 1) FROM {$table}))");
            }
        }
    }

    public function down(): void
    {
        // Intentionally empty: never delete the user's data on rollback.
    }
};
