<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Site;
use App\Models\TypeEquipement;
use App\Models\Equipement;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('Starting seeder...');
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        $this->command->info('Permissions cleared.');

        // Create Roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $this->command->info('Admin role ready.');
        $technicianRole = Role::firstOrCreate(['name' => 'technicien']);
        $userRole = Role::firstOrCreate(['name' => 'utilisateur']);
        $this->command->info('Roles ready.');

        // Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@ocp.ma'],
            [
                'name' => 'Admin OCP',
                'password' => Hash::make('password'),
            ]
        );
        $admin->assignRole($adminRole);
        $this->command->info('Admin user ready.');

        // Create Technician User
        $tech = User::firstOrCreate(
            ['email' => 'tech@ocp.ma'],
            [
                'name' => 'Technicien OCP',
                'password' => Hash::make('password'),
            ]
        );
        $tech->assignRole($technicianRole);
        $this->command->info('Tech user ready.');

        // Create Sites
        $siteSafi = Site::firstOrCreate(['nom' => 'OCP Safi'], ['ville' => 'Safi']);
        $siteJorf = Site::firstOrCreate(['nom' => 'OCP Jorf Lasfar'], ['ville' => 'El Jadida']);
        $this->command->info('Sites ready.');

        // Create Equipment Types
        $typePC = TypeEquipement::firstOrCreate(['nom' => 'PC Portable'], ['description' => 'Ordinateur portable de travail']);
        $typeServer = TypeEquipement::firstOrCreate(['nom' => 'Serveur'], ['description' => 'Serveur rackable']);
        $this->command->info('Types ready.');

        // Create Equipments
        if (Equipement::count() === 0) {
            Equipement::create([
                'nom' => 'ThinkPad T14',
                'numero_serie' => 'SN-123456',
                'marque' => 'Lenovo',
                'modele' => 'T14 Gen 2',
                'date_achat' => now()->subMonths(6),
                'garantie_mois' => 36,
                'statut' => 'actif',
                'site_id' => $siteSafi->id,
                'type_equipement_id' => $typePC->id,
            ]);

            Equipement::create([
                'nom' => 'Dell PowerEdge R740',
                'numero_serie' => 'SN-SRV-789',
                'marque' => 'Dell',
                'modele' => 'R740',
                'date_achat' => now()->subYears(1),
                'garantie_mois' => 60,
                'statut' => 'actif',
                'site_id' => $siteJorf->id,
                'type_equipement_id' => $typeServer->id,
            ]);
        }
        $this->command->info('Equipments ready.');
        $this->command->info('Seeding completed successfully!');
    }
}
