<?php

namespace App\Http\Controllers;

use App\Models\Product; 
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function sendAllOrders(Request $request)
    {
        $orders = $request->input('orders');
        $table_id = $request->input('table_id', 1);
    
        
        if (!$orders || !is_array($orders)) {
            return response()->json([
                'message' => 'لا توجد طلبات لإرسالها',
            ], 400);
        }
    
        
        if (!$table_id) {
            return response()->json([
                'message' => 'رقم الطاولة مطلوب',
            ], 400);
        }
    
        $savedOrders = [];
    
       
        foreach ($orders as $order) {
            if (!isset($order['productId'], $order['title'], $order['quantity'], $order['price'])) {
                return response()->json([
                    'message' => 'بيانات الطلب غير مكتملة',
                ], 400);
            }
    
            if ($order['quantity'] <= 0 || $order['price'] <= 0) {
                return response()->json([
                    'message' => 'يجب أن تكون الكمية والسعر أعداد موجبة',
                ], 400);
            }
    
            // استرجاع فئة المنتج بناءً على productId
            $product = Product::find($order['productId']);
            if (!$product) {
                return response()->json([
                    'message' => 'المنتج غير موجود',
                ], 400);
            }

            $category_id = $product->category->id; 

            $totalPrice = $order['quantity'] * $order['price']; 
    
            
            $newOrder = Order::create([
                'product_id' => $order['productId'],
                'title' => $order['title'],
                'quantity' => $order['quantity'],
                'price' => $order['price'],
                'total_price' => $totalPrice,
                'table_id' => $table_id,
                'category_id' => $category_id, 
            ]);
    
            
            $savedOrders[] = $newOrder;
        }
    
       
        return response()->json([
            'message' => 'تم استقبال جميع الطلبات بنجاح',
            'orders' => collect($savedOrders)->map(function ($order) {
                return [
                    'id' => $order->id,
                    'title' => $order->title,
                    'quantity' => $order->quantity,
                    'price' => $order->price,
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at,
                    'table_id' => $order->table_id,
                    
                ];
            })
        ], 200);
    }

  /*  public function index()
    {
        try {
           
            $orders = Order::all();
    
            
            if ($orders->isEmpty()) {
                return response()->json(['message' => 'لا توجد طلبات لعرضها'], 404);
            }
    
            
            return response()->json([
                'orders' => $orders->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'title' => $order->title,
                        'quantity' => $order->quantity,
                        'price' => $order->price,
                        'total_price' => $order->total_price,
                        'created_at' => $order->created_at,
                        'table_id' => $order->table_id,
                        'category' => $order->category, 
                    ];
                })
            ], 200);
        } catch (\Exception $e) {
            
            \Log::error("خطأ في جلب الطلبات: " . $e->getMessage());
            return response()->json(['message' => 'حدث خطأ أثناء جلب الطلبات'], 500);
        }
    }*/

    public function destroy($id)
    {
        try {
            $order = Order::findOrFail($id); 
            $order->delete();
            return response()->json(['message' => 'تم حذف الطلب بنجاح'], 200);
        } catch (\Exception $e) {
            
            \Log::error("خطأ أثناء حذف الطلب: " . $e->getMessage());
            return response()->json(['message' => 'حدث خطأ أثناء الحذف'], 500);
        }
    }

    public function destroyAll()
    {
        try {
            Order::truncate(); 
            return response()->json(['message' => 'تم حذف جميع الطلبات بنجاح'], 200);
        } catch (\Exception $e) {
            \Log::error("خطأ أثناء حذف جميع الطلبات: " . $e->getMessage());
            return response()->json(['message' => 'حدث خطأ أثناء حذف جميع الطلبات'], 500);
        }
    }
    
    public function getOrders()
    {
        
        $orders = Order::with(['product'])->orderBy('created_at', 'desc')->get();
    
        
        $formattedOrders = $orders->map(function ($order) {
            $totalPrice = $order->quantity * $order->product->price; 
            return [
                'order_id' => $order->id,               
                'product_name' => $order->product->title, 
                'quantity' => $order->quantity,          
                'product_price' => $order->product->price,
                'total_price' => $totalPrice,           
                'order_date' => $order->created_at,      
                'table_id' => $order->table_id,          
            ];
        });
    
        return response()->json($formattedOrders);
    }
    
    

}
