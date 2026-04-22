import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, Wrench, Search, Clock } from 'lucide-react';

export default function Index({ maintenances }) {
    return (
        <AuthenticatedLayout>
            <Head title="Maintenance | ASSET MGMT" />
            
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-display font-extrabold text-white">Suivi de Maintenance</h2>
                        <p className="text-gray-500 mt-1">Gerez les interventions sur le parc informatique.</p>
                    </div>
                    <Link 
                        href={route('maintenances.create')}
                        className="bg-ocp-green hover:bg-ocp-accent text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all shadow-lg shadow-ocp-green/20"
                    >
                        <Plus className="mr-2" size={20} />
                        Planifier une intervention
                    </Link>
                </div>

                <div className="glass-panel overflow-hidden border-white/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-white/5 text-gray-200 uppercase text-[10px] tracking-widest font-bold">
                                <tr>
                                    <th className="px-6 py-4">Equipement</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Date Debut</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {maintenances.data.map((m) => (
                                    <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">{m.equipement?.nom || 'N/A'}</div>
                                            <div className="text-xs text-gray-600">{m.equipement?.numero_serie}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-300 max-w-xs truncate">{m.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                             <div className="flex items-center gap-2 text-gray-400">
                                                 <Clock size={14} />
                                                 {m.date_intervention}
                                             </div>
                                         </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                                                m.statut === 'terminee' ? 'bg-ocp-green/10 text-ocp-green' :
                                                m.statut === 'en cours' ? 'bg-orange-500/10 text-orange-400' :
                                                'bg-blue-500/10 text-blue-400'
                                            }`}>
                                                 {m.statut}
                                             </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link 
                                                href={route('maintenances.show', m.id)}
                                                className="text-ocp-green hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {maintenances.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3 text-gray-600">
                                                <Wrench size={40} strokeWidth={1} />
                                                <p className="text-sm font-medium">Aucune intervention enregistree.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
