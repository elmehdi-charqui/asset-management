<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Equipement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nom', 'numero_serie', 'marque', 'modele', 'date_achat',
        'garantie_mois', 'prix_achat', 'statut', 'site_id', 'type_equipement_id'
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    public function typeEquipement()
    {
        return $this->belongsTo(TypeEquipement::class);
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class);
    }

    public function licences()
    {
        return $this->belongsToMany(Licence::class, 'licence_equipement')->withTimestamps();
    }
}
