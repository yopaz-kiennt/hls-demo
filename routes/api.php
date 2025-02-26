<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Payment\PaymentController;

Route::post('/payment/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');
