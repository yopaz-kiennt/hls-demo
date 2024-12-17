<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class Controller
{
    protected function response($failed, $data = null, $message = '', $customStatus = null): JsonResponse
    {
        $status = ! is_null($customStatus) ? $customStatus : ($failed ? 422 : 200);

        return response()->json([
            'message' => empty($message) ? null : $message,
            'data' => $data,
        ], $status);
    }

    protected function responseSuccess($data = null, $message = '', $customStatus = null): JsonResponse
    {
        return $this->response(false, $data, $message, $customStatus);
    }

    protected function responseFail($data = null, $message = '', $customStatus = null): JsonResponse
    {
        return $this->response(true, $data, $message, $customStatus);
    }
}
