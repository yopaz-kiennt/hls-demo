<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('Web/Home');
    }

    public function policy()
    {
        return Inertia::render('Web/Policy');
    }

    public function service()
    {
        return Inertia::render('Web/Service');
    }
}
