import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Database, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-ocp-navy flex overflow-hidden">
            <Head title="Connexion - OCP Asset Management" />

            {/* Left Side - Branding & Animation */}
            <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-ocp-navy to-ocp-green/20 items-center justify-center p-12 overflow-hidden border-r border-white/5">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-ocp-green/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-ocp-gold/10 rounded-full blur-[100px]" />
                
                <div className="relative z-10 max-w-md text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-24 h-24 bg-ocp-green rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-ocp-green/40"
                    >
                        <Database className="text-white" size={48} />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-4xl font-display font-extrabold text-white mb-6 leading-tight">
                            L'Excellence dans la gestion des <span className="text-ocp-gold">Actifs OCP</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Accédez à votre espace sécurisé pour gérer, suivre et optimiser l'infrastructure IT du groupe.
                        </p>
                    </motion.div>

                    {/* Animated Icons */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[Shield, Lock, Database].map((Icon, i) => (
                            <motion.div
                                key={i}
                                animate={{ 
                                    y: [0, -20, 0],
                                    x: [0, Math.sin(i) * 20, 0]
                                }}
                                transition={{ 
                                    duration: 5 + i, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute text-ocp-green/20"
                                style={{ 
                                    top: `${20 + i * 30}%`, 
                                    left: `${10 + i * 40}%` 
                                }}
                            >
                                <Icon size={80 + i * 20} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-10 lg:hidden">
                        <div className="w-16 h-16 bg-ocp-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Database className="text-white" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white font-display">ASSET MANAGEMENT OCP</h1>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-3xl font-display font-bold text-white mb-2">Bienvenue</h3>
                        <p className="text-gray-400">Veuillez vous authentifier pour continuer.</p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 bg-ocp-green/10 border border-ocp-green/20 text-ocp-green rounded-xl text-sm font-medium">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="relative group">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-ocp-green transition-colors">
                                Adresse Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-ocp-green transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-ocp-green/50 focus:border-ocp-green transition-all"
                                    placeholder="nom@ocp.ma"
                                    autoComplete="username"
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-2 ml-1">{errors.email}</p>}
                        </div>

                        <div className="relative group">
                            <div className="flex justify-between items-center mb-2 px-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-ocp-green transition-colors">
                                    Mot de passe
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-xs font-bold text-ocp-gold hover:text-white transition-colors">
                                        Oublié ?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-ocp-green transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-ocp-green/50 focus:border-ocp-green transition-all"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-2 ml-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <div className={`w-5 h-5 rounded border border-white/20 flex items-center justify-center transition-all ${data.remember ? 'bg-ocp-green border-ocp-green' : 'group-hover:border-ocp-green'}`}>
                                    {data.remember && <div className="w-2.5 h-2.5 bg-white rounded-[1px]" />}
                                </div>
                                <span className="ms-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Rester connecté</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-ocp-green hover:bg-ocp-accent disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-ocp-green/20 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Se connecter
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-gray-500 text-sm font-medium">
                        © 2024 Groupe OCP. Tous droits réservés.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
