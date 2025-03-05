<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\RabbitMQService;

class PaymentController extends Controller
{
    public function checkout(string $applicationUuid)
    {
        \Stripe\Stripe::setApiKey(config('payment.stripe.secret_key'));
        header('Content-Type: application/json');

        $checkoutSession = \Stripe\Checkout\Session::create([
            'line_items' => [[
                'price_data' => [
                    'currency' => 'jpy',
                    'product_data' => [
                        'name' => 'eTA Payment',
                    ],
                    'unit_amount' => 4141,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => config('app.url') . '/payment/success',
            'cancel_url' => config('app.url') . '/payment/cancel',
            'metadata' => [
                'application_uuid' => $applicationUuid,
            ],
        ]);

        header("HTTP/1.1 303 See Other");
        header("Location: " . $checkoutSession->url);
    }

    public function success()
    {
        return Inertia::render('Payment/Success');
    }

    public function cancel()
    {
        return Inertia::render('Payment/Cancel', [
            'contactEmail' => config('payment.contact_email'),
        ]);
    }

    public function webhook(Request $request)
    {
        Log::info($request->all());

        if (isset($request->data['object']['metadata']['application_uuid']) && isset($request->data['object']['payment_status'])) {
            $applicationUuid = $request->data['object']['metadata']['application_uuid'];
            $paymentStatus = $request->data['object']['payment_status'];

            if ($request->type === 'checkout.session.completed' || $request->type === 'checkout.session.async_payment_succeeded') {
                $application = Application::where('uuid', $applicationUuid)->firstOrFail();
                $application->update([
                    'payment_status' => $paymentStatus
                ]);
            }
        }
    }
}
