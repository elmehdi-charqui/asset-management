<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        $permissions = [
            'view dashboard',
            'manage equipements',
            'view equipements',
            'manage maintenances',
            'view maintenances',
            'manage licences',
            'view licences',
            'manage users',
            'view reports'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // create roles and assign created permissions
        $roleAdmin = Role::create(['name' => 'Administrateur']);
        $roleAdmin->givePermissionTo(Permission::all());

        $roleTechnicien = Role::create(['name' => 'Technicien']);
        $roleTechnicien->givePermissionTo([
            'view dashboard',
            'manage equipements',
            'view equipements',
            'manage maintenances',
            'view maintenances',
            'view licences'
        ]);

        $roleUser = Role::create(['name' => 'Utilisateur']);
        $roleUser->givePermissionTo([
            'view dashboard',
            'view equipements',
            'view maintenances'
        ]);
    }
}
