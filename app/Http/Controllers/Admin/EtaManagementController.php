<?php

namespace App\Http\Controllers\Admin;

use App\ApplicationStatus;
use App\Http\Controllers\Controller;
use App\Mail\ApprovedApplicationInfoMail;
use App\Mail\RejectApplicationInfoMail;
use App\Mail\SendApplicationMail;
use App\Models\Application;
use App\Models\Occupation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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
        $status = $request->get('status');

        $application = Application::findOrFail($id);
        $application->update(['status' => $status]);

        $emailCustomer = $application->data['contactDetails']['emailAddress'];

        $this->sendMail($emailCustomer, $status, $application);

        return $this->responseSuccess([
            'status' => $application->status,
        ]);
    }

    public function resendEmail($id)
    {
        $application = Application::findOrFail($id);

        $emailCustomer = $application->data['contactDetails']['emailAddress'];

        $this->sendMail($emailCustomer, $application->status, $application);

        return $this->responseSuccess(null, __('messages.mail_sent_successfully'));
    }

    private function sendMail($email, $status, $application)
    {
        $fullName = $application->data['personalDetails']['lastName'].$application->data['personalDetails']['firstName'];
        $title = '【 '.$fullName.'】様　の登録状況のお知らせーCanada eTA 申請サポート';

        Mail::to($email)->send(new SendApplicationMail($title, $application));

        // if ($status === ApplicationStatus::Success->value) {
        //     Mail::to($email)->send(new ApprovedApplicationInfoMail);
        // }

        // if ($status === ApplicationStatus::Error->value) {
        //     Mail::to($email)->send(new RejectApplicationInfoMail);
        // }
    }
}
