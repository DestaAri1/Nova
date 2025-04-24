<?php

namespace App\Http\Controllers;

use App\Helpers\GenerateSlug;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::all();

        return response()->json([
            'status' => 'success',
            'data' => $category
        ], 200);
    }

    public function store(CategoryRequest $request)
    {
        try {
            Category::create([
                'name' => $request->name,
                'slug' => GenerateSlug::slug($request->name, \App\Models\Category::class)
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'category berhasil dibuat',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update role: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(CategoryRequest $request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            $data = [
                'name' => $request->name,
                'slug' => GenerateSlug::slug($request->name, \App\Models\Category::class)
            ];

            $category->update($data);

            return response()->json([
                'status' => 'success',
                'message' => 'category updated',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update role: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
        {
        try {
            $role = Category::findOrFail($id);

            if($role->delete()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Role Successfully deleted'
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update role: ' . $e->getMessage()
            ], 500);
        }
    }
}
