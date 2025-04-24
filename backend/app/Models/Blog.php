<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasUuids, SoftDeletes, HasFactory;

    protected $table = 'blogs';

    protected $fillable = [
        'title',
        'slug',
        'category_id',
        'text',
        'is_active',
        'date_time',
    ];

    protected $casts = [
        'category_id' => 'array',
    ];
}