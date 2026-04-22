import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Database, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-ocp-navy flex overflow-hidden">
            <Head title="Inscription - OCP Asset Management" />

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
                            Rejoignez la <span className="text-ocp-gold">Communauté IT</span> OCP
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Créez votre compte pour commencer à gérer et suivre l'infrastructure technologique du Groupe OCP.
                        </p>
                    </motion.div>

                    {/* Animated Icons Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        {[Shield, User, CheckCircle].map((Icon, i) => (
                            <motion.div
                                key={i}
                                animate={{ 
                                    y: [0, -30, 0],
                                    x: [0, Math.sin(i) * 30, 0]
                                }}
                                transition={{ 
                                    duration: 6 + i, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute text-ocp-green"
                                style={{ 
                                    top: `${25 + i * 25}%`, 
                                    left: `${15 + i * 35}%` 
                                }}
                            >
                                <Icon size={60 + i * 20} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md py-12"
                >
                    <div className="text-center mb-10 lg:hidden">
                        <div className="w-16 h-16 bg-ocp-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Database className="text-white" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white font-display">ASSET MANAGEMENT OCP</h1>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-3xl font-display font-bold text-white mb-2">Inscription</h3>
                        <p className="text-gray-400">Remplissez les informations pour créer votre compte.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name Field */}
                        <div className="relative group">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-ocp-green transition-colors">
                                Nom complet
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-ocp-green transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-ocp-green/50 focus:border-ocp-green transition-all"
                                    placeholder="Prénom Nom"
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-red-400 text-xs mt-2 ml-1">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
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
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-2 ml-1">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-ocp-green transition-colors">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-ocp-green transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-ocp-green/50 focus:border-ocp-green transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-2 ml-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative group">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-ocp-green transition-colors">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-ocp-green transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-ocp-green/50 focus:border-ocp-green transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-ocp-green hover:bg-ocp-accent disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-ocp-green/20 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Créer mon compte
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-sm text-gray-500">
                                Déjà un compte ?{' '}
                                <Link href={route('login')} className="text-ocp-gold font-bold hover:text-white transition-colors">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </form>
                    
                    <p className="mt-12 text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                        © 2026 Groupe OCP. Sécurité & Excellence.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
