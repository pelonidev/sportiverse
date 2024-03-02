<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CategoryAdminController extends Controller
{
    public function index()
    {
        // Verificar si el usuario tiene el rol requerido
        if (Auth::check() && Auth::user()->hasRole('admin')) {
            $categories = Category::all();
            return response()->json($categories, $categories->isEmpty() ? 204 : 200);
        }
        return response()->json([
            'status' => 'KO',
            'message' => 'You are not allowed to view all category details.'
        ], 403);
    }

    public function show(Category $category)
    {
        // Verificar si el usuario tiene el rol requerido
        if (Auth::check() && Auth::user()->hasRole('admin')) {
            return response()->json($category);
        }
        return response()->json([
            'status' => 'KO',
            'message' => 'You are not allowed to view the category details.'
        ], 403);
    }

    public function store(Request $request)
    {
        // Verificar si el usuario tiene el rol requerido
        if (Auth::check() && Auth::user()->hasRole('admin')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:20',
                'description' => 'nullable|string',
                'slug' => 'required|string|unique:categories,slug',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
            ], [
                'name.required' => 'El campo nombre es obligatorio.',
                'name.max' => 'El campo nombre no puede ser mayor que :max caracteres.',
                'slug.required' => 'El campo slug es obligatorio.',
                'slug.unique' => 'El slug ya está siendo utilizado por otra categoría.',
                'image.image' => 'El archivo debe ser una imagen.',
                'image.mimes' => 'El archivo debe tener uno de los siguientes formatos: jpeg, png, jpg, gif.',
                'image.max' => 'El tamaño máximo del archivo es :max kilobytes.'
            ]);

            if ($validator->fails()) {
                // Si la validación falla, retornar los mensajes de error
                return response()->json([
                    'status' => 'KO',
                    'message' => 'Error en la validación',
                    'errors' => $validator->errors()
                ], 422); // Código de estado 422 para indicar una solicitud inválida
            }

            $imageName = NULL;
            if ($request->hasFile('image')) {
                try {
                    $imageName = $request->name . "." . $request->image->getClientOriginalExtension();
                    Storage::disk('public-categories')->put($imageName, file_get_contents($request->image));
                } catch (\Exception $e) {
                    return response()->json([
                        'status' => 'KO',
                        'message' => 'Error al subir la imagen: ' . $e
                    ], 500);
                }
            }

            try {
                $category = Category::create([
                    'name' => $request->name,
                    'slug' => $request->slug,
                    'description' => $request->description,
                    'image' => $imageName,
                ]);

                if ($category) {
                    return response()->json([
                        'status' => 'OK',
                        'message' => 'Category successfully created'
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 'KO',
                        'message' => 'Failed to create category'
                    ], 500);
                }
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'KO',
                    'message' => 'Something went wrong!'
                ], 500);
            }
        };
        return response()->json([
            'status' => 'KO',
            'message' => 'You are not allowed to create categories.'
        ], 403);
    }

    public function update(Request $request, $id)
    {
        // Verificar si el usuario tiene el rol requerido
        if (Auth::check() && Auth::user()->hasRole('admin')) {
            // Validaciones
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:20',
                'description' => 'nullable|string',
                'slug' => 'sometimes|required|string|unique:categories,slug',
                'image' => 'sometimes|required|image|mimes:jpeg,png,jpg|max:2048'
            ], [
                'name.required' => 'El campo nombre es obligatorio.',
                'name.max' => 'El campo nombre no puede ser mayor que :max caracteres.',
                'slug.required' => 'El campo slug es obligatorio.',
                'slug.unique' => 'El slug ya está siendo utilizado por otra categoría.',
                'image.image' => 'El archivo debe ser una imagen.',
                'image.mimes' => 'El archivo debe tener uno de los siguientes formatos: jpeg, png, jpg, gif.',
                'image.max' => 'El tamaño máximo del archivo es :max kilobytes.',
                'required' => 'Al menos un campo debe ser proporcionado para la actualización.'
            ]);

            if ($validator->fails()) {
                // Si la validación falla, retornar los mensajes de error
                return response()->json([
                    'status' => 'KO',
                    'message' => 'Error en la validación',
                    'errors' => $validator->errors()
                ], 422); // Código de estado 422 para indicar una solicitud inválida
            }

            $imageName = NULL;
            if ($request->hasFile('image')) {
                try {
                    $imageName = $request->name . "." . $request->image->getClientOriginalExtension();
                    Storage::disk('public-categories')->put($imageName, file_get_contents($request->image));
                } catch (\Exception $e) {
                    return response()->json([
                        'status' => 'KO',
                        'message' => 'Error al subir la imagen: ' . $e
                    ], 500);
                }
            }

            try {
                $category = Category::findOrFail($id);
                if ($request->has('name')) {
                    $category->name = $request->name;
                }
                if ($request->has('slug')) {
                    $category->slug = $request->slug;
                }
                if ($request->has('description')) {
                    $category->description = $request->description;
                }
                if ($imageName) {
                    $category->image = $imageName;
                }
                $category->save();

                return response()->json([
                    'status' => 'OK',
                    'message' => 'Category successfully updated'
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'KO',
                    'message' => 'Something went wrong!'
                ], 500);
            }
        };
        return response()->json([
            'status' => 'KO',
            'message' => 'You are not allowed to update categories.'
        ], 403);
    }


    public function destroy(Category $category)
    {
        // Verificar si el usuario tiene el rol requerido
        if (Auth::check() && Auth::user()->hasRole('admin')) {
            $category->delete();

            return response()->json([
                'status' => 'OK',
                'message' => 'Category successfully deleted'
            ]);
        };
        return response()->json([
            'status' => 'KO',
            'message' => 'You are not allowed to delete categories.'
        ], 403);
    }
}
