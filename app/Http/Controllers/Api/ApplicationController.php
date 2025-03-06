<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function update(Request $request, int $id)
    {
        $token = request()->bearerToken();
        if ($token !== config('auth.api_bearer_token')) {
            abort(401);
        }

        $input = $request->only([
            'puppeteerLog',
            'status'
        ]);

        $updateData = [];
        if (isset($input['puppeteerLog'])) {
            $updateData['puppeteer_log'] = $input['puppeteerLog'];
        }
        if (isset($input['status'])) {
            $updateData['status'] = $input['status'];
        }

        return Application::where('id', $id)->update($updateData);
    }

    public function details(int $id)
    {
        $token = request()->bearerToken();
        if ($token !== config('auth.api_bearer_token')) {
            abort(401);
        }

        return Application::where('id', $id)
            ->where('payment_status', 'paid')
            ->where('status', '!=', 'processing')
            ->where('status', '!=', 'success')
            ->firstOrFail();
    }
}
