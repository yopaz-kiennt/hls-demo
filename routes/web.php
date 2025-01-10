<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EtaManagementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Web\EtaApplicationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', function () {
    return redirect(route('eta_application.index'));
});
Route::get('/eta-application', [EtaApplicationController::class, 'index'])->name('eta_application.index');
Route::post('/eta-application', [EtaApplicationController::class, 'register'])->name('eta_application.register');

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
