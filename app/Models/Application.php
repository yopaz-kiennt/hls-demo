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
        'payment_status',
        'uuid',
        'worker_log',
        'screenshots',
    ];

    protected $casts = [
        'data' => 'array',
        'screenshots' => 'array',
    ];

    protected $statusMap = [
        'success' => '申請成功',
        'pending' => '通過待ち',
        'error' => '申請失敗',
        'processing' => '処理中',
    ];

    public static $paymentStatusMap = [
        'success' => 'success',
        'error' => 'error',
    ];

    public function getStatusLabelAttribute()
    {
        return $this->statusMap[$this->status] ?? $this->status;
    }
}
