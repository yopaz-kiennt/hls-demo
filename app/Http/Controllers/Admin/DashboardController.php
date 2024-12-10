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
            'id' => 1,
            'email' => 'dangthang@example.com',
            'name' => 'Thang Pham Dang',
        ];

        $rabbitmqService = new RabbitMQService;
        $exchange = 'record_saved';
        $routingKey = 'puppeteer_run';
        $rabbitmqService->sendMessage($exchange, $routingKey, json_encode($message));

        return Inertia::render('Admin/Dashboard');
    }
}
