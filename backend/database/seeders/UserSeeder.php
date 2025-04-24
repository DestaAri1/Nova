<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::query()->delete();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $adminRole = Role::where('name', 'Administrator')->first();
        $employeeRole = Role::where('name', 'Employee')->first();

        if ($adminRole) {
            User::create([
                'name' => 'Admin Nova',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('12345678'),
                'role_id' => $adminRole->id,
            ]);
            User::create([
                'name' => 'Employee Nova',
                'email' => 'employee@gmail.com',
                'password' => bcrypt('12345678'),
                'role_id' => $employeeRole->id,
            ]);
        } else {
            throw new \Exception("Administrator role not found. Run RoleSeeder first.");
        }
    }
}