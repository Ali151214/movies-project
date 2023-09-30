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
Route::controller(ReviewController::class)->group(function(){
    Route::get('reviews', 'index');
});
Route::controller(MovieController::class)->group(function(){
    Route::get('movies', 'index');
    Route::get('movies/{id}', 'show');
});

#only for admin
Route::middleware(['auth:sanctum', 'restrictRole:admin'])->group( function () {
    Route::resource('genres', GenreController::class);
    Route::resource('countries', CountryController::class);
    Route::resource('directors', DirectorController::class);
    Route::controller(ReviewController::class)->group(function(){
        Route::post('reviews', 'store');
    });
    Route::controller(MovieController::class)->group(function(){
        Route::post('movies', 'store');
        Route::put('movies/{id}', 'update');
        Route::delete('movies/{id}', 'destroy');
    });
});

#only for auth users
Route::middleware(['auth:sanctum'])->group( function () {
    Route::controller(ReviewController::class)->group(function(){
        Route::post('reviews', 'store');
    });
});
