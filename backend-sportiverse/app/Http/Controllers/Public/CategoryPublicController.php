<?php

namespace App\Http\Controllers\Public;

use App\Models\Category;
use App\Http\Controllers\Controller;

class CategoryPublicController extends Controller
{
    public function index()
    {
        $categories = Category::all()->get(['id', 'name', 'description', 'category_id', 'price', 'stock', 'image']);

        return response()->json($categories, $categories->isEmpty() ? 204 : 200);
    }

    public function show(Category $category)
    {
        // Devolver solo los campos especificados
        $categoryData = $category->get(['id', 'name', 'description', 'category_id', 'price', 'stock', 'image']);
        return response()->json($categoryData, $categoryData->isEmpty() ? 204 : 200);
    }
}
