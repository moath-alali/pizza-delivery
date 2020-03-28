<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $result = Status::all();
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
            'status' => 'required|string|max:255'
        ]);
        try {
            $status = new Status();
            $status->status = $request->status;
            $status->save();
            return $status;
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
            $result = Status::find($id);
            if($result != null){
                $result->orders = $result->orders;
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
            'status' => 'required|string|max:255'
        ]);
        try {
            $status = Status::find($id);
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
        if ($status != null) {
            try {
                $status->status = $request->status;
                $status->save();
                return $status;
            } catch (\Throwable $th) {
                $response = array('error' => 'Error connecting to database!!');
                return $response;
            }
        } else {
            $response = array('error' => 'No status with the specified id was found!!');
            return $response;
        }
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
            $status = Status::find($id);
            if ($status != null) {
                $status->delete();
                $response = array('success' => 'status has been deleted successfully!!');
                return $response;
            } else {
                $response = array('error' => 'No status was found with the specified id!!');
                return $response;
            }
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
    }
}
