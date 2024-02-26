<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\ProductPublicController;
use App\Http\Controllers\Public\CategoryPublicController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\CategoryAdminController;
use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\Admin\ProductAdminController;
use App\Http\Controllers\Seller\ProductSellerController;
use App\Http\Controllers\Customer\OrderCustomerController;
use App\Http\Controllers\Customer\OrderDetailCustomerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas v1
Route::prefix('v1')->group(function () {
    // Rutas públicas
    Route::get('/public/products', [ProductPublicController::class, 'index']);
    Route::get('/public/products/{product}', [ProductPublicController::class, 'show']);
    Route::get('/public/categories', [CategoryPublicController::class, 'index']);
    Route::get('/public/categories/{category}', [CategoryPublicController::class, 'show']);

    // Rutas auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Rutas privadas
    Route::middleware('auth:sanctum')->group(function () {
        // Rutas que requieren autenticación

        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // role customer
        Route::apiResource('/customer/orders', OrderCustomerController::class);

        // role seller
        Route::apiResource('/seller/products', ProductSellerController::class);

        // role admin
        Route::apiResource('/admin/users', UserAdminController::class);

        Route::apiResource('/admin/categories', CategoryAdminController::class)->except([
            'index', 'show',
        ]);

        Route::apiResource('/admin/products', ProductAdminController::class)->except([
            'index', 'show', 'store'
        ]);
    });
});
