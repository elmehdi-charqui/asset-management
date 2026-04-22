<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Maintenance extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'equipement_id', 'user_id', 'description', 'date_intervention',
        'cout', 'statut'
    ];

    public function equipement()
    {
        return $this->belongsTo(Equipement::class);
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
