/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  BadgeCheck, 
  BarChart3, 
  Bell, 
  Bookmark, 
  Brush, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  FileText, 
  Home, 
  Hotel, 
  Landmark, 
  LogIn, 
  Map, 
  MapPin, 
  MessageCircle, 
  Monitor, 
  Palette, 
  Plus, 
  Search, 
  Send, 
  Settings, 
  Share2, 
  SlidersHorizontal, 
  Stethoscope, 
  Terminal, 
  User, 
  UserPlus,
  Eye,
  EyeOff,
  Flower2,
  Building2,
  Wallet,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Screen = 
  | 'splash' 
  | 'login' 
  | 'register' 
  | 'forgot-password' 
  | 'home' 
  | 'search' 
  | 'saved'
  | 'job-detail' 
  | 'profile'
  | 'application-success';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  remote: boolean;
  verified: boolean;
  logo: string;
  postedAt: string;
  description?: string;
}

// --- Mock Data ---

const JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior UX Researcher',
    company: 'Batavia Creative Lab',
    location: 'Yogyakarta',
    salary: 'Rp 12M - 18M',
    type: 'Full-time',
    remote: true,
    verified: true,
    logo: 'https://picsum.photos/seed/batavia/200',
    postedAt: '2h ago',
    description: 'Lead the digital transformation for local heritage brands. We are looking for a visionary designer to join our award-winning team in the heart of Yogyakarta.'
  },
  {
    id: '2',
    title: 'Cultural Program Manager',
    company: 'Jogja Heritage Foundation',
    location: 'Sleman, Yogyakarta',
    salary: 'Rp 8M - 12M',
    type: 'Contract',
    remote: false,
    verified: true,
    logo: 'https://picsum.photos/seed/heritage/200',
    postedAt: '5h ago'
  },
  {
    id: '3',
    title: 'Frontend Architect',
    company: 'TechHub Indonesia',
    location: 'Remote',
    salary: 'Competitive Salary',
    type: 'Full-time',
    remote: true,
    verified: false,
    logo: 'https://picsum.photos/seed/techhub/200',
    postedAt: '2h ago'
  },
  {
    id: '4',
    title: 'Head Barista',
    company: 'Roast & Co',
    location: 'Prawirotaman',
    salary: 'Hourly + Tips',
    type: 'Part-time',
    remote: false,
    verified: false,
    logo: 'https://picsum.photos/seed/roast/200',
    postedAt: '5h ago'
  },
  {
    id: '5',
    title: 'Senior Product Designer',
    company: 'Creative Studio',
    location: 'Jogja',
    salary: 'Rp 15M - 22M',
    type: 'Full-time',
    remote: false,
    verified: true,
    logo: 'https://picsum.photos/seed/studio/200',
    postedAt: '1d ago',
    description: 'Lead the digital transformation for local heritage brands. We are looking for a visionary designer to join our award-winning team in the heart of Yogyakarta.'
  }
];

// --- Components ---

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon: Icon
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  className?: string;
  icon?: any;
}) => {
  const variants = {
    primary: 'bg-[#00408c] text-white shadow-lg shadow-[#00408c]/20',
    secondary: 'bg-[#fd876f] text-[#732010]',
    tertiary: 'bg-[#ffe088] text-[#574500]',
    ghost: 'bg-transparent text-[#00408c]',
    danger: 'bg-red-50 text-red-600'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`h-14 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${variants[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon size={20} />}
    </motion.button>
  );
};

const Input = ({ label, placeholder, type = 'text', id, rightIcon: RightIcon, onRightIconClick }: any) => (
  <div className="space-y-2 w-full">
    {label && (
      <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-widest text-[#454652] ml-1">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full h-14 px-5 bg-[#e9e7ed] border-none rounded-xl focus:ring-1 focus:ring-[#00408c]/20 focus:bg-white transition-all duration-300 text-[#1a1b1f] placeholder:text-[#757684]/50 outline-none"
      />
      {RightIcon && (
        <button 
          type="button"
          onClick={onRightIconClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#757684] hover:text-[#00408c] transition-colors"
        >
          <RightIcon size={20} />
        </button>
      )}
    </div>
  </div>
);

const BottomNav = ({ active, setScreen }: { active: Screen, setScreen: (s: Screen) => void }) => {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-8 pb-8 pt-4 bg-white/80 backdrop-blur-2xl rounded-t-[2rem] border-t border-slate-100 z-50 shadow-[0_-8px_32px_0_rgba(26,27,31,0.04)]">
      {items.map((item) => {
        const isActive = active === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              isActive ? 'text-[#00408c] scale-110' : 'text-slate-400 hover:text-[#9f402d]'
            }`}
          >
            <Icon size={24} fill={isActive ? 'currentColor' : 'none'} />
            <span className={`text-[10px] uppercase tracking-widest mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

// --- Screens ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#00408c] flex flex-col items-center justify-center z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00408c] via-[#004ca8] to-[#0057b9]"></div>
      
      {/* Digital Batik Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,0.5) 45%, transparent 50%)`,
        backgroundSize: '60px 60px'
      }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center space-y-8"
      >
        <div className="p-8 bg-white/10 backdrop-blur-md rounded-[2.5rem] shadow-2xl shadow-white/5">
          <Building2 size={80} className="text-white" strokeWidth={1.5} />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-white text-4xl font-extrabold tracking-tighter sm:text-5xl">Kraton Career</h1>
          <p className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase">Heritage in every career</p>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
    </div>
  );
};

const LoginScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-[#faf9fe] flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-4 h-11">
        <button onClick={() => setScreen('splash')} className="text-[#00408c] hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-sans text-lg font-semibold tracking-tight text-[#00408c]">Kraton Career</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-grow flex flex-col pt-24 pb-12 px-8 relative overflow-hidden">
        <div className="flex flex-col items-center mb-10">
          <div className="mb-6 p-4 rounded-full bg-[#f4f3f8] shadow-sm border border-[#c5c5d4]/10">
            <Building2 size={40} className="text-[#00408c]" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1a1b1f] mb-2">Welcome Back</h2>
          <p className="text-[#454652] text-sm text-center max-w-[240px]">Access your professional heritage and career opportunities in Yogyakarta.</p>
        </div>

        <form className="space-y-5 w-full max-w-sm mx-auto z-10">
          <Input label="Email Address" placeholder="name@example.com" type="email" />
          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <label className="text-[11px] uppercase tracking-widest font-bold text-[#454652] ml-1">Password</label>
              <button onClick={() => setScreen('forgot-password')} className="text-xs font-semibold text-[#00408c] hover:opacity-70">Forgot Password?</button>
            </div>
            <Input placeholder="••••••••" type="password" rightIcon={Eye} />
          </div>
          <Button onClick={() => setScreen('home')} className="w-full h-14 mt-4" icon={LogIn}>Login</Button>
        </form>

        <div className="flex items-center gap-4 my-10 w-full max-w-sm mx-auto">
          <div className="h-[1px] flex-grow bg-[#c5c5d4]/20"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#757684]">Or continue with</span>
          <div className="h-[1px] flex-grow bg-[#c5c5d4]/20"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto z-10">
          <button className="flex items-center justify-center h-12 rounded-lg bg-white ring-1 ring-[#c5c5d4]/30 hover:bg-[#f4f3f8] transition-colors">
            <img src="https://picsum.photos/seed/apple/40" alt="Apple" className="h-5 w-5 rounded-full" referrerPolicy="no-referrer" />
          </button>
          <button className="flex items-center justify-center h-12 rounded-lg bg-white ring-1 ring-[#c5c5d4]/30 hover:bg-[#f4f3f8] transition-colors">
            <img src="https://picsum.photos/seed/google/40" alt="Google" className="h-5 w-5 rounded-full" referrerPolicy="no-referrer" />
          </button>
        </div>

        <p className="mt-12 text-center text-sm text-[#454652] z-10">
          Don't have an account? 
          <button onClick={() => setScreen('register')} className="font-bold text-[#9f402d] ml-1 hover:opacity-70">Register here</button>
        </p>

        {/* Batik Watermark */}
        <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none opacity-[0.03] flex justify-around items-end overflow-hidden">
          <Flower2 size={120} className="transform rotate-12" />
          <Flower2 size={100} className="transform -rotate-12" />
          <Flower2 size={120} className="transform rotate-45" />
        </div>

        <div className="mt-auto pt-8 flex flex-col items-center">
          <div className="h-1 w-12 rounded-full bg-[#9f402d]/20 mb-4"></div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-[#c5c5d4]">Yogyakarta Cultural Heritage</span>
        </div>
      </main>
    </div>
  );
};

const RegisterScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-[#faf9fe] flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-4 h-11">
        <button onClick={() => setScreen('login')} className="text-[#00408c] hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-sans text-lg font-semibold tracking-tight text-[#00408c]">Kraton Career</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 flex flex-col pt-16 pb-10 px-6 max-w-md mx-auto w-full">
        <section className="mt-8 mb-10 text-left">
          <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-[#ffe088] text-[#574500]">
            <span className="text-[10px] font-bold tracking-widest uppercase">Professional Heritage</span>
          </div>
          <h2 className="text-[2.75rem] font-extrabold leading-[1.1] tracking-tighter text-[#1a1b1f] mb-2">Join the Heritage</h2>
          <p className="text-[#454652] text-base leading-relaxed max-w-[280px]">Create your account to start your career journey in the cultural heart of Yogyakarta.</p>
        </section>

        <form className="space-y-6">
          <Input label="Full Name" placeholder="Raden Mas" />
          <Input label="Email Address" placeholder="example@kraton.com" type="email" />
          <Input label="Password" placeholder="••••••••" type="password" rightIcon={Eye} />
          <Input label="Confirm Password" placeholder="••••••••" type="password" />
          
          <div className="flex items-start space-x-3 px-1 pt-2">
            <input type="checkbox" id="terms" className="w-5 h-5 rounded-md border-[#c5c5d4] text-[#00408c] focus:ring-[#00408c]/30 cursor-pointer mt-0.5" />
            <label htmlFor="terms" className="text-sm text-[#454652] leading-tight">
              I agree to the <span className="text-[#00408c] font-semibold">Terms and Conditions</span> and the Privacy Policy of Kraton Career.
            </label>
          </div>

          <Button onClick={() => setScreen('home')} className="w-full h-14" icon={UserPlus}>Create Account</Button>
        </form>

        <footer className="mt-auto pt-10 pb-6 text-center">
          <p className="text-[#454652] text-sm">
            Already have an account? 
            <button onClick={() => setScreen('login')} className="text-[#00408c] font-bold ml-1 hover:underline underline-offset-4">Login</button>
          </p>
        </footer>
      </main>
    </div>
  );
};

const ForgotPasswordScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-[#faf9fe] flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm h-11 flex items-center justify-between px-4">
        <button onClick={() => setScreen('login')} className="text-[#00408c] hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-sans text-lg font-semibold tracking-tight text-[#00408c]">Kraton Career</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-20 pb-12 relative overflow-hidden">
        <div className="w-full max-w-md z-10">
          <div className="mb-10 text-center">
            <h2 className="text-[2.75rem] font-extrabold text-[#1a1b1f] tracking-tight leading-tight mb-3">Reset Password</h2>
            <p className="text-[#454652] text-[0.875rem] leading-relaxed">Enter your email to receive a recovery link</p>
          </div>

          <form className="space-y-8">
            <Input label="Email Address" placeholder="name@example.com" type="email" />
            <Button onClick={() => setScreen('login')} className="w-full h-14" icon={Send}>Send Reset Link</Button>
          </form>

          <div className="mt-12 text-center">
            <button onClick={() => setScreen('login')} className="group inline-flex items-center gap-2 text-[#454652] hover:text-[#00408c] transition-colors duration-200">
              <ArrowLeft size={18} className="group-active:-translate-x-1 transition-transform" />
              <span className="text-[0.875rem] font-medium">Back to Login</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const HomeScreen = ({ 
  setScreen, 
  onJobSelect, 
  savedJobs, 
  onToggleSave,
  appliedJobs
}: { 
  setScreen: (s: Screen) => void, 
  onJobSelect: (j: Job) => void,
  savedJobs: Job[],
  onToggleSave: (j: Job) => void,
  appliedJobs: string[]
}) => {
  return (
    <div className="bg-[#faf9fe] text-[#1a1b1f] min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 bg-[#faf9fe]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer">
            <MapPin size={20} className="text-[#00408c]" fill="currentColor" />
            <h1 className="font-semibold text-lg tracking-tight text-[#00408c]">Yogyakarta</h1>
          </div>
          <button className="p-2 rounded-full active:scale-95 transition-transform text-slate-500">
            <Bell size={24} />
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-screen-xl mx-auto">
        {/* Hero Section */}
        <section className="mb-10 relative overflow-hidden rounded-[2rem] bg-[#00408c] text-white p-8 shadow-2xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/10">
              <BadgeCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Kraton Verified Roles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 leading-[1.1]">
              Discover your <br/>dream job in Jogja
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-[280px] mb-6 leading-relaxed">
              Connecting heritage with innovation. Find professional opportunities in the cultural heart of Java.
            </p>
            <button 
              onClick={() => setScreen('search')}
              className="bg-white text-[#00408c] font-bold px-6 py-3 rounded-xl active:scale-95 transition-transform shadow-lg"
            >
              Explore Now
            </button>
          </div>
          <div className="absolute -right-4 -bottom-12 opacity-20 pointer-events-none">
            <Landmark size={180} strokeWidth={0.5} />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-6 px-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9f402d] mb-1 block">Sectors</span>
              <h3 className="text-2xl font-bold tracking-tight text-[#1a1b1f]">Categories</h3>
            </div>
            <button onClick={() => setScreen('search')} className="text-[#00408c] font-semibold text-sm hover:opacity-70">See all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {[
              { label: 'IT', icon: Terminal, color: 'bg-[#d8e2ff]', iconColor: 'text-[#00408c]' },
              { label: 'Creative', icon: Palette, color: 'bg-[#ffdad3]', iconColor: 'text-[#9f402d]' },
              { label: 'Tourism', icon: Landmark, color: 'bg-[#ffe088]', iconColor: 'text-[#735c00]' },
              { label: 'Hospitality', icon: Hotel, color: 'bg-[#adc6ff]', iconColor: 'text-[#004493]' },
            ].map((cat) => (
              <div key={cat.label} className="flex-none w-32 h-40 rounded-[2rem] bg-white shadow-sm p-4 flex flex-col justify-between items-center text-center active:scale-95 transition-all">
                <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center`}>
                  <cat.icon className={cat.iconColor} size={24} />
                </div>
                <span className="font-bold text-sm text-[#1a1b1f]">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Opportunities */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-8 px-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9f402d] mb-1 block">Newest</span>
              <h3 className="text-2xl font-bold tracking-tight text-[#1a1b1f]">Latest Opportunities</h3>
            </div>
          </div>
          <div className="space-y-6">
            {JOBS.slice(0, 2).map((job) => (
              <div 
                key={job.id} 
                onClick={() => onJobSelect(job)}
                className="bg-white rounded-[2rem] p-6 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-none bg-[#e9e7ed]">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-lg text-[#1a1b1f] leading-tight">{job.title}</h4>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(job);
                        }}
                        className={`${savedJobs.some(j => j.id === job.id) ? 'text-[#9f402d]' : 'text-[#757684]'} hover:text-[#9f402d] transition-colors`}
                      >
                        <Bookmark size={20} fill={savedJobs.some(j => j.id === job.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <p className="text-[#454652] text-sm mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.verified && (
                        <span className="bg-[#ffe088] text-[#241a00] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <BadgeCheck size={12} fill="currentColor" /> Verified
                        </span>
                      )}
                      <span className="bg-[#e9e7ed] text-[#454652] text-[10px] px-3 py-1 rounded-full font-medium">{job.type}</span>
                      {job.remote && <span className="bg-[#e9e7ed] text-[#454652] text-[10px] px-3 py-1 rounded-full font-medium">Remote</span>}
                      {appliedJobs.includes(job.id) && (
                        <span className="bg-[#00408c]/10 text-[#00408c] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">Applied</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                      <span className="text-[#00408c] font-bold text-sm">{job.salary} <span className="font-normal text-[#454652]">/mo</span></span>
                      <button className="text-[#9f402d] font-bold text-xs uppercase tracking-widest">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#fd876f] text-[#3e0500] rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <h4 className="text-2xl font-bold tracking-tight mb-2">Hospitality Hero?</h4>
                <p className="text-sm opacity-80 leading-relaxed">Top hotels in Malioboro are looking for talent today.</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md self-start px-5 py-2 rounded-full text-sm font-bold transition-all">
                Browse Hotel Jobs
              </button>
            </div>
          </div>
        </section>
      </main>

      <BottomNav active="home" setScreen={setScreen} />
      
      <button className="fixed bottom-28 right-6 w-16 h-16 bg-[#9f402d] text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all duration-300 z-40">
        <Plus size={32} />
      </button>
    </div>
  );
};

const SearchScreen = ({ 
  setScreen, 
  onJobSelect, 
  savedJobs, 
  onToggleSave,
  appliedJobs
}: { 
  setScreen: (s: Screen) => void, 
  onJobSelect: (j: Job) => void,
  savedJobs: Job[],
  onToggleSave: (j: Job) => void,
  appliedJobs: string[]
}) => {
  return (
    <div className="bg-[#faf9fe] text-[#1a1b1f] min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 bg-[#faf9fe]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-[#00408c]" />
            <h1 className="font-semibold text-lg tracking-tight text-[#00408c]">Yogyakarta</h1>
          </div>
          <button className="text-slate-500"><Bell size={24} /></button>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-screen-xl mx-auto">
        <section className="mt-4 mb-6">
          <div className="relative flex items-center group">
            <div className="absolute left-4 text-[#757684] flex items-center pointer-events-none">
              <Search size={20} />
            </div>
            <input 
              className="w-full bg-[#e9e7ed] border-none rounded-2xl py-4 pl-12 pr-4 text-[#1a1b1f] placeholder:text-[#757684] focus:ring-2 focus:ring-[#00408c]/20 transition-all duration-300 outline-none" 
              placeholder="Search roles, companies, or skills" 
              type="text"
            />
            <button className="ml-3 p-3 bg-[#00408c] text-white rounded-xl active:scale-95 transition-transform">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
            {[
              { label: 'IT & Tech', icon: Monitor, color: 'text-[#00408c]' },
              { label: 'F&B', icon: Utensils, color: 'text-[#9f402d]' },
              { label: 'Creative', icon: Brush, color: 'text-[#735c00]' },
              { label: 'Finance', icon: Landmark, color: 'text-[#00408c]' },
              { label: 'Health', icon: Stethoscope, color: 'text-[#9f402d]' },
            ].map((cat) => (
              <div key={cat.label} className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform cursor-pointer">
                  <cat.icon className={cat.color} size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#454652]">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap gap-2 mb-10">
          {['All Jobs', 'Full-time', 'Part-time', 'Remote'].map((filter, i) => (
            <button 
              key={filter}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                i === 0 ? 'bg-[#00408c] text-white shadow-lg shadow-[#00408c]/10' : 'bg-[#e9e7ed] text-[#454652] hover:bg-[#e3e2e7]'
              }`}
            >
              {filter}
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex items-baseline justify-between mb-2">
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1b1f]">32 Results found</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9f402d]">Newest First</span>
          </div>

          {/* Featured Large Card */}
          <div 
            onClick={() => onJobSelect(JOBS[4])}
            className="md:col-span-2 group relative overflow-hidden bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative shrink-0">
                <img className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#f4f3f8]" src={JOBS[4].logo} alt={JOBS[4].company} referrerPolicy="no-referrer" />
                <div className="absolute -bottom-2 -right-2 bg-[#ffe088] text-[#241a00] px-2 py-1 rounded-lg text-[10px] font-black uppercase">Featured</div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9f402d] mb-1">Creative Studio • Jogja</p>
                    <h3 className="text-2xl font-bold text-[#1a1b1f] leading-tight mb-2 group-hover:text-[#00408c] transition-colors">Senior Product Designer</h3>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(JOBS[4]);
                    }}
                    className={`p-2 rounded-xl bg-[#f4f3f8] transition-colors ${savedJobs.some(j => j.id === JOBS[4].id) ? 'text-[#9f402d]' : 'text-[#757684] hover:text-[#9f402d]'}`}
                  >
                    <Bookmark size={20} fill={savedJobs.some(j => j.id === JOBS[4].id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <p className="text-[#454652] text-sm line-clamp-2 mb-6 font-medium">{JOBS[4].description}</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-1.5 text-[#454652] text-xs font-semibold">
                    <Wallet size={18} /> <span>{JOBS[4].salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#454652] text-xs font-semibold">
                    <Clock size={18} /> <span>{JOBS[4].type}</span>
                  </div>
                  {appliedJobs.includes(JOBS[4].id) ? (
                    <div className="ml-auto px-6 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm">Applied</div>
                  ) : (
                    <button className="ml-auto px-6 py-3 bg-[#00408c] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#00408c]/20">Apply Now</button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {JOBS.slice(2, 4).map((job) => (
            <div 
              key={job.id} 
              onClick={() => onJobSelect(job)}
              className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-[#00408c]/5 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#f4f3f8] flex items-center justify-center overflow-hidden">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#757684]">{job.postedAt}</span>
              </div>
              <h4 className="text-lg font-bold text-[#1a1b1f] mb-1 group-hover:text-[#00408c] transition-colors">{job.title}</h4>
              <p className="text-xs font-medium text-[#454652] mb-4">{job.company} • {job.location}</p>
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-[#e9e7ed] rounded-lg text-[10px] font-bold text-[#454652] uppercase">React</span>
                <span className="px-3 py-1 bg-[#e9e7ed] rounded-lg text-[10px] font-bold text-[#454652] uppercase">Tailwind</span>
                {appliedJobs.includes(job.id) && (
                  <span className="px-3 py-1 bg-[#00408c]/10 rounded-lg text-[10px] font-bold text-[#00408c] uppercase tracking-wider">Applied</span>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-[#f4f3f8] pt-4">
                <span className="text-sm font-bold text-[#00408c]">{job.salary === 'Competitive Salary' ? job.salary : 'Competitive'}</span>
                <button className="text-[#00408c] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Details <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <BottomNav active="search" setScreen={setScreen} />
    </div>
  );
};

const JobDetailScreen = ({ 
  job, 
  setScreen, 
  isSaved, 
  onToggleSave, 
  onApply, 
  hasApplied 
}: { 
  job: Job, 
  setScreen: (s: Screen) => void,
  isSaved: boolean,
  onToggleSave: () => void,
  onApply: () => void,
  hasApplied: boolean
}) => {
  return (
    <div className="bg-[#faf9fe] text-[#1a1b1f] min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-transparent">
        <button onClick={() => setScreen('search')} className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm text-[#1a1b1f] active:scale-95 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm text-[#1a1b1f] active:scale-95 transition-transform">
            <Share2 size={20} />
          </button>
          <button 
            onClick={onToggleSave}
            className={`w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm active:scale-95 transition-transform ${isSaved ? 'text-[#9f402d]' : 'text-[#1a1b1f]'}`}
          >
            <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </header>

      <main className="pb-32">
        <section className="relative h-[320px] w-full">
          <img 
            src="https://picsum.photos/seed/office/1200/800" 
            alt="Office" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9fe] via-[#faf9fe]/20 to-transparent"></div>
        </section>

        <section className="px-6 -mt-16 relative z-10">
          <div className="flex flex-col items-start">
            <div className="w-24 h-24 bg-white rounded-[2rem] p-4 shadow-sm mb-6 flex items-center justify-center">
              <img src={job.logo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-1 mb-8">
              <h1 className="text-4xl font-extrabold tracking-tighter text-[#00408c] leading-tight">{job.title}</h1>
              <div className="flex items-center gap-2 text-[#454652]">
                <span className="font-semibold text-[#9f402d]">{job.company}</span>
                <span className="text-[#c5c5d4]">•</span>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span className="text-sm font-medium">{job.location}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mb-10">
              <div className="bg-[#f4f3f8] p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00408c]/10 flex items-center justify-center text-[#00408c]">
                  <Wallet size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#757684] font-bold">Salary</p>
                  <p className="text-sm font-bold text-[#1a1b1f]">{job.salary}</p>
                </div>
              </div>
              <div className="bg-[#f4f3f8] p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#9f402d]/10 flex items-center justify-center text-[#9f402d]">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#757684] font-bold">Type</p>
                  <p className="text-sm font-bold text-[#1a1b1f]">{job.type}</p>
                </div>
              </div>
            </div>

            <div className="space-y-12 w-full">
              <article>
                <h2 className="text-xs uppercase tracking-[0.2em] font-black text-[#454652] mb-4 flex items-center gap-3">
                  About the Role
                  <div className="h-px flex-1 bg-[#e9e7ed]"></div>
                </h2>
                <div className="text-[#454652] leading-relaxed space-y-4">
                  <p>{job.description || "We are seeking a visionary professional to join our team in Yogyakarta. You will be responsible for defining the future of digital products while integrating local cultural motifs into a global aesthetic."}</p>
                </div>
              </article>

              <article>
                <h2 className="text-xs uppercase tracking-[0.2em] font-black text-[#454652] mb-6 flex items-center gap-3">
                  Requirements
                  <div className="h-px flex-1 bg-[#e9e7ed]"></div>
                </h2>
                <ul className="space-y-6">
                  {[
                    "8+ years of experience in creative leadership with a strong portfolio.",
                    "Deep understanding of design systems, typography, and visual storytelling.",
                    "Proficiency in modern design tools and a keen eye for detail."
                  ].map((req, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#735c00]/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#735c00]"></div>
                      </div>
                      <p className="text-[#454652] text-sm">{req}</p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="bg-white p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Building2 size={120} />
                </div>
                <h2 className="text-xs uppercase tracking-[0.2em] font-black text-[#9f402d] mb-4">About the Company</h2>
                <h3 className="text-2xl font-bold text-[#1a1b1f] mb-4">{job.company}</h3>
                <p className="text-[#454652] leading-relaxed text-sm mb-6">Founded in 2018, {job.company} is a premier agency based in the heart of Sleman. We specialize in transforming traditional Indonesian narratives into modern digital experiences.</p>
                <div className="flex gap-2">
                  {['CREATIVE', 'TECH', 'HERITAGE'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#eeedf3] rounded-full text-[10px] font-bold text-[#454652]">{tag}</span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 px-6 pb-10 pt-6 bg-gradient-to-t from-[#faf9fe] via-[#faf9fe] to-transparent z-50">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center text-[#fd876f] shadow-sm border border-[#fd876f]/10 active:scale-95 transition-all">
            <MessageCircle size={24} />
          </button>
          <button 
            onClick={onApply}
            disabled={hasApplied}
            className={`flex-1 h-16 rounded-[1.5rem] font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${
              hasApplied 
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-br from-[#00408c] to-[#0057b9] text-white shadow-[#00408c]/20'
            }`}
          >
            {hasApplied ? 'Applied' : 'Apply Now'} <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

const SavedScreen = ({ 
  savedJobs, 
  setScreen, 
  onJobSelect, 
  toggleSave 
}: { 
  savedJobs: Job[], 
  setScreen: (s: Screen) => void, 
  onJobSelect: (j: Job) => void,
  toggleSave: (j: Job) => void
}) => {
  return (
    <div className="bg-[#faf9fe] text-[#1a1b1f] min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 bg-[#faf9fe]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-screen-xl mx-auto">
          <h1 className="font-bold text-2xl tracking-tight text-[#00408c]">Saved Jobs</h1>
          <button className="text-slate-500"><Bell size={24} /></button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-screen-xl mx-auto">
        {savedJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-[#e9e7ed] rounded-full flex items-center justify-center text-[#757684] mb-6">
              <Bookmark size={40} />
            </div>
            <h2 className="text-xl font-bold text-[#1a1b1f] mb-2">No saved jobs yet</h2>
            <p className="text-[#454652] text-sm max-w-[240px] mb-8">Start exploring and bookmark the opportunities that catch your eye.</p>
            <Button onClick={() => setScreen('search')} variant="primary">Explore Jobs</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => onJobSelect(job)}
                className="bg-white rounded-[2rem] p-6 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-none bg-[#e9e7ed]">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-lg text-[#1a1b1f] leading-tight">{job.title}</h4>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(job);
                        }}
                        className="text-[#9f402d] transition-colors"
                      >
                        <Bookmark size={20} fill="currentColor" />
                      </button>
                    </div>
                    <p className="text-[#454652] text-sm mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-[#e9e7ed] text-[#454652] text-[10px] px-3 py-1 rounded-full font-medium">{job.type}</span>
                      {job.remote && <span className="bg-[#e9e7ed] text-[#454652] text-[10px] px-3 py-1 rounded-full font-medium">Remote</span>}
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                      <span className="text-[#00408c] font-bold text-sm">{job.salary} <span className="font-normal text-[#454652]">/mo</span></span>
                      <button className="text-[#9f402d] font-bold text-xs uppercase tracking-widest">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav active="saved" setScreen={setScreen} />
    </div>
  );
};

const ProfileScreen = ({ 
  setScreen, 
  savedCount, 
  appliedCount 
}: { 
  setScreen: (s: Screen) => void,
  savedCount: number,
  appliedCount: number
}) => {
  return (
    <div className="bg-[#faf9fe] text-[#1a1b1f] min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-[#faf9fe]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-[#00408c]" />
            <span className="font-semibold text-lg tracking-tight text-[#00408c]">Yogyakarta</span>
          </div>
          <button className="hover:opacity-70 transition-opacity active:scale-95 transition-transform">
            <Bell size={24} className="text-[#00408c]" />
          </button>
        </div>
      </header>

      <main className="pt-24 pb-32 max-w-lg mx-auto px-6">
        <section className="flex flex-col items-center mb-10 text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#9f402d] via-[#735c00] to-[#00408c] shadow-lg">
              <div className="w-full h-full rounded-full border-4 border-white overflow-hidden">
                <img src="https://picsum.photos/seed/bagus/200" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-[#00408c] text-white p-1.5 rounded-full border-2 border-white shadow-md">
              <BadgeCheck size={14} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1a1b1f] mb-1">Bagus Pratama</h1>
          <p className="text-[#454652] font-medium mb-1">Senior UI/UX Designer</p>
          <div className="flex items-center justify-center gap-1 text-[#757684]">
            <Map size={14} />
            <span className="text-xs uppercase tracking-widest font-semibold">Sleman, Yogyakarta</span>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Applications', value: appliedCount.toString(), color: 'text-[#00408c]' },
            { label: 'Saved', value: savedCount.toString(), color: 'text-[#9f402d]' },
            { label: 'Interviews', value: '0', color: 'text-[#735c00]' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#f4f3f8] p-4 rounded-xl text-center">
              <span className={`block text-xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-[#454652] font-bold">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5c5d4]">Career Management</h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {[
                { label: 'My Resume', icon: FileText, color: 'bg-[#d8e2ff] text-[#00408c]' },
                { label: 'Applied Jobs', icon: Send, color: 'bg-[#ffdad3] text-[#9f402d]' },
                { label: 'Saved Jobs', icon: Bookmark, color: 'bg-[#ffe088] text-[#735c00]' },
              ].map((item, i) => (
                <React.Fragment key={item.label}>
                  <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#f4f3f8] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                        <item.icon size={20} />
                      </div>
                      <span className="text-[15px] font-semibold text-[#1a1b1f]">{item.label}</span>
                    </div>
                    <ChevronRight size={20} className="text-[#c5c5d4] group-hover:text-[#00408c] transition-colors" />
                  </button>
                  {i < 2 && <div className="h-[1px] bg-[#f4f3f8] mx-5"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5c5d4]">System</h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#f4f3f8] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#e9e7ed] flex items-center justify-center text-[#1a1b1f]">
                    <Settings size={20} />
                  </div>
                  <span className="text-[15px] font-semibold text-[#1a1b1f]">Settings</span>
                </div>
                <ChevronRight size={20} className="text-[#c5c5d4]" />
              </button>
            </div>
          </div>

          <button 
            onClick={() => setScreen('login')}
            className="w-full py-4 text-center text-red-600 font-bold text-sm tracking-wide bg-red-50 rounded-2xl active:scale-[0.98] transition-all"
          >
            Sign Out
          </button>
        </div>
      </main>

      <BottomNav active="profile" setScreen={setScreen} />
    </div>
  );
};

const ApplicationSuccessScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-[#00408c] flex flex-col items-center justify-center px-8 text-center">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#00408c] mb-8 shadow-2xl"
      >
        <BadgeCheck size={48} fill="currentColor" className="text-white" />
        <BadgeCheck size={48} className="absolute text-[#00408c]" />
      </motion.div>
      <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">Application Sent!</h2>
      <p className="text-white/80 text-base leading-relaxed mb-10 max-w-[280px]">
        Your application has been successfully submitted. The heritage team will review your profile shortly.
      </p>
      <Button onClick={() => setScreen('home')} variant="tertiary" className="w-full max-w-xs">Back to Home</Button>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('kraton_saved_jobs');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedJobs, setAppliedJobs] = useState<string[]>(() => {
    const applied = localStorage.getItem('kraton_applied_jobs');
    return applied ? JSON.parse(applied) : [];
  });

  useEffect(() => {
    localStorage.setItem('kraton_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem('kraton_applied_jobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setScreen('job-detail');
  };

  const toggleSave = (job: Job) => {
    setSavedJobs(prev => {
      const isSaved = prev.some(j => j.id === job.id);
      if (isSaved) {
        return prev.filter(j => j.id !== job.id);
      } else {
        return [...prev, job];
      }
    });
  };

  const handleApply = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      setScreen('application-success');
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#00408c]/20 selection:text-[#00408c]">
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen onComplete={() => setScreen('login')} />
          </motion.div>
        )}

        {screen === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <LoginScreen setScreen={setScreen} />
          </motion.div>
        )}

        {screen === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <RegisterScreen setScreen={setScreen} />
          </motion.div>
        )}

        {screen === 'forgot-password' && (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ForgotPasswordScreen setScreen={setScreen} />
          </motion.div>
        )}

        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HomeScreen 
              setScreen={setScreen} 
              onJobSelect={handleJobSelect} 
              savedJobs={savedJobs}
              onToggleSave={toggleSave}
              appliedJobs={appliedJobs}
            />
          </motion.div>
        )}

        {screen === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchScreen 
              setScreen={setScreen} 
              onJobSelect={handleJobSelect} 
              savedJobs={savedJobs}
              onToggleSave={toggleSave}
              appliedJobs={appliedJobs}
            />
          </motion.div>
        )}

        {screen === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SavedScreen 
              savedJobs={savedJobs} 
              setScreen={setScreen} 
              onJobSelect={handleJobSelect}
              toggleSave={toggleSave}
            />
          </motion.div>
        )}

        {screen === 'job-detail' && selectedJob && (
          <motion.div
            key="job-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <JobDetailScreen 
              job={selectedJob} 
              setScreen={setScreen} 
              isSaved={savedJobs.some(j => j.id === selectedJob.id)}
              onToggleSave={() => toggleSave(selectedJob)}
              onApply={() => handleApply(selectedJob.id)}
              hasApplied={appliedJobs.includes(selectedJob.id)}
            />
          </motion.div>
        )}

        {screen === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfileScreen 
              setScreen={setScreen} 
              savedCount={savedJobs.length}
              appliedCount={appliedJobs.length}
            />
          </motion.div>
        )}

        {screen === 'application-success' && (
          <motion.div
            key="application-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <ApplicationSuccessScreen setScreen={setScreen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
