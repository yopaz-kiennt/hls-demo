<?php

namespace App\Http\Controllers\Admin;

use App\ApplicationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EtaApplication\RegisterRequest;
use App\Models\Application;
use App\Services\RabbitMQService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EtaManagementController extends Controller
{
    public function index()
    {
        $applications = Application::paginate(10);

        // dd($applications);

        return Inertia::render('Admin/Index', [
            'applications' => $applications
        ]);
    }
}
