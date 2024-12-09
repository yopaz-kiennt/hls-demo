<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessRabbitMQMessage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $message = [
            'id' => 123,
            'email' => 'user@example.com',
            'name' => 'John Doe',
        ];

        ProcessRabbitMQMessage::dispatch($message);

        return Inertia::render('Admin/Dashboard');
    }
}
