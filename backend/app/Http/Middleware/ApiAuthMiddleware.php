<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Coba autentikasi menggunakan guard sanctum
        if (Auth::guard('sanctum')->check()) {
            Auth::shouldUse('sanctum');
            return $next($request);
        }

        // Atau coba guard api
        if (Auth::guard('api')->check()) {
            Auth::shouldUse('api');
            return $next($request);
        }

        // Tidak ada user yang terautentikasi
        return response()->json(['message' => 'Unauthenticated'], 401);
    }
}