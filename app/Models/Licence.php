<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Licence extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nom', 'editeur', 'cle_licence', 'nombre_postes',
        'date_achat', 'date_expiration', 'prix_achat'
    ];

    public function equipements()
    {
        return $this->belongsToMany(Equipement::class, 'licence_equipement')->withTimestamps();
    }
}
