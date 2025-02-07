<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function login()
    {
        return Inertia::render('Admin/Login');
    }

    public function handleLogin(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (
            auth('web')->attempt($credentials)
        ) {
            return $this->responseSuccess(null, 'Success');
        }

        return $this->responseFail(null, 'メールアドレスもしくはパスワードが間違っています');
    }

    public function logout()
    {
        auth('web')->logout();

        return Inertia::location(route('admin.login'));
    }
}
