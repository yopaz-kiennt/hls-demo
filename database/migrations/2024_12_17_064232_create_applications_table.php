<?php

use App\ApplicationStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->boolean('is_representative');
            $table->boolean('is_applying_for_minor')->nullable();
            $table->integer('representative_relationship');
            $table->integer('travel_document_type');
            $table->date('birthday');
            $table->boolean('is_travel_date_known')->nullable();
            $table->json('data');
            $table->enum('status', ['pending', 'active', 'inactive'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
