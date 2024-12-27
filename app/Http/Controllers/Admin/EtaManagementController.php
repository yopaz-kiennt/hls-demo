<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EtaManagementController extends Controller
{
    public function index(Request $request)
    {
        $query = Application::query();

        if (! empty($request->email)) {
            $query->whereRaw("JSON_EXTRACT(data, '$.contactDetails.emailAddress') LIKE ?", ['%'.$request->email.'%']);
        }

        if (! empty($request->date)) {
            $query->whereDate('created_at', $request->date);
        }

        if (! empty($request->status)) {
            $query->where('status', $request->status);
        }

        $applications = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Index', [
            'applications' => $applications,
            'filters' => $request->only('email', 'date', 'status'),
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
