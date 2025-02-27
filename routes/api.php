<?php

use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/payment/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');
