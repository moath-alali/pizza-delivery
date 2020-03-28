<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $result = Role::all();
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
            'role' => 'required|string|max:255'
        ]);
        try {
            $role = new Role();
            $role->role = $request->role;
            $role->save();
            return $role;
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
            $result = Role::find($id);
            if($result != null){
                $result->users = $result->users;
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
            'role' => 'required|string|max:255'
        ]);
        try {
            $role = Role::find($id);
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
        if ($role != null) {
            try {
                $role->role = $request->role;
                $role->save();
                return $role;
            } catch (\Throwable $th) {
                $response = array('error' => 'Error connecting to database!!');
                return $response;
            }
        } else {
            $response = array('error' => 'No rols with the specified id was found!!');
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
            $role = Role::find($id);
            if ($role != null) {
                $role->delete();
                $response = array('success' => 'Role has been deleted successfully!!');
                return $response;
            } else {
                $response = array('error' => 'No role was found with the specified id!!');
                return $response;
            }
        } catch (\Throwable $th) {
            $response = array('error' => 'Error connecting to database!!');
            return $response;
        }
    }
}
