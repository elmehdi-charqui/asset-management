import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Wrench, 
    Calendar, 
    FileText, 
    Tag, 
    DollarSign,
    ChevronLeft,
    ArrowRight
} from 'lucide-react';

export default function Create({ auth, equipements }) {
    const { data, setData, post, processing, errors } = useForm({
        equipement_id: '',
        description: '',
        date_intervention: '',
        statut: 'planifiee',
        cout: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('maintenances.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Planifier une intervention" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Link 
                        href={route('maintenances.index')}
                        className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-bold text-sm"
                    >
                        <ChevronLeft size={20} />
                        RETOUR À LA LISTE
                    </Link>
                </div>

                <div className="glass-panel border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-ocp-green/20 rounded-2xl text-ocp-green">
                                <Wrench size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-display font-extrabold text-white">Planifier une intervention</h2>
                                <p className="text-gray-500 mt-1">Saisissez les détails de la maintenance à venir.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Tag size={14} className="text-ocp-green" />
                                    Équipement concerné
                                </label>
                                <select 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-green focus:ring-ocp-green transition-all"
                                    value={data.equipement_id}
                                    onChange={e => setData('equipement_id', e.target.value)}
                                >
                                    <option value="" className="bg-ocp-sidebar">Sélectionner un actif</option>
                                    {equipements.map(e => (
                                        <option key={e.id} value={e.id} className="bg-ocp-sidebar">
                                            {e.nom} ({e.numero_serie})
                                        </option>
                                    ))}
                                </select>
                                {errors.equipement_id && <p className="text-red-400 text-xs mt-1 font-bold">{errors.equipement_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={14} className="text-ocp-green" />
                                    Date prévue
                                </label>
                                <input 
                                    type="date" 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-green focus:ring-ocp-green transition-all"
                                    value={data.date_intervention}
                                    onChange={e => setData('date_intervention', e.target.value)}
                                />
                                {errors.date_intervention && <p className="text-red-400 text-xs mt-1 font-bold">{errors.date_intervention}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Tag size={14} className="text-ocp-green" />
                                    Statut initial
                                </label>
                                <select 
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-green focus:ring-ocp-green transition-all"
                                    value={data.statut}
                                    onChange={e => setData('statut', e.target.value)}
                                >
                                    <option value="planifiee" className="bg-ocp-sidebar">Planifiée</option>
                                    <option value="en cours" className="bg-ocp-sidebar">En cours</option>
                                    <option value="terminee" className="bg-ocp-sidebar">Terminée</option>
                                </select>
                                {errors.statut && <p className="text-red-400 text-xs mt-1 font-bold">{errors.statut}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <DollarSign size={14} className="text-ocp-green" />
                                    Coût estimé (MAD)
                                </label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-green focus:ring-ocp-green transition-all"
                                    value={data.cout}
                                    onChange={e => setData('cout', e.target.value)}
                                />
                                {errors.cout && <p className="text-red-400 text-xs mt-1 font-bold">{errors.cout}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <FileText size={14} className="text-ocp-green" />
                                Description du problème / Intervention
                            </label>
                            <textarea 
                                rows="4"
                                className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:border-ocp-green focus:ring-ocp-green transition-all resize-none"
                                placeholder="Décrivez la nature de l'intervention..."
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                            {errors.description && <p className="text-red-400 text-xs mt-1 font-bold">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end pt-4">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-ocp-green hover:bg-ocp-accent text-white px-8 py-4 rounded-xl font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-ocp-green/20 disabled:opacity-50"
                            >
                                {processing ? 'TRAITEMENT...' : 'CONFIRMER LA PLANIFICATION'}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
