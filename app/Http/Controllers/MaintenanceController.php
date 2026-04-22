<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maintenances = \App\Models\Maintenance::with('equipement')->paginate(10);
        
        return \Inertia\Inertia::render('Maintenances/Index', [
            'maintenances' => $maintenances
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return \Inertia\Inertia::render('Maintenances/Create', [
            'equipements' => \App\Models\Equipement::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipement_id' => 'required|exists:equipements,id',
            'description' => 'required|string',
            'date_intervention' => 'required|date',
            'statut' => 'required|in:planifiee,en cours,terminee',
            'cout' => 'nullable|numeric|min:0',
        ]);

        \App\Models\Maintenance::create($validated);

        return redirect()->route('maintenances.index')->with('success', 'Intervention planifiée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
