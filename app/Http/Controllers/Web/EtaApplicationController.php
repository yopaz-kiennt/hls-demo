<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\EtaApplication\RegisterRequest;
use Inertia\Inertia;

class EtaApplicationController extends Controller
{
    public function index()
    {
        return Inertia::render('Web/EtaApplication/Index');
    }

    public function register(RegisterRequest $request)
    {
        dd($request->all());
    }
}
