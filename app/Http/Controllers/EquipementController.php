<?php

namespace App\Http\Controllers;

use App\Models\Equipement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipements = Equipement::with(['site', 'typeEquipement'])->paginate(10);
        
        return Inertia::render('Equipements/Index', [
            'equipements' => $equipements
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Equipements/Create', [
            'sites' => \App\Models\Site::all(),
            'types' => \App\Models\TypeEquipement::all(),
        ]);
    }

    /**
     * Export equipments list as PDF.
     */
    public function exportPdf()
    {
        $equipements = Equipement::with(['site', 'typeEquipement'])->get();
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.equipements', compact('equipements'));
        
        return $pdf->download('inventaire-equipements-ocp.pdf');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'numero_serie' => 'required|string|max:255|unique:equipements,numero_serie',
            'marque' => 'nullable|string|max:255',
            'modele' => 'nullable|string|max:255',
            'site_id' => 'required|exists:sites,id',
            'type_equipement_id' => 'required|exists:type_equipements,id',
            'statut' => 'required|in:actif,en maintenance,hors service',
        ]);

        Equipement::create($validated);

        return redirect()->route('equipements.index')->with('success', 'Équipement ajouté avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipement $equipement)
    {
        return Inertia::render('Equipements/Show', [
            'equipement' => $equipement->load(['site', 'typeEquipement', 'maintenances'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipement $equipement)
    {
        return Inertia::render('Equipements/Edit', [
            'equipement' => $equipement,
            'sites' => \App\Models\Site::all(),
            'types' => \App\Models\TypeEquipement::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipement $equipement)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'numero_serie' => 'required|string|max:255|unique:equipements,numero_serie,' . $equipement->id,
            'marque' => 'nullable|string|max:255',
            'modele' => 'nullable|string|max:255',
            'site_id' => 'required|exists:sites,id',
            'type_equipement_id' => 'required|exists:type_equipements,id',
            'statut' => 'required|in:actif,en maintenance,hors service',
        ]);

        $equipement->update($validated);

        return redirect()->route('equipements.index')->with('success', 'Équipement mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipement $equipement)
    {
        $equipement->delete();

        return redirect()->route('equipements.index')->with('success', 'Équipement supprimé avec succès.');
    }
}
