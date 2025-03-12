<?php

return [
    'stripe' => [
        'public_key' => env('STRIPE_PUBLIC_KEY', ''),
        'secret_key' => env('STRIPE_SECRET_KEY', ''),
    ],
    'contact_email' => env('CONTACT_EMAIL', ''),
    'total_amount' => env('TOTAL_AMOUNT', 4200),
];
