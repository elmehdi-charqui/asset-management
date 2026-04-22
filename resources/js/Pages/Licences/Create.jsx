import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    FileKey, 
    Calendar, 
    Building2, 
    Hash, 
    DollarSign,
    ChevronLeft,
    ArrowRight,
    Users
} from 'lucide-react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        editeur: '',
        cle_licence: '',
        nombre_postes: 1,
        date_achat: '',
        date_expiration: '',
        prix_achat: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('licences.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ajouter une Licence" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Link 
                        href={route('licences.index')}
                        className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-bold text-sm"
                    >
                        <ChevronLeft size={20} />
                        RETOUR À LA LISTE
                    </Link>
                </div>

                <div className="glass-panel border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-ocp-gold/20 rounded-2xl text-ocp-gold">
                                <FileKey size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-display font-extrabold text-white">Ajouter une Licence</h2>
                                <p className="text-gray-500 mt-1">Enregistrez un nouveau logiciel ou abonnement.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <FileKey size={14} className="text-ocp-gold" />
                                    Nom du Logiciel
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-gold focus:ring-ocp-gold transition-all"
                                    placeholder="ex: Adobe Creative Cloud"
                                    value={data.nom}
                                    onChange={e => setData('nom', e.target.value)}
                                />
                                {errors.nom && <p className="text-red-400 text-xs mt-1 font-bold">{errors.nom}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Building2 size={14} className="text-ocp-gold" />
                                    Éditeur
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-gold focus:ring-ocp-gold transition-all"
                                    placeholder="ex: Adobe Systems"
                                    value={data.editeur}
                                    onChange={e => setData('editeur', e.target.value)}
                                />
                                {errors.editeur && <p className="text-red-400 text-xs mt-1 font-bold">{errors.editeur}</p>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Hash size={14} className="text-ocp-gold" />
                                    Clé de Licence / ID de Contrat
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-gold focus:ring-ocp-gold transition-all"
                                    placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
                                    value={data.cle_licence}
                                    onChange={e => setData('cle_licence', e.target.value)}
                                />
                                {errors.cle_licence && <p className="text-red-400 text-xs mt-1 font-bold">{errors.cle_licence}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Users size={14} className="text-ocp-gold" />
                                    Nombre de Postes
                                </label>
                                <input 
                                    type="number" 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-gold focus:ring-ocp-gold transition-all"
                                    value={data.nombre_postes}
                                    onChange={e => setData('nombre_postes', e.target.value)}
                                />
                                {errors.nombre_postes && <p className="text-red-400 text-xs mt-1 font-bold">{errors.nombre_postes}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <DollarSign size={14} className="text-ocp-gold" />
                                    Prix d'achat (MAD)
                                </label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-gold focus:ring-ocp-gold transition-all"
                                    value={data.prix_achat}
                                    onChange={e => setData('prix_achat', e.target.value)}
                                />
                                {errors.prix_achat && <p className="text-red-400 text-xs mt-1 font-bold">{errors.prix_achat}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={14} className="text-ocp-gold" />
                                    Date d'achat
                                </label>
                                <input 
                                    type="date" 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-gold focus:ring-ocp-gold transition-all"
                                    value={data.date_achat}
                                    onChange={e => setData('date_achat', e.target.value)}
                                />
                                {errors.date_achat && <p className="text-red-400 text-xs mt-1 font-bold">{errors.date_achat}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={14} className="text-ocp-gold" />
                                    Date d'expiration
                                </label>
                                <input 
                                    type="date" 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-gold focus:ring-ocp-gold transition-all"
                                    value={data.date_expiration}
                                    onChange={e => setData('date_expiration', e.target.value)}
                                />
                                {errors.date_expiration && <p className="text-red-400 text-xs mt-1 font-bold">{errors.date_expiration}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-ocp-gold hover:bg-yellow-500 text-white px-8 py-4 rounded-xl font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-ocp-gold/20 disabled:opacity-50"
                            >
                                {processing ? 'ENREGISTREMENT...' : 'AJOUTER LA LICENCE'}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
