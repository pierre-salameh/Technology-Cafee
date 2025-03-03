<?php

namespace App\Http\Controllers;

use App\Models\Category; 
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

   
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories',
        ], [
            'name.unique' => 'This category name has already been taken.',  
        ]);
    
        try {
            $category = new Category();
            $category->name = $request->name;
            $category->save();
            return response()->json($category, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $request->validate([
            'name' => 'required|unique:categories,name,' . $category->id,
        ]);

        $category->name = $request->name;
        $category->save();

        return response()->json($category);
    }

   
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }


    public function destroyy($id)
    {
        try {
            
            $category = Category::find($id);
    
            
            if (!$category) {
                return response()->json(['message' => 'Category not found'], 404);
            }
    
            
            $category->delete();
    
            
            return response()->json(['message' => 'Category deleted successfully'], 200);
        } catch (\Exception $e) {
            
            return response()->json(['message' => 'Failed to delete category', 'error' => $e->getMessage()], 500);
        }
    }
}    