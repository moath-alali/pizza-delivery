<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Controllers\Controller;
use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $result = Item::all();
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
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'string|nullable',
            'image_path' => 'required',
            'price' => 'required',
            'available' => 'required|boolean',
            'discount' => 'required',
            'category_id' => 'required'
        ]);
        try {
            $category = Category::find($request->category_id);
            if ($category != null) {
                $item = new Item();
                $item->name = $request->name;
                $item->description = $request->description;
                $item->image_path = $request->image_path;
                $item->price = $request->price;
                $item->available = $request->available;
                $item->discount = $request->discount;
                $item->save();
                $item->categories()->attach($category);
                return $item;
            } else {
                $response = array('error' => 'No category was found with the specified id!!');
                return $response;
            }
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
            $result = Item::find($id);
            if ($result != null) {
                $result->categories = $result->categories;
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
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'string|nullable',
            'image_path' => 'required',
            'price' => 'required',
            'available' => 'required|boolean',
            'discount' => 'required',
            'category_id' => 'required'
        ]);
        try {
            $item = Item::find($id);
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
        if ($item != null) {
            try {
                $category = Category::find($request->category_id);
                if ($category != null) {
                    $item->name = $request->name;
                    $item->description = $request->description;
                    $item->image_path = $request->image_path;
                    $item->price = $request->price;
                    $item->available = $request->available;
                    $item->discount = $request->discount;
                    $item->save();
                    foreach ($item->categories as $cat) {
                        if ($cat->id == $request->category_id) {
                            return $item;
                        }
                    }
                    $item->categories()->attach($category);
                    $item->categories = $item->categories;
                    return $item;
                } else {
                    $response = array('error' => 'No category was found with the specified id!!');
                    return $response;
                }

                $item->save();
                return $item;
            } catch (\Throwable $th) {
                $response = array('error' => 'Error connecting to database!!');
                return $response;
            }
        }
        $response = array('error' => 'No item was found with the specified id!!');
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
            $item = Item::find($id);
            if ($item != null) {
                $item->delete();
                $response = array('success' => 'item has been deleted successfully!!');
                return $response;
            } else {
                $response = array('error' => 'No item was found with the specified id!!');
                return $response;
            }
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
    }
}
