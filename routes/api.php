<?php

use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApplicationController;

Route::post('/payment/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');
Route::group(['prefix' => 'applications', 'as' => 'applications.'], function () {
    Route::get('/', [ApplicationController::class, 'list'])->name('list');
    Route::get('/{id}', [ApplicationController::class, 'details'])->name('details');
});
