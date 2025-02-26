<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
        return Inertia::render('Payment/Success', [
            'contactEmail' => config('payment.contact_email'),
        ]);
    }

    public function webhook(Request $request)
    {
        if (isset($request->data['object']['metadata']['application_uuid'])) {
            $applicationUuid = $request->data['object']['metadata']['application_uuid'];

            if ($request->type == 'checkout.session.completed' || $request->type == 'checkout.session.async_payment_succeeded') {
                Application::where('uuid', $applicationUuid)->update([
                    'payment_status' => Application::$paymentStatusMap['success'],
                ]);
            } else {
                Application::where('uuid', $applicationUuid)->update([
                    'payment_status' => Application::$paymentStatusMap['error'],
                ]);
            }
        }
    }
}
