<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Item;
use App\Order;
use App\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $orders = Order::all();
            if ($orders != null) {
                foreach ($orders as $order) {
                    $order->user = $order->user;
                    $order->status = $order->status;
                }
            }
            return $orders;
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
        try {
            $request->status_id =  Status::where('status', 'getting ready')->first()->id;
            if (Auth::User() != null) {
                $request->user_id = Auth::user()->id;
            }
            $latestOrder = Order::orderBy('created_at', 'DESC')->first();
            if ($latestOrder != null) {
                $latestId = $latestOrder->id;
            } else {
                $latestId = 1;
            }
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
        $request->tracking_number = str_pad($latestId + 1, 10, "0", STR_PAD_LEFT);
        $request->validate([
            'phone_number' => 'required|string',
            'city' => 'string|max:255',
            'street' => 'string|max:255',
            'house' => 'numeric',
            'floor' => 'numeric',
            'appartement' => 'numeric',
            'items_list' => 'required|array'
        ]);
        if ($request->items_list != null && count($request->items_list) > 0) {
            try {
                $order = new Order();
                $order->phone_number = $request->phone_number;
                $order->city = $request->city;
                $order->street = $request->street;
                $order->house = $request->house;
                $order->floor = $request->floor;
                $order->appartement = $request->appartement;
                $order->tracking_number = $request->tracking_number;
                $order->status_id = $request->status_id;
                $order->user_id = $request->user_id;
                $order->total = 0;
                $items_ids = [];
                foreach ($request->items_list as $el) {
                    $item = Item::find($el['item_id']);
                    if ($item == null) {
                        $response = array('error' => 'please choose items from our list!!');
                        return $response;
                    }
                    if ($el['quantity'] <= 0) {
                        $response = array('error' => 'please choose positive quantity!!');
                        return $response;
                    }
                    $items_ids[$item->id] = ['quantity' => $el['quantity']];
                    $order->total += $el['quantity'] * ($item->price * (100 - $item->discount) / 100);
                }
                $order->save();
                $order->items()->attach($items_ids);
                $order->items = $order->items;
                $order->user = $order->user;
                $order->status = $order->status;
                return $order;
            } catch (\Throwable $th) {
                $response = array('error' => 'Error connecting to database!!');
                return $response;
            }
        } else {
            $response = array('error' => 'There are no items in the order!!');
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
            $order = Order::find($id);
            if ($order != null) {
                $order->user = $order->user;
                $order->status = $order->status;
                $order->items = $order->items;
            }
            return $order;
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
        //
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
            $order = Order::find($id);
            if ($order != null) {
                $order->items = $order->items;
                foreach ($order->items as $item) {
                    $item->pivot->delete();
                }
                $order->delete();
                $response = array('success' => 'Order has been deleted successfully!!');
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

    /**
     * Display the specified resource by tracking number.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showBytrackingNumber($trackingNumber)
    {
        try {
            $order = Order::where('tracking_number', $trackingNumber)->first();
            if ($order != null) {
                $order->user = $order->user;
                $order->status = $order->status;
                $order->items = $order->items;
            }
            return $order;
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
    }

    /**
     * Update status of the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateStatusById(Request $request, $id)
    {
        try {
            $order = Order::find($id);
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
        if ($order != null) {
            $request->validate([
                'status_id' => 'required'
            ]);
            $status = Status::find($request->status_id);
            if ($status == null) {
                $response = array('error' => 'No status was found with the specified id!!');
                return $response;
            }
            $order->status_id = $request->status_id;
            try {
                $order->save();
                return $order;
            } catch (\Throwable $th) {
                $response = array('error' => 'Error connecting to database!!');
                return $response;
            }
        }
        $response = array('error' => 'No order was found with the specified id!!');
        return $response;
    }
    /**
     * Update status of the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateStatusByTrackingNumber(Request $request, $trackingNumber)
    {
        try {
            $order = Order::where('tracking_number', $trackingNumber)->first();
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }

        if ($order !=  null) {
            return $this->updateStatusById($request, $trackingNumber);
        } else {
            $response = array('error' => 'No order was found with the specified id!!');
            return $response;
        }
    }
}
