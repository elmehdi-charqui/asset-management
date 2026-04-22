import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Database, ArrowLeft, Save } from 'lucide-react';

export default function Create({ sites, types }) {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        numero_serie: '',
        marque: '',
        modele: '',
        site_id: '',
        type_equipement_id: '',
        statut: 'actif',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('equipements.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ajouter un Actif" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('equipements.index')} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-3xl font-display font-extrabold text-white">Nouvel Actif</h2>
                            <p className="text-gray-500 mt-1">Enregistrez un nouvel équipement dans l'inventaire.</p>
                        </div>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 border-white/5"
                >
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nom de l'actif</label>
                                <input
                                    type="text"
                                    value={data.nom}
                                    onChange={e => setData('nom', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ocp-green transition-all"
                                    placeholder="ex: MacBook Pro 14"
                                />
                                {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Numéro de série</label>
                                <input
                                    type="text"
                                    value={data.numero_serie}
                                    onChange={e => setData('numero_serie', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ocp-green transition-all"
                                    placeholder="ex: SN-123456789"
                                />
                                {errors.numero_serie && <p className="text-red-400 text-xs mt-1">{errors.numero_serie}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Marque</label>
                                <input
                                    type="text"
                                    value={data.marque}
                                    onChange={e => setData('marque', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ocp-green transition-all"
                                    placeholder="ex: Apple"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Modèle</label>
                                <input
                                    type="text"
                                    value={data.modele}
                                    onChange={e => setData('modele', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ocp-green transition-all"
                                    placeholder="ex: M2 Max 2023"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Site</label>
                                <select
                                    value={data.site_id}
                                    onChange={e => setData('site_id', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ocp-green transition-all appearance-none"
                                >
                                    <option value="" className="bg-ocp-navy">Sélectionnez un site</option>
                                    {sites.map(site => (
                                        <option key={site.id} value={site.id} className="bg-ocp-navy">{site.nom}</option>
                                    ))}
                                </select>
                                {errors.site_id && <p className="text-red-400 text-xs mt-1">{errors.site_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Type d'équipement</label>
                                <select
                                    value={data.type_equipement_id}
                                    onChange={e => setData('type_equipement_id', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ocp-green transition-all appearance-none"
                                >
                                    <option value="" className="bg-ocp-navy">Sélectionnez un type</option>
                                    {types.map(type => (
                                        <option key={type.id} value={type.id} className="bg-ocp-navy">{type.nom}</option>
                                    ))}
                                </select>
                                {errors.type_equipement_id && <p className="text-red-400 text-xs mt-1">{errors.type_equipement_id}</p>}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                            <Link 
                                href={route('equipements.index')}
                                className="px-6 py-3 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/5 transition-all"
                            >
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-ocp-green hover:bg-ocp-accent px-8 py-3 rounded-xl text-sm font-bold text-white transition-all flex items-center gap-2 shadow-lg shadow-ocp-green/20 disabled:opacity-50"
                            >
                                <Save size={18} />
                                {processing ? 'Enregistrement...' : 'Enregistrer l\'actif'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}
