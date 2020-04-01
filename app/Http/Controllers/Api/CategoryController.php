<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $result = Category::all();
            return $result;
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = $request->image_path;
        $image = $request->image;
        $image_path = preg_replace("/[^A-Za-z0-9]/", "", $name);
        $nowTIME = Carbon::now();
        if ($name == NULL) {
            return response()->json("Error!");
        } else {
            $image_path = $nowTIME . '_' . $image_path;
            $destinationPath = public_path('/storage/images') . '/' . $image_path;
            if (file_put_contents($destinationPath, file_get_contents($image))) {
            } else {
                echo "Unable to save the file.";
            }
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|nullable',
            'image_path' => 'required|string'
        ]);
        try {
            $category = new Category();
            $category->name = $request->name;
            $category->description = $request->description;
            $category->image_path = $image_path;
            $category->save();
            return $category;
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $result = Category::find($id);
            if ($result != null) {
                $result->items = $result->items;
            }
            return $result;
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $category = Category::find($id);
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
        if ($category != null) {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'string|nullable',
                'image_path' => 'required|string'
            ]);
            $category->name = $request->name;
            $category->description = $request->description;
            $category->image_path = $request->image_path;
            try {
                $category->save();
                return $category;
            } catch (\Throwable $th) {
                $response = array('error' => 'Error connecting to database!!');
                return $response;
            }
        }
        $response = array('error' => 'No category was found with the specified id!!');
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $category = Category::find($id);
            if ($category != null) {
                $category->delete();
                $response = array('success' => 'Category has been deleted successfully!!');
                return $response;
            } else {
                $response = array('error' => 'No category was found with the specified id!!');
                return $response;
            }
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
    }
}
