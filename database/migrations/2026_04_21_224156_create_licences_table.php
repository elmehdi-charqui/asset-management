<?php

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
        Schema::create('licences', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('editeur')->nullable();
            $table->string('cle_licence')->nullable();
            $table->integer('nombre_postes')->default(1);
            $table->date('date_achat')->nullable();
            $table->date('date_expiration')->nullable();
            $table->decimal('prix_achat', 10, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licences');
    }
};
