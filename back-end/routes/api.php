<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\CategoriesController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);
    // Users
    Route::prefix('user')->controller(AuthController::class)->group(function () {
        Route::get('show', 'getAll');
        Route::get('showbyid/{id}', 'getbyId');
        Route::post('update/{id}', 'updateUser');
        Route::post('create', 'register');
        Route::delete('delete/{user_id}', 'remove');
    });
    //  Products
    Route::prefix('product')->controller(ProductsController::class)->group(function () {
        Route::get('show', 'index');
        Route::get('showbyid/{id}', 'getbyId');
        Route::post('update/{id}', 'update');
        Route::post('create', 'create');
        Route::delete('delete/{id}', 'remove');
    });

  /*  //order
    Route::prefix('order')->controller(OrderController::class)->group(function () {
        Route::get('/orders', [OrderController::class, 'index']);
    });*/
});


// Public Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);





Route::get('/public-products', [ProductsController::class, 'publicIndex']);



Route::post('/send-all-orders', [OrderController::class, 'sendAllOrders']);
//Route::get('/orders', [OrderController::class, 'index']);

Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
Route::delete('/orders', [OrderController::class, 'destroyAll']);


Route::post('/complaints', [ComplaintController::class, 'store']);
Route::get('/complaints', [ComplaintController::class, 'index']);


Route::get('/products/{categoryId}', [ProductsController::class, 'getProductsByCategory']);


Route::get('/orders', [OrderController::class, 'getOrders']);




Route::post('/categories/create', [CategoriesController::class, 'create']);
Route::get('categories', [CategoriesController::class, 'index']);

Route::delete('/categories/{id}', [CategoriesController::class, 'destroyy']);


Route::delete('/complaints', [ComplaintController::class, 'deleteAll']);