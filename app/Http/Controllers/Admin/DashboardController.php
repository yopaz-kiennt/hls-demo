<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RabbitMQService;
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

        $rabbitmqService = new RabbitMQService();
        $rabbitmqService->sendMessage(config('queue.connections.rabbitmq.queue'), json_encode($message));

        return Inertia::render('Admin/Dashboard');
    }
}
