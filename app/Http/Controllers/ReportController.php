<?php

namespace App\Http\Controllers;

use App\Models\Equipement;
use App\Models\Maintenance;
use App\Models\Licence;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $stats = [
            'total_value' => Equipement::sum('prix_achat'),
            'maintenance_costs' => Maintenance::sum('cout'),
            'expiring_licences' => Licence::where('date_expiration', '<', now()->addMonth())->count(),
            'assets_by_status' => [
                'actif' => Equipement::where('statut', 'actif')->count(),
                'maintenance' => Equipement::where('statut', 'en maintenance')->count(),
                'hors_service' => Equipement::where('statut', 'hors service')->count(),
            ]
        ];

        return Inertia::render('Reports/Index', [
            'stats' => $stats
        ]);
    }
}
