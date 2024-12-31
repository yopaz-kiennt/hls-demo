<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $table = 'applications';

    protected $fillable = [
        'user_id',
        'is_representative',
        'is_applying_for_minor',
        'representative_relationship',
        'travel_document_type',
        'birthday',
        'is_travel_date_known',
        'data',
        'status',
    ];

    protected $casts = [
        'data' => 'array',
        'screenshots' => 'array',
    ];
}
