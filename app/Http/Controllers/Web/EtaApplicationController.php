<?php

namespace App\Http\Controllers\Web;

use App\ApplicationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EtaApplication\RegisterRequest;
use App\Models\Application;
use App\Services\RabbitMQService;
use Inertia\Inertia;

class EtaApplicationController extends Controller
{
    public function index()
    {
        return Inertia::render('Web/EtaApplication/Index');
    }

    public function register(RegisterRequest $request)
    {
        $dob = $request->get('personalDetails');
        $birthday = sprintf('%04d-%02d-%02d', $dob['dobYear'], $dob['dobMonth'], $dob['dobDay']);

        $applicationCreated = Application::create([
            'user_id' => auth()->user()->id,
            'is_representative' => $request->get('isRepresentative'),
            'is_applying_for_minor' => $request->get('isApplyingOnBehalfOfMinorChild'),
            'representative_relationship' => $request->get('representative')['representativeRelationship'],
            'travel_document_type' => $request->get('prerequisite')['travelDocumentType'],
            'birthday' => $birthday,
            'is_travel_date_known' => $request->get('travelDetails')['isTravelDateKnown'],
            'data' => $request->all(),
            'status' => ApplicationStatus::Pending->value,
        ]);

        // send message
        $rabbitmqService = new RabbitMQService;
        $queueName = config('queue.connections.rabbitmq.queue_name');
        $rabbitmqService->sendMessage($queueName, $applicationCreated->id);

        return $this->responseSuccess(null, 'Lưu thành công!');
    }
}
