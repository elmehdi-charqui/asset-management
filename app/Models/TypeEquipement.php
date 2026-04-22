<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeEquipement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['nom', 'description'];

    public function equipements()
    {
        return $this->hasMany(Equipement::class);
    }
}
