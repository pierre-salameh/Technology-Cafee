<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'title',
        'quantity',
        'price',
        'total_price',
        'table_id',
        'category_id',  
    ];

   
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
