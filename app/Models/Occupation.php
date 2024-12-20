<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Occupation extends Model
{
    protected $table = 'occupations';

    protected $fillable = [
        'title_en',
        'title_jp',
        'value'
    ];

    public function jobTitles(): HasMany
    {
        return $this->hasMany(JobTitle::class);
    }
}
