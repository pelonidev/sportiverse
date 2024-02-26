<?php

namespace App\Http\Controllers\Public;

use App\Models\Category;
use App\Http\Controllers\Controller;

class CategoryPublicController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories, $categories->isEmpty() ? 204 : 200);
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }
}
