<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Site extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['nom', 'ville', 'adresse'];

    public function equipements()
    {
        return $this->hasMany(Equipement::class);
    }
}
