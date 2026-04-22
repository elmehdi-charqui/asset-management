import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Wrench, Calendar, Clock, DollarSign, Server, MapPin } from 'lucide-react';

export default function Show({ maintenance }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Détails | ASSET MGMT`} />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('maintenances.index')} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-3xl font-display font-extrabold text-white">Détails de l'Intervention</h2>
                            <p className="text-gray-500 mt-1">Consultez les informations de maintenance pour cet équipement.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-2 space-y-6"
                    >
                        <div className="glass-panel p-8 border-white/5 space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Description du Problème / Intervention</h3>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 text-gray-300 leading-relaxed">
                                    {maintenance.description}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Date de l'intervention</p>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Calendar size={16} className="text-ocp-green" />
                                        {maintenance.date_intervention}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Coût de l'intervention</p>
                                    <div className="flex items-center gap-2 text-white font-medium text-lg">
                                        <DollarSign size={18} className="text-ocp-green" />
                                        {maintenance.cout ? `${maintenance.cout} MAD` : 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-8 border-white/5">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Équipement Concerné</h3>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-ocp-green/10 rounded-xl flex items-center justify-center text-ocp-green">
                                    <Server size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-bold text-lg">{maintenance.equipement?.nom}</div>
                                    <div className="text-gray-500 text-sm mb-4">SN: {maintenance.equipement?.numero_serie}</div>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                            <MapPin size={14} />
                                            {maintenance.equipement?.site?.nom || 'Site non spécifié'}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                            <Wrench size={14} />
                                            {maintenance.equipement?.marque} {maintenance.equipement?.modele}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="glass-panel p-6 border-white/5">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Statut Actuel</h3>
                            <div className={`w-full py-4 rounded-xl text-center font-bold uppercase tracking-widest text-xs border ${
                                maintenance.statut === 'terminee' ? 'bg-ocp-green/10 border-ocp-green/20 text-ocp-green' :
                                maintenance.statut === 'en cours' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                                'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            }`}>
                                {maintenance.statut}
                            </div>
                        </div>

                        <div className="glass-panel p-6 border-white/5">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Actions Rapides</h3>
                            <div className="space-y-3">
                                <Link 
                                    href={route('maintenances.index')}
                                    className="block w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-center text-xs font-bold transition-all border border-white/5"
                                >
                                    Retour à la liste
                                </Link>
                                <button className="w-full py-3 rounded-xl bg-ocp-green/10 hover:bg-ocp-green/20 text-ocp-green text-center text-xs font-bold transition-all border border-ocp-green/10">
                                    Imprimer le rapport
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
