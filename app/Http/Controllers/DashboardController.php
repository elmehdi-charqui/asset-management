<?php

namespace App\Http\Controllers;

use App\Models\Equipement;
use App\Models\Maintenance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_equipements' => Equipement::count(),
            'active_equipements' => Equipement::where('statut', 'actif')->count(),
            'maintenances_en_cours' => Maintenance::where('statut', 'en cours')->count(),
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}
