<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\History;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(AuthRequest $request) {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kredensial yang diberikan tidak valid.',
                'errors' => [
                    'email' => ['Kredensial yang diberikan tidak valid.']
                ]
            ], 401);
        }

        $token = $user->createToken("pifacia")->plainTextToken;

        History::create([
            'type' => 'User',
            'action' => 'Login',
            'note' => 'Login Kedalam Aplikasi',
            'user_id' => $user->id
        ]);

        return response()->json([
            "status" => "success",
            "message" => "Login berhasil",
            "token" => $token,
        ], 200);
    }

    public function register(AuthRequest $request) {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role,
        ]);

        History::create([
            'type' => 'User',
            'action' => 'Register',
            'note' => 'Register User',
            'user_id' => $user->id
        ]);

        return response()->json([
            "status" => "success",
            "message" => "Registrasi berhasil",
        ], 201);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout success'
        ], 200);
    }

    public function getUser(Request $request) {
        return $request->user()->load('role');
    }
}
