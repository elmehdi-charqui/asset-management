import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Database, 
    Wrench, 
    FileKey, 
    AlertTriangle, 
    TrendingUp, 
    ArrowUpRight, 
    Clock, 
    ChevronRight 
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const areaData = [
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 145 },
    { month: 'Mar', count: 138 },
    { month: 'Apr', count: 160 },
    { month: 'May', count: 185 },
    { month: 'Jun', count: 210 },
];

const pieData = [
    { name: 'PC Portables', value: 400 },
    { name: 'Serveurs', value: 80 },
    { name: 'Reseau', value: 120 },
    { name: 'Peripheriques', value: 200 },
];

const COLORS = ['#006B3F', '#C9A84C', '#10B981', '#3B82F6'];

export default function Dashboard({ auth, stats }) {
    const kpis = [
        { label: 'Total Equipements', value: stats?.total_equipements || 0, icon: <Database size={24} />, color: 'ocp-green', trend: '+12%' },
        { label: 'En Maintenance', value: stats?.maintenances_en_cours || 0, icon: <Wrench size={24} />, color: 'orange-500', trend: '-2%' },
        { label: 'Licences Actives', value: 42, icon: <FileKey size={24} />, color: 'ocp-gold', trend: '+5%' },
        { label: 'Alertes', value: 3, icon: <AlertTriangle size={24} />, color: 'red-500', trend: 'Stable' },
    ];

    const kpiColors = {
        'ocp-green': 'bg-ocp-green/10 text-ocp-green',
        'orange-500': 'bg-orange-500/10 text-orange-400',
        'ocp-gold': 'bg-ocp-gold/10 text-ocp-gold',
        'red-500': 'bg-red-500/10 text-red-400',
    };

    const kpiBlurs = {
        'ocp-green': 'bg-ocp-green/5',
        'orange-500': 'bg-orange-500/5',
        'ocp-gold': 'bg-ocp-gold/5',
        'red-500': 'bg-red-500/5',
    };

    const activities = [
        { id: 1, type: 'maintenance', title: 'Maintenance terminee', detail: 'Dell PowerEdge R740 - Site Safi', time: 'Il y a 2 heures' },
        { id: 2, type: 'inventory', title: 'Nouvel equipement', detail: 'MacBook Pro 16" ajoute a l\'inventaire', time: 'Il y a 5 heures' },
        { id: 3, type: 'license', title: 'Expiration proche', detail: 'Licence Adobe CC expire dans 15 jours', time: 'Il y a 1 jour' },
    ];

    const alerts = [
        { id: 1, level: 'high', asset: 'Switch Core Safi', msg: 'Temperature elevee detectee', status: 'En attente' },
        { id: 2, level: 'medium', asset: 'Licence Windows Server', msg: 'Renouvellement requis', status: 'Planifie' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Tableau de bord" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-display font-extrabold text-white">Vue d'ensemble</h2>
                        <p className="text-gray-500 mt-1">Bienvenue, {auth.user.name}. Voici l'etat de vos actifs IT aujourd'hui.</p>
                    </div>
                    <div className="flex gap-3">
                        <a 
                            href={route('equipements.export-pdf')}
                            target="_blank"
                            className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                        >
                            Exporter PDF
                        </a>
                        <Link 
                            href={route('equipements.create')}
                            className="bg-ocp-green hover:bg-ocp-accent px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-ocp-green/20"
                        >
                            Ajouter un Actif
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, i) => (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 border-white/5 relative overflow-hidden group hover:bg-white/[0.07] transition-all"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl transition-all ${kpiBlurs[kpi.color]}`} />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl transition-all ${kpiColors[kpi.color]}`}>
                                    {kpi.icon}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-full uppercase tracking-tighter">
                                    <TrendingUp size={12} className="text-ocp-green" />
                                    {kpi.trend}
                                </div>
                            </div>
                            <div className="relative z-10">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{kpi.label}</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <h4 className="text-3xl font-display font-extrabold text-white">{kpi.value}</h4>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-panel p-6 border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                Tendances de Croissance
                                <div className="px-2 py-0.5 bg-ocp-green/10 text-ocp-green text-[10px] font-bold rounded-full">ANNUEL</div>
                            </h3>
                            <button className="text-gray-500 hover:text-white transition-colors"><ArrowUpRight size={20} /></button>
                        </div>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={areaData}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#006B3F" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#006B3F" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0D1321', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                                    <Area type="monotone" dataKey="count" stroke="#006B3F" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="glass-panel p-6 border-white/5">
                        <h3 className="text-lg font-bold text-white mb-8">Repartition par Type</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#0D1321', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-3">
                            {pieData.map((item, i) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                        <span className="text-sm text-gray-400">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
                    <div className="glass-panel p-6 border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Activite Recente</h3>
                            <button className="text-xs font-bold text-ocp-green hover:text-white transition-colors">VOIR TOUT</button>
                        </div>
                        <div className="space-y-6">
                            {activities.map((act) => (
                                <div key={act.id} className="flex gap-4">
                                    <div className="mt-1 w-10 h-10 min-w-[40px] bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
                                        {act.type === 'maintenance' ? <Wrench size={18} /> : act.type === 'inventory' ? <Database size={18} /> : <FileKey size={18} />}
                                    </div>
                                    <div className="flex-1 border-b border-white/5 pb-4">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-white">{act.title}</p>
                                            <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                                <Clock size={10} />
                                                {act.time}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{act.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass-panel p-6 border-white/5">
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Alertes de Maintenance</h3>
                            <button className="text-xs font-bold text-ocp-green hover:text-white transition-colors">LOGS</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="text-gray-500 border-b border-white/5 uppercase text-[10px] tracking-widest font-bold">
                                    <tr>
                                        <th className="pb-4 px-2">Actif</th>
                                        <th className="pb-4 px-2">Probleme</th>
                                        <th className="pb-4 px-2">Priorite</th>
                                        <th className="pb-4 px-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {alerts.map((alert) => (
                                        <tr key={alert.id} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-2 font-bold text-gray-300 group-hover:text-white transition-colors">{alert.asset}</td>
                                            <td className="py-4 px-2 text-xs">{alert.msg}</td>
                                            <td className="py-4 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${alert.level === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'}`}>{alert.level}</span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <button className="p-2 hover:bg-white/10 rounded-lg transition-all text-gray-500 hover:text-white">
                                                    <ChevronRight size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
