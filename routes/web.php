<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\EtaManagementController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Web\EtaApplicationController;
use App\Http\Controllers\Web\HomeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('/policy', [HomeController::class, 'policy'])->name('policy');
Route::get('/service', [HomeController::class, 'service'])->name('service');

Route::group(['prefix' => 'eta', 'as' => 'eta_application.'], function () {
    Route::get('/', [EtaApplicationController::class, 'index'])->name('index');
    Route::post('/', [EtaApplicationController::class, 'register'])->name('register');
    Route::get('/pay/{applicationUuid}', [EtaApplicationController::class, 'pay'])->name('pay');
});

Route::group(['prefix' => 'payment', 'as' => 'payment.'], function () {
    Route::post('/checkout/{applicationUuid}', [PaymentController::class, 'checkout'])->name('checkout');
    Route::get('/success', [PaymentController::class, 'success'])->name('success');
    Route::get('/cancel', [PaymentController::class, 'cancel'])->name('cancel');
});

Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::middleware('guest_admin')->group(function () {
        Route::get('/login', [AdminController::class, 'login'])->name('login');
        Route::post('/login', [AdminController::class, 'handleLogin'])->name('login');
    });

    Route::middleware('auth_admin')->group(function () {
        Route::get('/', function () {
            return redirect(route('admin.eta_management.index'));
        });
        Route::get('/eta-management', [EtaManagementController::class, 'index'])->name('eta_management.index');
        Route::post('/eta-management/{id}/status', [EtaManagementController::class, 'updateStatus'])->name('eta_management.update_status');
        Route::post('/eta-management/{id}/resend-email', [EtaManagementController::class, 'resendEmail'])->name('eta_management.resend_email');

        Route::get('/logout', [AdminController::class, 'logout'])->name('logout');
    });
});

require __DIR__.'/auth.php';
