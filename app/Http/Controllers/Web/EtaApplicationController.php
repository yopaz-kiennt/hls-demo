<?php

namespace App\Http\Controllers\Web;

use App\ApplicationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EtaApplication\RegisterRequest;
use App\Models\Application;
use App\Models\Occupation;
use App\Services\RabbitMQService;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EtaApplicationController extends Controller
{
    public function index()
    {

        $occupations = Occupation::with('jobTitles')->get();

        return Inertia::render('Web/EtaApplication/Index', [
            'occupations' => $occupations,
        ]);
    }

    public function register(RegisterRequest $request)
    {
        $applicationCreated = Application::create([
            'is_representative' => $request->get('isRepresentative'),
            'is_applying_for_minor' => $request->get('isApplyingOnBehalfOfMinorChild'),
            'representative_relationship' => $request->get('representative')['representativeRelationship'],
            'travel_document_type' => $request->get('prerequisite')['travelDocumentType'],
            'birthday' => $this->getBirthday($request),
            'is_travel_date_known' => $request->get('travelDetails')['isTravelDateKnown'],
            'data' => $request->all(),
            'status' => ApplicationStatus::Pending->value,
            'uuid' => Str::uuid(),
        ]);

        return $this->responseSuccess([
            'applicationUuid' => $applicationCreated->uuid,
        ]);
    }

    private function getBirthday($request)
    {
        $dob = $request->get('personalDetails');
        $monthMapping = [
            'January' => 1,
            'February' => 2,
            'March' => 3,
            'April' => 4,
            'May' => 5,
            'June' => 6,
            'July' => 7,
            'August' => 8,
            'September' => 9,
            'October' => 10,
            'November' => 11,
            'December' => 12,
        ];
        $birthday = sprintf('%04d-%02d-%02d', $dob['dobYear'], $monthMapping[$dob['dobMonth']], $dob['dobDay']);

        return $birthday;
    }

    public function pay(string $applicationUuid)
    {
        Application::where('uuid', $applicationUuid)->firstOrFail();

        return Inertia::render('Web/EtaApplication/Pay', [
            'applicationUuid' => $applicationUuid,
        ]);
    }
}
