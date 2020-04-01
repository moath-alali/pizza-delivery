<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    // alternative method
    if (($user = Auth::user()) !== null) {
        // Here you have your authenticated user model
        return response()->json($user);
    }
    return response(['user'=> $request->user(), 'hi'=> 'hi']);
});

//authentication routes
Route::post('/register', 'Api\AuthController@register');
Route::post('/login', 'Api\AuthController@login');
Route::middleware('auth:api')->get('/logout', 'Api\AuthController@logout');

//category routes
Route::get('/category', 'Api\CategoryController@index');
Route::get('/category/{id}', 'Api\CategoryController@show');
Route::middleware('auth:api')->delete('/category/{id}', 'Api\CategoryController@destroy');
Route::middleware('auth:api')->post('/category', 'Api\CategoryController@store');
Route::middleware('auth:api')->put('/category/{id}', 'Api\CategoryController@update');

//item routes
Route::get('/item', 'Api\ItemController@index');
Route::post('/item/many', 'Api\ItemController@getMany');
Route::get('/item/{id}', 'Api\ItemController@show');
Route::middleware('auth:api')->delete('/item/{id}', 'Api\ItemController@destroy');
Route::middleware('auth:api')->post('/item', 'Api\ItemController@store');
Route::middleware('auth:api')->put('/item/{id}', 'Api\ItemController@update');

//status routes
Route::get('/status', 'Api\StatusController@index');
Route::get('/status/{id}', 'Api\StatusController@show');
Route::middleware('auth:api')->delete('/status/{id}', 'Api\StatusController@destroy');
Route::middleware('auth:api')->post('/status', 'Api\StatusController@store');
Route::middleware('auth:api')->put('/status/{id}', 'Api\StatusController@update');

//role routes
Route::get('/role', 'Api\RoleController@index');
Route::get('/role/{id}', 'Api\RoleController@show');
Route::middleware('auth:api')->delete('/role/{id}', 'Api\RoleController@destroy');
Route::middleware('auth:api')->post('/role', 'Api\RoleController@store');
Route::middleware('auth:api')->put('/role/{id}', 'Api\RoleController@update');

//user routes
Route::middleware('auth:api')->get('/user', 'Api\UserController@show');

//order routes
Route::get('/order', 'Api\OrderController@index');
Route::get('/order/{id}', 'Api\OrderController@show');
Route::get('/order/track/{trackingNumber}', 'Api\OrderController@showByTrackingNumber');
Route::post('/order', 'Api\OrderController@store');
Route::middleware('auth:api')->put('/order/{id}', 'Api\OrderController@updateStatusById');
Route::middleware('auth:api')->put('/order/update-status/{trackingNumber}', 'Api\OrderController@updateStatusByTrackingNumber');
//Route::delete('/order/{id}', 'Api\OrderController@destroy');