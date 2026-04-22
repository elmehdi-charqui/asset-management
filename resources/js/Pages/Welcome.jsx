import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Database, ChevronRight } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-ocp-navy text-white selection:bg-ocp-green selection:text-white overflow-hidden">
            <Head title="OCP Asset Management - Accueil" />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-ocp-navy/80 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-ocp-green rounded-lg flex items-center justify-center">
                            <Database className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-display font-bold tracking-tight">ASSET <span className="text-ocp-green">MANAGEMENT</span> OCP</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-sm font-medium hover:text-ocp-green transition-colors">Tableau de bord</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-medium hover:text-ocp-green transition-colors">Se connecter</Link>
                                <Link href={route('register')} className="bg-ocp-green hover:bg-ocp-accent px-5 py-2 rounded-lg text-sm font-medium transition-all">S'inscrire</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-32 pb-20 relative">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-ocp-green/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-ocp-gold/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocp-green/10 border border-ocp-green/20 text-ocp-green text-xs font-bold mb-6">
                            <Shield size={14} />
                            PLATEFORME SÉCURISÉE OCP
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-8">
                            Gérez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocp-green to-ocp-gold">Actifs IT</span> avec Excellence
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                            Optimisez le cycle de vie de vos équipements, suivez vos licences et gérez vos maintenances sur une interface unique conçue pour l'excellence opérationnelle de l'OCP.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                href={route('login')} 
                                className="group bg-ocp-green hover:bg-ocp-accent px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg shadow-ocp-green/20"
                            >
                                Se connecter
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                            <button className="px-8 py-4 rounded-xl font-bold border border-white/10 hover:bg-white/5 transition-all">
                                En savoir plus
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 glass-panel p-4 rounded-[2rem] border-white/10 shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                                alt="Security Operations"
                                className="rounded-[1.5rem] w-full"
                            />
                            
                            {/* Floating Stats */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-10 -right-10 glass-panel p-6 rounded-2xl border-white/10 shadow-xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-ocp-green/20 rounded-full flex items-center justify-center text-ocp-green">
                                        <BarChart3 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Taux d'activité</p>
                                        <p className="text-2xl font-bold">99.8%</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Features */}
            <section className="py-20 relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Inventaire Global", desc: "Suivi en temps réel de tout le matériel sur tous les sites OCP.", icon: <Database size={24} /> },
                            { title: "Cycle de Vie", desc: "Gestion proactive du renouvellement et de l'obsolescence.", icon: <Shield size={24} /> },
                            { title: "Analytique Avancée", desc: "Rapports détaillés et visualisations pour la prise de décision.", icon: <BarChart3 size={24} /> }
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="glass-panel p-8 rounded-2xl hover:bg-white/[0.07] transition-colors cursor-default"
                            >
                                <div className="w-14 h-14 bg-ocp-green/10 rounded-xl flex items-center justify-center text-ocp-green mb-6">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
