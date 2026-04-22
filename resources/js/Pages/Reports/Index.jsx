import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    FileText, 
    Download, 
    TrendingUp, 
    DollarSign, 
    AlertCircle, 
    PieChart as PieIcon,
    ArrowRight
} from 'lucide-react';

export default function Reports({ auth, stats }) {
    const reportTypes = [
        { 
            title: 'Inventaire Complet', 
            description: 'Liste détaillée de tous les équipements actifs avec spécifications et sites.', 
            icon: <FileText className="text-blue-400" />,
            action: 'Exporter PDF',
            link: route('equipements.export-pdf'),
            color: 'blue'
        },
        { 
            title: 'État de la Maintenance', 
            description: 'Rapport sur les interventions en cours, terminées et les coûts associés.', 
            icon: <TrendingUp className="text-ocp-green" />,
            action: 'Consulter',
            link: route('maintenances.index'),
            color: 'green'
        },
        { 
            title: 'Analyse des Licences', 
            description: 'Aperçu des licences expirant bientôt et taux d\'utilisation.', 
            icon: <PieIcon className="text-ocp-gold" />,
            action: 'Consulter',
            link: route('licences.index'),
            color: 'gold'
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Rapports & Analyses" />

            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-display font-extrabold text-white">Rapports & Analyses</h2>
                    <p className="text-gray-500 mt-1">Générez des rapports détaillés et analysez la performance de votre parc IT.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 border-white/5 bg-gradient-to-br from-ocp-green/10 to-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-ocp-green/20 rounded-xl text-ocp-green">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Valeur Totale du Parc</p>
                                <h4 className="text-2xl font-display font-extrabold text-white">{stats.total_value.toLocaleString()} MAD</h4>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 border-white/5 bg-gradient-to-br from-ocp-gold/10 to-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-ocp-gold/20 rounded-xl text-ocp-gold">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Budget Maintenance</p>
                                <h4 className="text-2xl font-display font-extrabold text-white">{stats.maintenance_costs.toLocaleString()} MAD</h4>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 border-white/5 bg-gradient-to-br from-red-500/10 to-transparent">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alertes Licences</p>
                                <h4 className="text-2xl font-display font-extrabold text-white">{stats.expiring_licences} Critiques</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {reportTypes.map((report, i) => (
                        <motion.div
                            key={report.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-8 border-white/5 flex flex-col group hover:bg-white/[0.04] transition-all"
                        >
                            <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                                {report.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{report.title}</h3>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                {report.description}
                            </p>
                            <div className="mt-auto">
                                <a 
                                    href={report.link}
                                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                                        report.color === 'blue' ? 'bg-blue-600 hover:bg-blue-500' : 
                                        report.color === 'green' ? 'bg-ocp-green hover:bg-ocp-accent' : 
                                        'bg-ocp-gold hover:bg-yellow-500'
                                    } text-white shadow-lg`}
                                >
                                    {report.action === 'Exporter PDF' ? <Download size={18} /> : <ArrowRight size={18} />}
                                    {report.action}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
