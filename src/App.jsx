import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  ArrowRight,
  ArrowLeft,
  Monitor,
  Brain,
  HardDrive,
  ScanFace,
  Terminal,
  Cpu,
  Play,
  Coffee,
  CheckCircle2,
  Camera,
  ShieldCheck,
  Activity,
  Zap,
  BarChart3,
  Smartphone,
  Layers,
  AlertCircle,
  Database,
  Lock,
  RefreshCw
} from 'lucide-react';

// --- ADVANCED CSS & ANIMATIONS ---
const styles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;600;800&display=swap');

:root {
  --primary: #8b5cf6;
  --bg-dark: #050505;
  --card-bg: rgba(20, 20, 25, 0.6);
  --glass-border: rgba(255, 255, 255, 0.08);
}

body {
  background-color: var(--bg-dark);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  margin: 0;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }

.font-mono { font-family: 'JetBrains Mono', monospace; }

/* AI CARD (HOLOGRAPHIC) */
.ai-card {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.ai-card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 20px 40px -10px rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.3);
}

.ai-card::after {
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
  transform: skewX(-25deg);
  transition: 0.5s;
  pointer-events: none;
}
.ai-card:hover::after { left: 150%; transition: 1s ease-in-out; }

/* BUTTONS */
.btn-ai {
  position: relative;
  background: linear-gradient(90deg, #4f46e5, #8b5cf6);
  color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: 0.3s;
  z-index: 1;
}
.btn-ai::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 0%; height: 100%;
  background: rgba(255,255,255,0.1);
  transition: 0.3s;
  z-index: -1;
}
.btn-ai:hover::before { width: 100%; }
.btn-ai:hover { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
`;

// --- HOOKS ---
const useScrambleText = (text, speed = 40) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
};

// --- COMPONENTS ---

// 1. WAVE BACKGROUND
const WaveBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let frame = 0;
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const lines = [
      { color: 'rgba(139, 92, 246, 0.15)', speed: 0.002, amplitude: 50, frequency: 0.002, yOffset: 0 },
      { color: 'rgba(6, 182, 212, 0.1)', speed: 0.003, amplitude: 70, frequency: 0.003, yOffset: 50 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;
      lines.forEach(line => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x+=5) {
          const y = (height / 2) + line.yOffset +
                    Math.sin(x * line.frequency + frame * line.speed) * line.amplitude;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

// 2. SCRAMBLE TITLE
const ScrambleTitle = ({ text }) => {
  const scrambled = useScrambleText(text);
  return <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500 min-h-[1.2em]">{scrambled}</h1>;
};


// --- MAIN APP ---
export default function LightspireAI() {
  const [page, setPage] = useState('home');
  const [mounted, setMounted] = useState(false);

  // State for Mallorn Gallery
  const [mallornHero, setMallornHero] = useState("assets/theme-mallorn.png");
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0,0);
    if(page === 'mallorn') setMallornHero("assets/theme-mallorn.png");
  }, [page]);

  const LINKS = {
    mallornDownload: "https://github.com/odinchev/Mallorn/releases/latest/download/Mallorn_Setup.exe",
    mallornRepo: "https://github.com/odinchev/Mallorn",
    skinGenieStore: "https://play.google.com/store/apps/details?id=com.lightspire.skingenie",
    kofi: "https://ko-fi.com/YOUR_USERNAME"
  };

  return (
    <div className="min-h-screen relative text-gray-100 font-sans bg-[#050505]">
      <style>{styles}</style>
      <WaveBackground />

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <div className="bg-[#0a0a0c]/80 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl backdrop-blur-xl border border-white/10">
           <button onClick={() => setPage('home')} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                 <Cpu size={18} />
              </div>
              <span className="font-bold tracking-tight text-lg">LIGHT<span className="text-violet-400">SPIRE</span></span>
           </button>
           <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
           <div className="hidden sm:flex items-center gap-1">
              <a href="https://github.com/odinchev" target="_blank" rel="noreferrer" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                 <Github size={18} />
              </a>
           </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-4 max-w-6xl mx-auto">

        {/* === HOME PAGE === */}
        {page === 'home' && (
           <div className={`transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center max-w-3xl mx-auto mb-20">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                    SYSTEM_ONLINE
                 </div>

                 <ScrambleTitle text="Tools that respect your intelligence." />

                 <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    Open source utilities, privacy-focused apps, and AI-driven insights.
                    Built for the modern age.
                 </p>

                 <div className="flex justify-center gap-4">
                    <button onClick={() => setPage('mallorn')} className="btn-ai px-8 py-3 font-bold flex items-center gap-2 cursor-pointer">
                       View Latest Project <ArrowRight size={18} />
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Mallorn Card */}
                 <div onClick={() => setPage('mallorn')} className="ai-card p-8 group cursor-pointer">
                    <div className="flex justify-between items-start mb-8">
                       <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                          <HardDrive size={32} />
                       </div>
                       <div className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300">
                          DESKTOP • AI
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">Mallorn AI</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                       Predictive drive health monitoring using Random Forest AI.
                       Watcher of the Heartwood.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                       <span className="text-blue-500">&gt;&gt;&gt;</span> VIEW_MODULE
                    </div>
                 </div>

                 {/* SkinGenie Card */}
                 <div onClick={() => setPage('skingenie')} className="ai-card p-8 group cursor-pointer">
                    <div className="flex justify-between items-start mb-8">
                       <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                          <ScanFace size={32} />
                       </div>
                       <div className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300">
                          ANDROID • AI
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">SkinGenie</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                       Your personal skincare command center.
                       Build routines, swap products, and analyze skin health.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                       <span className="text-purple-500">&gt;&gt;&gt;</span> VIEW_MODULE
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* --- MALLORN DETAIL PAGE (UPDATED - REAL DATA) --- */}
        {page === 'mallorn' && (
           <div className="animate-fade-in">
              {/* HEADER NAV */}
              <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-4">
                <button onClick={() => setPage('home')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                   <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK
                </button>
              </div>

              {/* HERO SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                 <div>
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
                       Watcher of the <span className="text-blue-500">Heartwood</span>
                    </h1>
                    <p className="text-lg text-gray-400 mb-8 leading-relaxed border-l-2 border-blue-500/30 pl-4">
                       Traditional tools rely on manufacturer thresholds that often trigger too late. Mallorn uses a <b>Random Forest Classifier</b> trained on <b>300,000+ drive-days</b> of data to detect non-linear patterns of imminent failure.
                    </p>

                    {/* TELEMETRY GRID */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg">
                            <div className="text-xs text-blue-400 font-mono mb-1">TRAINING_CORPUS</div>
                            <div className="text-xl font-bold text-white">300k+ Drives</div>
                        </div>
                        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg">
                            <div className="text-xs text-blue-400 font-mono mb-1">VALIDATION_ACCURACY</div>
                            <div className="text-xl font-bold text-white">~93%</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                       <a href={LINKS.mallornDownload} className="btn-ai px-6 py-3 font-bold flex items-center gap-2 no-underline hover:brightness-110">
                           <Monitor size={18}/> Download for Windows
                       </a>
                       <a href={LINKS.mallornRepo} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium text-sm flex items-center gap-2 text-white no-underline">
                           <Github size={18}/> Source Code
                       </a>
                    </div>
                 </div>

                 {/* INTERACTIVE PREVIEW */}
                 <div className="relative group">
                     {/* Decorative Elements */}
                     <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl"></div>
                     <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>

                     {/* Main Image Container */}
                     <div className="tech-border tech-corner rounded-xl bg-[#0a0a0f] p-2 shadow-2xl relative z-10">
                        <div className="absolute top-4 right-4 flex gap-1 z-20">
                            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                        </div>
                        <img src={mallornHero} alt="Mallorn UI" className="w-full h-auto rounded border border-white/5" />
                     </div>
                 </div>
              </div>

              {/* FEATURES (FOUR HORSEMEN) */}
              <div className="mb-20">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Database size={20} className="text-blue-500"/> THE FOUR HORSEMEN OF FAILURE
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 max-w-2xl">
                    Mallorn looks at the raw physics of the drive, specifically targeting these unnormalized vectors:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     {[
                       { id: "SMART 5", name: "Reallocated Sectors", desc: "Permanent physical damage." },
                       { id: "SMART 187", name: "Uncorrectable Errors", desc: "Controller failure panic." },
                       { id: "SMART 197", name: "Pending Sectors", desc: "Unstable magnetic media." },
                       { id: "SMART 9", name: "Power-On Hours", desc: "Mechanical wear & tear." },
                     ].map((item, i) => (
                        <div key={i} className="bg-blue-900/5 border border-blue-500/10 p-4 rounded-lg">
                           <div className="font-mono text-blue-500 text-xs mb-1">{item.id}</div>
                           <div className="font-bold text-white text-sm mb-2">{item.name}</div>
                           <div className="text-gray-500 text-xs">{item.desc}</div>
                        </div>
                     ))}
                  </div>
              </div>

              {/* THEME SELECTOR (UPDATED) */}
              <div className="mb-20">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Layers size={20} className="text-blue-500"/> VISUAL_CUSTOMIZATION
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                        { img: "assets/theme-mallorn.png", name: "MALLORN", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
                        { img: "assets/theme-valinor.png", name: "VALINOR", color: "text-gray-200", bg: "bg-gray-500/10", border: "border-gray-500/30" },
                        { img: "assets/theme-isengard.png", name: "ISENGARD", color: "text-red-500", bg: "bg-red-900/20", border: "border-red-500/30" },
                        { img: "assets/theme-lothlorien.png", name: "LOTHLÓRIEN", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" }
                     ].map((theme, i) => (
                        <div key={i} onClick={() => setMallornHero(theme.img)} className="cursor-pointer group relative">
                           <div className={`rounded-lg overflow-hidden border transition-all duration-300 ${mallornHero === theme.img ? `ring-2 ring-offset-2 ring-offset-black ${theme.border} scale-[1.02]` : 'border-white/10 opacity-60 hover:opacity-100'}`}>
                              <img src={theme.img} alt={theme.name} className="w-full" />
                              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3`}>
                                  <span className={`text-xs font-mono font-bold ${theme.color}`}>{theme.name}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
              </div>

              {/* DONATION BANNER */}
              <div className="relative overflow-hidden p-8 rounded-2xl bg-[#09090b] border border-emerald-500/20 text-center max-w-2xl mx-auto group hover:border-emerald-500/40 transition-colors">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                 <h3 className="text-lg font-bold mb-2 text-white flex items-center justify-center gap-2">
                     <Monitor size={18} className="text-emerald-500"/> Mallorn is Free
                 </h3>
                 <p className="text-gray-400 text-sm mb-6">
                    I built this to save data. If it saved yours, consider buying me a coffee.
                 </p>
                 <a href={LINKS.kofi} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/20 no-underline text-sm">
                    <Coffee size={16} /> Buy me a Coffee
                 </a>
              </div>
           </div>
        )}

        {/* --- SKINGENIE DETAIL PAGE (UPDATED) --- */}
        {page === 'skingenie' && (
           <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-4">
                <button onClick={() => setPage('home')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                   <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK
                </button>
              </div>

              <div className="text-center mb-20">
                 <div className="inline-block px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-wider border border-purple-500/30 text-purple-300 bg-purple-900/10 uppercase">
                    Your Personal Skincare Command Center
                 </div>
                 <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-b from-white to-purple-200 bg-clip-text text-transparent">
                    Build. Track.<br/>Perfect.
                 </h1>
                 <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                    A complete platform for your face. Generate AI-powered routines, swap products to fit your budget, and track your skin's evolution.
                 </p>
                 <a href={LINKS.skinGenieStore} target="_blank" rel="noreferrer" className="btn-ai px-8 py-4 font-bold inline-flex items-center gap-3 no-underline text-lg rounded-full hover:scale-105 transition-transform">
                    <Play size={20} fill="currentColor"/> Get on Google Play
                 </a>
              </div>

              <div className="relative h-[400px] w-full flex justify-center items-center">
                 {/* Routine (Left/Back) */}
                 <img
                    src="assets/skin-routine.png"
                    alt="Routine"
                    onClick={() => setLightboxImg("assets/skin-routine.png")}
                    className="absolute left-0 top-10 w-48 rounded-[2rem] border-4 border-[#1a1a20] shadow-2xl -rotate-12 opacity-60 z-0 transform scale-90 cursor-zoom-in hover:opacity-100 hover:scale-95 hover:z-20 transition-all duration-300"
                 />

                 {/* Results (Right/Back) */}
                 <img
                    src="assets/skin-results.png"
                    alt="Results"
                    onClick={() => setLightboxImg("assets/skin-results.png")}
                    className="absolute right-0 top-10 w-48 rounded-[2rem] border-4 border-[#1a1a20] shadow-2xl rotate-12 opacity-60 z-0 transform scale-90 cursor-zoom-in hover:opacity-100 hover:scale-95 hover:z-20 transition-all duration-300"
                 />

                 {/* Hero Scan (Center/Front) */}
                 <div
                    onClick={() => setLightboxImg("assets/skin-hero.png")}
                    className="relative z-10 w-56 rounded-[2.5rem] border-[8px] border-[#1a1a20] overflow-hidden shadow-2xl bg-black transform hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                 >
                     <div className="scan-line"></div>
                     <div className="scan-overlay"></div>
                     <img src="assets/skin-hero.png" alt="Scan" className="w-full h-auto opacity-90" />
                 </div>
              </div>

                 <div>
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                        <Camera size={24} />
                    </div>
                    <h2 className="text-3xl font-bold mb-6">See What AI Sees</h2>
                    <p className="text-gray-400 leading-relaxed mb-8">
                       Upload a selfie and get an instant analysis of your skin type, concerns, and sensitivity. Our advanced AI creates a personalized profile in seconds.
                    </p>

                    <div className="space-y-4">
                       {[
                         { title: 'Privacy First', desc: 'Images are deleted immediately after analysis.', icon: Lock },
                         { title: 'Unlimited Saves', desc: 'Create and save as many routines as you want.', icon: Database },
                         { title: 'Custom Builder', desc: 'Prefer to DIY? Build your routine from scratch.', icon: Layers }
                       ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
                             <item.icon size={20} className="text-purple-400" />
                             <div>
                                <div className="font-bold text-sm text-gray-200">{item.title}</div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* SECTION 2: ANALYSIS GRID */}
              <div className="mb-32">
                  <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-4">Total Control</h2>
                      <p className="text-gray-400">Manage every aspect of your skincare journey.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#0f0f12] p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                          <div className="mb-4 flex justify-between items-start">
                              <RefreshCw className="text-blue-500 group-hover:scale-110 transition-transform"/>
                              <span className="text-xs font-mono text-gray-600">FEATURE_01</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">Smart Swapping</h3>
                          <p className="text-sm text-gray-400 mb-4">Not satisfied with a recommendation? Fine-tune AI results by finding alternatives that match your budget.</p>
                      </div>
                       <div className="bg-[#0f0f12] p-6 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all group">
                          <div className="mb-4 flex justify-between items-start">
                              <Zap className="text-pink-500 group-hover:scale-110 transition-transform"/>
                              <span className="text-xs font-mono text-gray-600">FEATURE_02</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">AM / PM Routines</h3>
                          <p className="text-sm text-gray-400 mb-4">Create separate morning and evening regimens. Set one as 'Active' to track what you're currently using.</p>
                      </div>
                       <div className="bg-[#0f0f12] p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                          <div className="mb-4 flex justify-between items-start">
                              <ShieldCheck className="text-emerald-500 group-hover:scale-110 transition-transform"/>
                              <span className="text-xs font-mono text-gray-600">FEATURE_03</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">Ingredient Safety</h3>
                          <p className="text-sm text-gray-400 mb-4">We analyze 8+ attributes to ensure products match your specific sensitivity profile and skin goals.</p>
                      </div>
                  </div>
              </div>

              {/* SECTION 3: ROUTINE */}
              <div className="rounded-3xl bg-[#0a0a0c] border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden mt-32">
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none"></div>

                 <div className="flex-1 z-10">
                    <h2 className="text-3xl font-bold mb-4 text-white">Export Your Genius</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                       Need a PDF to prove how amazing your skincare routine is? Boom. Export your full regimen with product details, prices, and instructions in one tap.
                    </p>
                    <a href={LINKS.skinGenieStore} target="_blank" className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wide hover:text-emerald-300 transition-colors no-underline">
                        Check it on Google Play <ArrowRight size={16}/>
                    </a>
                 </div>
                 <div className="flex-1 relative z-10">
                     <img src="assets/skin-routine.png" alt="Routine" className="rounded-lg shadow-2xl border border-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-500" />
                 </div>
              </div>


              {/* DONATION BANNER */}
              <div className="mt-32 relative overflow-hidden p-8 rounded-2xl bg-[#09090b] border border-emerald-500/20 text-center max-w-2xl mx-auto group hover:border-emerald-500/40 transition-colors">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                 <h3 className="text-lg font-bold mb-2 text-white flex items-center justify-center gap-2">
                     <Monitor size={18} className="text-emerald-500"/> Support Indie Development
                 </h3>
                 <p className="text-gray-400 text-sm mb-6">
                    SkinGenie is free to use. If it helps your skincare journey, consider supporting future updates.
                 </p>
                 <a href={LINKS.kofi} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/20 no-underline text-sm">
                    <Coffee size={16} /> Buy me a Coffee
                 </a>
              </div>
           </div>
        )}
        {/* LIGHTBOX OVERLAY */}
          {lightboxImg && (
             <div
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
                onClick={() => setLightboxImg(null)}
             >
                <button className="absolute top-6 right-6 text-white/50 hover:text-white">
                   <ArrowLeft size={32} className="rotate-180" /> {/* Close Icon */}
                </button>
                <img
                   src={lightboxImg}
                   alt="Fullscreen"
                   className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border border-white/10"
                   onClick={(e) => e.stopPropagation()} // Prevent closing if clicking the image itself
                />
            </div>
          )}


      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 mt-12">
         <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
               © 2026 LIGHTSPIRE.GG
            </div>
         </div>
      </footer>
    </div>
  );
}
