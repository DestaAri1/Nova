<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class GenerateSlug {
    /**
     * Generate unique slug for any model.
     *
     * @param string $title
     * @param string $modelClass Full namespace of the model, e.g., App\Models\Ticket
     * @param string $column Column name to check uniqueness, default 'slug'
     * @return string
     */
    public static function slug(string $title, string $modelClass, string $column = 'slug'): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while ($modelClass::where($column, $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }
}
