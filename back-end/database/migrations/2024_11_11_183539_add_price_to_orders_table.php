


<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriceToOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            // تعديل العمود ليكون nullable إذا كان موجوداً، أو إضافته إن لم يكن موجوداً
            if (!Schema::hasColumn('orders', 'price')) {
                $table->decimal('price', 10, 2)->nullable()->after('quantity');
            } else {
                $table->decimal('price', 10, 2)->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('price');
        });
    }
}

