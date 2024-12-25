<?php

namespace App\Http\Controllers\Admin;

use App\ApplicationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EtaApplication\RegisterRequest;
use App\Models\Application;
use App\Services\RabbitMQService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class EtaManagementController extends Controller
{
    public function index()
    {
        $applications = Application::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Index', [
            'applications' => $applications
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $application = Application::findOrFail($id);

        $application->status = $request->input('status');
        $application->save();

        return response()->json(['status' => $application->status]);
    }

}
