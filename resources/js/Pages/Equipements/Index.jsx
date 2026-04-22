import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Database, Search, Filter } from 'lucide-react';

export default function Index({ equipements }) {
    return (
        <AuthenticatedLayout>
            <Head title="Inventaire - OCP Asset Management" />
            
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-display font-extrabold text-white">Inventaire Global</h2>
                        <p className="text-gray-500 mt-1">Gerez le materiel OCP sur tous les sites.</p>
                    </div>
                    <Link 
                        href={route('equipements.create')} 
                        className="bg-ocp-green hover:bg-ocp-accent text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all shadow-lg shadow-ocp-green/20"
                    >
                        <Plus className="mr-2" size={20} />
                        Ajouter un actif
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-ocp-green transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Rechercher par nom, serie ou marque..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-ocp-green transition-all"
                        />
                    </div>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white flex items-center gap-2 transition-all">
                        <Filter size={18} />
                        Filtres
                    </button>
                </div>

                <div className="glass-panel overflow-hidden border-white/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-white/5 text-gray-200 uppercase text-[10px] tracking-widest font-bold">
                                <tr>
                                    <th className="px-6 py-4">Nom & Serie</th>
                                    <th className="px-6 py-4">Marque & Modele</th>
                                    <th className="px-6 py-4">Site</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {equipements.data.map((equipement) => (
                                    <tr key={equipement.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white group-hover:text-ocp-green transition-colors">{equipement.nom}</div>
                                            <div className="text-xs font-mono text-gray-600">{equipement.numero_serie}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-300 font-medium">{equipement.marque}</div>
                                            <div className="text-xs text-gray-500">{equipement.modele}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs text-gray-400">
                                                {equipement.site?.nom || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                                                equipement.statut === 'actif' ? 'bg-ocp-green/10 text-ocp-green' :
                                                equipement.statut === 'en maintenance' ? 'bg-orange-500/10 text-orange-400' :
                                                'bg-red-500/10 text-red-400'
                                            }`}>
                                                {equipement.statut}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"><Edit size={16} /></button>
                                                <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {equipements.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3 text-gray-600">
                                                <Database size={40} strokeWidth={1} />
                                                <p className="text-sm font-medium">Aucun equipement trouve dans l'inventaire.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Placeholder */}
                    <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
                        <p className="text-xs text-gray-600">Affichage de {equipements.from} a {equipements.to} sur {equipements.total} actifs</p>
                        <div className="flex gap-2">
                            {equipements.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                        link.active ? 'bg-ocp-green text-white' : 'bg-white/5 text-gray-500 hover:text-white'
                                    } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
