import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Database, 
    Wrench, 
    History, 
    FileKey, 
    BarChart2, 
    Settings, 
    Bell, 
    ChevronLeft, 
    Search,
    User as UserIcon,
    LogOut,
    Menu,
    X,
    Sun,
    Moon
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');

    React.useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const notifications = [
        { id: 1, title: 'Maintenance requise', body: 'Le serveur SRV-01 nécessite une mise à jour.', time: '10 min' },
        { id: 2, title: 'Nouvelle licence', body: 'Licence Adobe ajoutée avec succès.', time: '1h' },
        { id: 3, title: 'Alerte Stock', body: 'Plus de claviers disponibles à Safi.', time: '2h' },
    ];

    const menuItems = [
        { name: 'Tableau de bord', icon: <LayoutDashboard size={22} />, route: 'dashboard' },
        { name: 'Inventaire', icon: <Database size={22} />, route: 'equipements.index' },
        { name: 'Maintenance', icon: <Wrench size={22} />, route: 'maintenances.index' },
        { name: 'Cycle de vie', icon: <History size={22} />, route: 'lifecycle.index' },
        { name: 'Licences', icon: <FileKey size={22} />, route: 'licences.index' },
        { name: 'Rapports', icon: <BarChart2 size={22} />, route: 'reports.index' },
        { name: 'Paramètres', icon: <Settings size={22} />, route: 'profile.edit', color: 'gold' },
    ];

    const isActive = (routeName) => route().current(routeName);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-ocp-navy text-slate-900 dark:text-white selection:bg-ocp-green selection:text-white transition-colors duration-300">
            {/* Sidebar - Desktop */}
            <aside 
                className={`fixed top-0 left-0 h-screen bg-white dark:bg-ocp-sidebar border-r border-slate-200 dark:border-white/5 transition-all duration-300 z-40 hidden lg:block ${
                    isSidebarCollapsed ? 'w-20' : 'w-72'
                }`}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 mb-4">
                    <div className="min-w-[40px] w-10 h-10 bg-ocp-green rounded-lg flex items-center justify-center">
                        <Database className="text-white" size={24} />
                    </div>
                    {!isSidebarCollapsed && (
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="ml-3 font-display font-extrabold text-lg tracking-tight whitespace-nowrap"
                        >
                            ASSET <span className="text-ocp-green">MGMT</span>
                        </motion.span>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="px-3 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.route ? route(item.route) : '#'}
                            className={`flex items-center p-3 rounded-xl transition-all relative group ${
                                isActive(item.route) 
                                    ? item.color === 'gold' ? 'bg-ocp-gold/10 text-ocp-gold' : 'bg-ocp-green/10 text-ocp-green' 
                                    : 'text-gray-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            {isActive(item.route) && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className={`absolute left-0 w-1 h-6 ${item.color === 'gold' ? 'bg-ocp-gold' : 'bg-ocp-green'} rounded-r-full`}
                                />
                            )}
                            <div className={`transition-transform duration-300 ${isSidebarCollapsed ? 'mx-auto' : 'mr-4'}`}>
                                {item.icon}
                            </div>
                            {!isSidebarCollapsed && (
                                <span className="font-medium text-sm">{item.name}</span>
                            )}
                            
                            {isSidebarCollapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-ocp-green text-white text-xs font-bold rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Collapse Toggle */}
                <button 
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute bottom-6 right-0 translate-x-1/2 w-8 h-8 bg-white dark:bg-ocp-sidebar border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-gray-500 hover:text-ocp-green dark:hover:text-white transition-colors"
                >
                    <ChevronLeft className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} size={16} />
                </button>
            </aside>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-screen w-72 bg-ocp-sidebar z-[60] lg:hidden p-6"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-ocp-green rounded-lg flex items-center justify-center">
                                        <Database className="text-white" size={24} />
                                    </div>
                                    <span className="ml-3 font-display font-extrabold text-lg tracking-tight">
                                        ASSET <span className="text-ocp-green">MGMT</span>
                                    </span>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400">
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.route ? route(item.route) : '#'}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center p-4 rounded-xl transition-all ${
                                            isActive(item.route) 
                                                ? item.color === 'gold' ? 'bg-ocp-gold/10 text-ocp-gold' : 'bg-ocp-green/10 text-ocp-green' 
                                                : 'text-gray-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                    >
                                        <div className="mr-4">{item.icon}</div>
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
                {/* Top Header */}
                <header className="h-20 border-b border-slate-200 dark:border-white/5 sticky top-0 bg-white/80 dark:bg-ocp-navy/80 backdrop-blur-xl z-30 px-6 flex items-center justify-between transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        
                        <div className="hidden md:flex items-center bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 w-80 group focus-within:border-ocp-green transition-all">
                            <Search className="text-gray-500 group-focus-within:text-ocp-green" size={18} />
                            <input 
                                type="text" 
                                placeholder="Rechercher un actif..." 
                                className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-gray-600 w-full ml-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button 
                            onClick={toggleTheme}
                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="relative">
                            <button 
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-ocp-gold rounded-full border-2 border-ocp-navy" />
                            </button>

                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-80 bg-white dark:bg-ocp-sidebar border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h3>
                                                <span className="text-[10px] font-bold text-ocp-green bg-ocp-green/10 px-2 py-0.5 rounded-full">3 NOUVELLES</span>
                                            </div>
                                            <div className="max-h-[400px] overflow-y-auto">
                                                {notifications.map(n => (
                                                    <div key={n.id} className="p-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</p>
                                                            <span className="text-[10px] text-gray-400 dark:text-gray-600">{n.time}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 leading-relaxed">{n.body}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <Link 
                                                href={route('lifecycle.index')}
                                                onClick={() => setIsNotificationsOpen(false)}
                                                className="w-full p-3 text-[10px] font-bold text-center text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors block"
                                            >
                                                VOIR TOUTES LES NOTIFICATIONS
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        <div className="w-px h-6 bg-white/10 mx-2" />

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-all group"
                            >
                                <div className="w-9 h-9 bg-ocp-green/20 rounded-lg flex items-center justify-center text-ocp-green group-hover:bg-ocp-green transition-all group-hover:text-white">
                                    <UserIcon size={20} />
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter mt-1">Personnel OCP</p>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isUserDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsUserDropdownOpen(false)} />
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-56 bg-ocp-sidebar border border-white/10 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                                        >
                                            <Link href={route('profile.edit')} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                                <UserIcon size={18} className="text-gray-400" />
                                                <span className="text-sm font-medium">Mon Profil</span>
                                            </Link>
                                            <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors">
                                                <LogOut size={18} />
                                                <span className="text-sm font-medium">Déconnexion</span>
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={route().current()}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
