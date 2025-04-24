<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Models\History;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    public function getAll()
    {
        $role = Role::all();

        return response()->json([
            "status" => "success",
            "data" => $role,
        ], 200);
    }

    public function store(RoleRequest $request){
         try {
            Role::create([
                'name' => $request->name,
                'permission' => $request->permission
            ]);

            $userId = Auth::user()->id;

            History::create([
                'type' => 'Role',
                'action' => 'Create',
                'note' => 'Tambah Role',
                'user_id' => $userId,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Role Successfully created'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create role: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(RoleRequest $request, $id)
    {
        try {
            $role = Role::findOrFail($id);

            $data = [
                'name' => $request->name,
                'permission' => $request->permission
            ];

            $role->update($data);

            $userId = Auth::user()->id;

            History::create([
                'type' => 'Role',
                'action' => 'Update',
                'note' => 'Update Role',
                'user_id' => $userId,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Role Successfully updated'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update role: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $role = Role::findOrFail($id);

            $userId = Auth::user()->id;

            History::create([
                'type' => 'Role',
                'action' => 'Delete',
                'note' => 'Delete Role',
                'user_id' => $userId,
            ]);

            if($role->delete()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Role Successfully deleted'
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update role: ' . $e->getMessage()
            ], 500);
        }
    }
}