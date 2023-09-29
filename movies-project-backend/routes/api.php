<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\DirectorController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\MovieController;

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


# public routes
Route::controller(RegisterController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});
Route::resource('movies', MovieController::class);
Route::resource('reviews', ReviewController::class);

#only for admin
Route::middleware(['auth:sanctum', 'restrictRole:admin'])->group( function () {
    Route::resource('genres', GenreController::class);
    Route::resource('countries', CountryController::class);
    Route::resource('directors', DirectorController::class);
});
