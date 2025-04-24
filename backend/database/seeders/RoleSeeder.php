<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Role::query()->delete();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Role::create([
            'id' => Str::uuid(),
            'name' => 'Administrator',
            'permission' => [
                ['user_log' => 1],
                ['export_user' => 1],
                ['import_user' => 1],
            ],
        ]);

        Role::create([
            'name' => 'Employee',
            'permission' => [
                ['user_log' => 1]
            ],
        ]);
    }
}
