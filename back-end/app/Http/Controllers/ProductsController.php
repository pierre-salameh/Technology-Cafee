<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();

        $products->transform(function ($product) {
            if ($product->image) {
                if (filter_var($product->image, FILTER_VALIDATE_URL)) {
                    $filename = basename($product->image);
                    $product->image = asset('images/' . $filename);
                } else {
                    $product->image = asset('images/' . $product->image);
                }
            }

            return $product;
        });

        return response()->json($products);
    }

    public function publicIndex()
    {
        $products = Product::with('category')->get();

        $products->transform(function ($product) {
            if ($product->image) {
                if (filter_var($product->image, FILTER_VALIDATE_URL)) {
                    $filename = basename($product->image);
                    $product->image = asset('images/' . $filename);
                } else {
                    $product->image = asset('images/' . $product->image);
                }
            }

            return $product;
        });

        return response()->json($products, 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'image' => 'required|image',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = new Product();

        $product->title = $request->title;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->category_id = $request->category_id;

        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();

            $file->move(public_path('images'), $filename);

            $product->image = $filename;
        }

        $product->save();

        return response()->json($product, 201);
    }

    public function store(Request $request)
    {
        //
    }

    public function getbyId($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            if (filter_var($product->image, FILTER_VALIDATE_URL)) {
                $filename = basename($product->image);
                $product->image = asset('images/' . $filename);
            } else {
                $product->image = asset('images/' . $product->image);
            }
        }

        return response()->json($product);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product->title = $request->title;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->category_id = $request->category_id;

        if ($request->hasFile('image')) {

            if ($product->image) {

                $oldImage = filter_var($product->image, FILTER_VALIDATE_URL)
                    ? basename($product->image)
                    : $product->image;

                $oldPath = public_path('images/' . $oldImage);

                if (File::exists($oldPath)) {
                    File::delete($oldPath);
                }
            }

            $file = $request->file('image');

            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();

            $file->move(public_path('images'), $filename);

            $product->image = $filename;
        }

        $product->save();

        return response()->json($product);
    }

    public function remove($id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }

    public function getProductsByCategory($categoryId)
    {
        $products = Product::where('category_id', $categoryId)->get();

        $products->transform(function ($product) {
            if ($product->image) {
                if (filter_var($product->image, FILTER_VALIDATE_URL)) {
                    $filename = basename($product->image);
                    $product->image = asset('images/' . $filename);
                } else {
                    $product->image = asset('images/' . $product->image);
                }
            }

            return $product;
        });

        return response()->json($products);
    }
}