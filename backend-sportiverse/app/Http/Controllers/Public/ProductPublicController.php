<?php

namespace App\Http\Controllers\Public;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Controllers\Controller;

class ProductPublicController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products, $products->isEmpty() ? 204 : 200);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }
}
