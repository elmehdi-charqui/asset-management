import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, FileKey, Search, AlertCircle } from 'lucide-react';

export default function Index({ licences }) {
    return (
        <AuthenticatedLayout>
            <Head title="Licences - OCP Asset Management" />
            
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-display font-extrabold text-white">Gestion des Licences</h2>
                        <p className="text-gray-500 mt-1">Suivez vos abonnements et cles logicielles.</p>
                    </div>
                    <Link 
                        href={route('licences.create')}
                        className="bg-ocp-green hover:bg-ocp-accent text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all shadow-lg shadow-ocp-green/20"
                    >
                        <Plus className="mr-2" size={20} />
                        Ajouter une licence
                    </Link>
                </div>

                <div className="glass-panel overflow-hidden border-white/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-white/5 text-gray-200 uppercase text-[10px] tracking-widest font-bold">
                                <tr>
                                    <th className="px-6 py-4">Logiciel</th>
                                    <th className="px-6 py-4">Editeur</th>
                                    <th className="px-6 py-4">Expiration</th>
                                    <th className="px-6 py-4">Utilisation</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {licences.data.map((l) => (
                                    <tr key={l.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">{l.nom}</div>
                                            <div className="text-xs text-gray-600">{l.cle_licence}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-300 font-medium">{l.editeur}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <AlertCircle size={14} className="text-ocp-gold" />
                                                {l.date_expiration || 'Perpetuelle'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full bg-white/5 rounded-full h-1.5 max-w-[100px]">
                                                <div className="bg-ocp-green h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                            </div>
                                            <span className="text-[10px] mt-1 block">65% utilisee</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-ocp-green hover:text-white font-bold text-xs uppercase tracking-widest">Gérer</button>
                                        </td>
                                    </tr>
                                ))}
                                {licences.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3 text-gray-600">
                                                <FileKey size={40} strokeWidth={1} />
                                                <p className="text-sm font-medium">Aucune licence trouvee.</p>
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
