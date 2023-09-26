<?php

use App\Http\Controllers\AuthController;
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

Route::post('users/register', [AuthController::class, "register"]);
Route::post('login', [AuthController::class, "login"])->name('login');
Route::get('users/list/all-data', [AuthController::class, "users"])->name('users');
Route::get('users/list/data/', [AuthController::class, "usersData"])->name('usersData');

Route::get('users/user', [AuthController::class, "userId"]);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, "user"]);
    Route::post('logout', [AuthController::class, "logout"]);

});
