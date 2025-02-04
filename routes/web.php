<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EtaManagementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Web\EtaApplicationController;
use App\Http\Controllers\Web\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
});

Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::get('/', function () {
        return redirect(route('admin.eta_management.index'));
    });
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/eta-management', [EtaManagementController::class, 'index'])->name('eta_management.index');
    Route::post('/eta-management/{id}/status', [EtaManagementController::class, 'updateStatus'])->name('eta_management.update_status');
    Route::post('/eta-management/{id}/resend-email', [EtaManagementController::class, 'resendEmail'])->name('eta_management.resend_email');
});

require __DIR__ . '/auth.php';
