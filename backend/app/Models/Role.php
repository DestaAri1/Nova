<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'roles';

    protected $fillable = [
        'name',
        'date_time',
        'is_active',
        'permission',
    ];

    protected $casts = [
        'permission' => 'array',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'role_id');
    }
}