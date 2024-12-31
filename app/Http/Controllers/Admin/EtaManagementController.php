<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Occupation;
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

        $occupations = Occupation::with('jobTitles')->get();

        return Inertia::render('Admin/EtaManagement/Index', [
            'applications' => $applications,
            'filters' => $request->only('email', 'date', 'status'),
            'occupations' => $occupations,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $application = Application::findOrFail($id);

        $application->status = $request->input('status');
        $application->save();

        return $this->responseSuccess([
            'status' => $application->status,
        ]);
    }
}
