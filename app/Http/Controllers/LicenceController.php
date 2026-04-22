<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LicenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $licences = \App\Models\Licence::paginate(10);
        
        return \Inertia\Inertia::render('Licences/Index', [
            'licences' => $licences
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return \Inertia\Inertia::render('Licences/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'editeur' => 'nullable|string|max:255',
            'cle_licence' => 'nullable|string|max:255',
            'nombre_postes' => 'required|integer|min:1',
            'date_achat' => 'nullable|date',
            'date_expiration' => 'nullable|date',
            'prix_achat' => 'nullable|numeric|min:0',
        ]);

        \App\Models\Licence::create($validated);

        return redirect()->route('licences.index')->with('success', 'Licence ajoutée avec succès.');
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
