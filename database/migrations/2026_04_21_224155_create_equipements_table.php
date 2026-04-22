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
        Schema::create('equipements', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('numero_serie')->unique();
            $table->string('marque')->nullable();
            $table->string('modele')->nullable();
            $table->date('date_achat')->nullable();
            $table->integer('garantie_mois')->default(12);
            $table->decimal('prix_achat', 10, 2)->nullable();
            $table->enum('statut', ['actif', 'en maintenance', 'hors service'])->default('actif');
            $table->foreignId('site_id')->constrained('sites')->onDelete('restrict');
            $table->foreignId('type_equipement_id')->constrained('type_equipements')->onDelete('restrict');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipements');
    }
};
