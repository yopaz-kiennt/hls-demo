<?php

namespace App\Http\Controllers\Api;

use App\ApplicationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EtaApplication\RegisterRequest;
use App\Models\Application;
use App\Models\Occupation;
use App\Services\RabbitMQService;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function list(Request $request)
    {
        // $token = request()->bearerToken();

        // if ($token !== config('auth.api_bearer_token')) {
        //     abort(401);
        // }

        return Application::orderByDesc('id')->paginate(10);
    }

    public function details(int $id)
    {
        // $token = request()->bearerToken();

        // if ($token !== config('auth.api_bearer_token')) {
        //     abort(401);
        // }

        return Application::findOrFail($id);
    }
 
}
