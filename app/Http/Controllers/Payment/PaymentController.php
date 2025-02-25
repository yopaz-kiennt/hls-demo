<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function checkout()
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
}
