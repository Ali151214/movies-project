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
Route::controller(GenreController::class)->group(function(){
    Route::get('genres', 'index');
    Route::get('genres/{id}', 'show');
});
Route::controller(CountryController::class)->group(function(){
    Route::get('countries', 'index');
    Route::get('countries/{id}', 'show');
});
Route::controller(DirectorController::class)->group(function(){
    Route::get('directors', 'index');
    Route::get('directors/{id}', 'show');
});

#only for admin
Route::middleware(['auth:sanctum', 'restrictRole:admin'])->group( function () {
    Route::controller(ReviewController::class)->group(function(){
        Route::post('reviews', 'store');
    });
    Route::controller(MovieController::class)->group(function(){
        Route::post('movies', 'store');
        Route::put('movies/{id}', 'update');
        Route::delete('movies/{id}', 'destroy');
    });
    Route::controller(DirectorController::class)->group(function(){
        Route::post('directors', 'store');
        Route::put('directors/{id}', 'update');
        Route::delete('directors/{id}', 'destroy');
    });
    Route::controller(CountryController::class)->group(function(){
        Route::post('countries', 'store');
        Route::put('countries/{id}', 'update');
        Route::delete('countries/{id}', 'destroy');
    });
    Route::controller(GenreController::class)->group(function(){
        Route::post('genres', 'store');
        Route::put('genres/{id}', 'update');
        Route::delete('genres/{id}', 'destroy');
    });
});

#only for auth users
Route::middleware(['auth:sanctum'])->group( function () {
    Route::controller(ReviewController::class)->group(function(){
        Route::post('reviews', 'store');
    });
});
