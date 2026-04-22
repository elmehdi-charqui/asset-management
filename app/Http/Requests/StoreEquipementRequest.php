<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'numero_serie' => 'required|string|max:255|unique:equipements,numero_serie',
            'site_id' => 'required|exists:sites,id',
            'type_equipement_id' => 'required|exists:type_equipements,id',
            'statut' => 'required|in:actif,en maintenance,hors service',
        ];
    }
}
