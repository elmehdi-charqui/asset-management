import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    History, 
    User, 
    Clock, 
    Box, 
    Wrench, 
    PlusCircle, 
    CheckCircle2,
    Info
} from 'lucide-react';

export default function Lifecycle({ auth, logs }) {
    const getActionIcon = (action) => {
        if (action.includes('ajouté') || action.includes('créé')) return <PlusCircle size={18} className="text-ocp-green" />;
        if (action.includes('maintenance')) return <Wrench size={18} className="text-orange-400" />;
        if (action.includes('supprimé')) return <Box size={18} className="text-red-400" />;
        if (action.includes('terminé')) return <CheckCircle2 size={18} className="text-blue-400" />;
        return <Info size={18} className="text-ocp-gold" />;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Cycle de vie des Actifs" />

            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-display font-extrabold text-white">Cycle de vie</h2>
                    <p className="text-gray-500 mt-1">Historique complet des mouvements et modifications du parc informatique.</p>
                </div>

                <div className="glass-panel border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <History size={20} className="text-ocp-green" />
                            Journal d'audit global
                        </h3>
                        <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase">
                            {logs.total} Événements
                        </span>
                    </div>

                    <div className="p-8">
                        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-ocp-green before:via-white/10 before:to-transparent">
                            {logs.data.length > 0 ? (
                                logs.data.map((log, i) => (
                                    <motion.div 
                                        key={log.id}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-ocp-navy group-hover:border-ocp-green transition-colors shadow-xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                            {getActionIcon(log.action)}
                                        </div>

                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-5 border-white/5 group-hover:bg-white/[0.04] transition-all">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-ocp-green uppercase tracking-tighter">{log.action}</span>
                                                <time className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {new Date(log.created_at).toLocaleString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </time>
                                            </div>
                                            <p className="text-sm text-gray-300 font-medium mb-3">
                                                {log.model_type?.split('\\').pop()}: <span className="text-white">ID #{log.model_id}</span>
                                            </p>
                                            {log.details && (
                                                <div className="bg-black/20 rounded-lg p-3 text-xs text-gray-500 border border-white/5 mb-3">
                                                    {Object.entries(log.details).map(([key, value]) => (
                                                        <div key={key} className="flex justify-between">
                                                            <span className="font-bold">{key}:</span>
                                                            <span className="text-gray-400">{String(value)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                                                <div className="w-6 h-6 rounded-full bg-ocp-green/20 flex items-center justify-center text-ocp-green">
                                                    <User size={12} />
                                                </div>
                                                <span className="text-xs font-bold text-gray-400">{log.user?.name || 'Système'}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <History size={48} className="mx-auto text-gray-700 mb-4" />
                                    <p className="text-gray-500">Aucun historique disponible pour le moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
