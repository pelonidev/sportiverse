<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;

// Rutas para usuarios
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('users.index');
    Route::get('/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/', [UserController::class, 'store'])->name('users.store');
    Route::get('/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

// Rutas para descuentos
Route::prefix('discounts')->group(function () {
    Route::get('/', [DiscountController::class, 'index'])->name('discounts.index');
    Route::get('/create', [DiscountController::class, 'create'])->name('discounts.create');
    Route::post('/', [DiscountController::class, 'store'])->name('discounts.store');
    Route::get('/{discount}', [DiscountController::class, 'show'])->name('discounts.show');
    Route::get('/{discount}/edit', [DiscountController::class, 'edit'])->name('discounts.edit');
    Route::put('/{discount}', [DiscountController::class, 'update'])->name('discounts.update');
    Route::delete('/{discount}', [DiscountController::class, 'destroy'])->name('discounts.destroy');
});

// Rutas para productos
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
    Route::get('/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/', [ProductController::class, 'store'])->name('products.store');
    Route::get('/{product}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

// Rutas para pedidos
Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

// Rutas para detalles de pedidos
Route::get('/order-details', [OrderDetailController::class, 'index'])->name('order-details.index');
