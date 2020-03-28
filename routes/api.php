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
Route::delete('/category/{id}', 'Api\CategoryController@destroy');
Route::post('/category', 'Api\CategoryController@store');
Route::put('/category/{id}', 'Api\CategoryController@update');

//item routes
Route::get('/item', 'Api\ItemController@index');
Route::get('/item/{id}', 'Api\ItemController@show');
Route::delete('/item/{id}', 'Api\ItemController@destroy');
Route::post('/item', 'Api\ItemController@store');
Route::put('/item/{id}', 'Api\ItemController@update');

//status routes
Route::get('/status', 'Api\StatusController@index');
Route::get('/status/{id}', 'Api\StatusController@show');
Route::delete('/status/{id}', 'Api\StatusController@destroy');
Route::post('/status', 'Api\StatusController@store');
Route::put('/status/{id}', 'Api\StatusController@update');

//role routes
Route::get('/role', 'Api\RoleController@index');
Route::get('/role/{id}', 'Api\RoleController@show');
Route::delete('/role/{id}', 'Api\RoleController@destroy');
Route::post('/role', 'Api\RoleController@store');
Route::put('/role/{id}', 'Api\RoleController@update');

//user routes
Route::get('/user/{id}', 'Api\UserController@show');

//order routes
Route::get('/order', 'Api\OrderController@index');
Route::get('/order/{id}', 'Api\OrderController@show');
Route::get('/order/track/{trackingNumber}', 'Api\OrderController@showByTrackingNumber');
Route::post('/order', 'Api\OrderController@store');
Route::put('/order/{id}', 'Api\OrderController@updateStatusById');
Route::put('/order/update-status/{trackingNumber}', 'Api\OrderController@updateStatusByTrackingNumber');
//Route::delete('/order/{id}', 'Api\OrderController@destroy');