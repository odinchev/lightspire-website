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
  Activity

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

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0,0);
    // Reset Mallorn hero on page switch
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
              <a href="https://github.com/odinchev" target="_blank" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
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
                    <button onClick={() => setPage('mallorn')} className="btn-ai px-8 py-3 font-bold flex items-center gap-2">
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
                       Move beyond static thresholds and catch failures before they happen.
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
                       AI-driven skin analysis and routine tracker.
                       Understand your skin health using computer vision technology.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                       <span className="text-purple-500">&gt;&gt;&gt;</span> VIEW_MODULE
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* --- MALLORN DETAIL PAGE (GALLERY STYLE) --- */}
        {page === 'mallorn' && (
           <div className="animate-fade-in">
              <button onClick={() => setPage('home')} className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK_TO_ROOT
              </button>

              <div className="text-center mb-12">
                 <div className="inline-block px-3 py-1 rounded mb-4 text-xs font-mono border border-blue-500/30 text-blue-400 bg-blue-500/10">
                    MODULE: MALLORN
                 </div>
                 <h1 className="text-4xl md:text-5xl font-bold mb-6">Predictive Storage Defense</h1>
                 <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    The Sentinel for your Storage. Trained on 300,000+ drives. Mallorn ignores manufacturer thresholds and uses a machine learning model to detect non-linear failure patterns.
                 </p>

                 <div className="flex gap-4 justify-center mt-8">
                    <a href={LINKS.mallornDownload} className="btn-ai px-6 py-3 font-bold flex items-center gap-2 no-underline">
                        <Monitor size={18}/> Download for Windows
                    </a>
                    <a href={LINKS.mallornRepo} target="_blank" className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium text-sm flex items-center gap-2 text-white no-underline">
                        <Github size={18}/> View on GitHub
                    </a>
                 </div>
              </div>

              {/* GALLERY SECTION */}
              <div className="bg-[#050505] rounded-[1rem] border border-white/10 p-2 shadow-2xl overflow-hidden mb-8">
                 <img src={mallornHero} alt="Mallorn UI" className="w-full h-auto rounded-lg" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                 {[
                    { img: "assets/theme-mallorn.png", name: "DEFAULT", color: "text-blue-400" },
                    { img: "assets/theme-valinor.png", name: "VALINOR", color: "text-white" },
                    { img: "assets/theme-isengard.png", name: "ISENGARD", color: "text-red-500" },
                    { img: "assets/theme-lothlorien.png", name: "LOTHLÓRIEN", color: "text-emerald-400" }
                 ].map((theme, i) => (
                    <div key={i} onClick={() => setMallornHero(theme.img)} className="cursor-pointer group text-center">
                       <div className={`rounded-lg border border-white/10 overflow-hidden mb-2 transition-all ${mallornHero === theme.img ? 'ring-2 ring-blue-500' : 'opacity-70 group-hover:opacity-100'}`}>
                          <img src={theme.img} alt={theme.name} />
                       </div>
                       <span className={`text-[10px] font-mono font-bold ${theme.color}`}>{theme.name}</span>
                    </div>
                 ))}
              </div>

              {/* DONATION BANNER (GREEN) */}
              <div className="p-8 rounded-2xl bg-emerald-900/10 border border-emerald-500/20 text-center max-w-xl mx-auto">
                 <h3 className="text-lg font-bold mb-2 text-emerald-400">Mallorn is Free & Open Source</h3>
                 <p className="text-emerald-200/60 text-sm mb-6">
                    I built this to save data. If it saved yours, consider buying me a coffee.
                 </p>
                 <a href={LINKS.kofi} target="_blank" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/20 no-underline">
                    <Coffee size={18} /> Buy me a Coffee
                 </a>
              </div>
           </div>
        )}

        {/* --- SKINGENIE DETAIL PAGE (ZIG ZAG) --- */}
        {page === 'skingenie' && (
           <div className="animate-fade-in">
              <button onClick={() => setPage('home')} className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK_TO_ROOT
              </button>

              <div className="text-center mb-16">
                 <div className="inline-block px-3 py-1 rounded mb-4 text-xs font-mono border border-purple-500/30 text-purple-400 bg-purple-500/10">
                    MODULE: SKINGENIE
                 </div>
                 <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Pocket Dermatologist</h1>
                 <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                    Stop guessing what your skin needs. SkinGenie uses advanced computer vision to scan your face in seconds and build personalized routines.
                 </p>
                 <a href={LINKS.skinGenieStore} target="_blank" className="btn-ai px-6 py-3 font-bold inline-flex items-center gap-2 no-underline">
                    <Play size={18} fill="currentColor"/> Get on Google Play
                 </a>
              </div>

              {/* SECTION 1: SCAN */}
              <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                 <div className="flex-1 relative">
                    <div className="absolute -inset-4 bg-purple-600/20 blur-2xl rounded-full"></div>
                    <img src="assets/skin-hero.png" alt="Scan" className="relative rounded-xl border border-white/10 shadow-2xl w-full" />
                 </div>
                 <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-purple-400">Discover Your Skin's Story</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                       SkinGenie uses advanced computer vision to scan your face in seconds. It maps hydration, oiliness, and texture without sending photos to the cloud.
                    </p>
                    <ul className="space-y-3">
                       {['Instant Camera Scan', 'Privacy-First Processing', 'Works on all skin tones'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-300">
                             <CheckCircle2 size={16} className="text-purple-500" /> {item}
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* SECTION 2: RESULTS (REVERSE) */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24">
                 <div className="flex-1 relative">
                    <div className="absolute -inset-4 bg-blue-600/20 blur-2xl rounded-full"></div>
                    <img src="assets/skin-results.png" alt="Results" className="relative rounded-xl border border-white/10 shadow-2xl w-full" />
                 </div>
                 <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-blue-400">Clinical-Grade Analysis</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                       Our AI breaks down your skin health into understandable metrics. Identify issues before they become visible problems.
                    </p>
                    <ul className="space-y-3">
                       <li className="flex items-start gap-3 text-gray-300">
                          <Activity size={16} className="text-blue-500 mt-1" />
                          <span><strong className="text-white">80+ Analysis Points:</strong> From hydration levels to texture.</span>
                       </li>
                       <li className="flex items-start gap-3 text-gray-300">
                          <ShieldCheck size={16} className="text-blue-500 mt-1" />
                          <span><strong className="text-white">Actionable Insights:</strong> We explain <em>why</em> it matters.</span>
                       </li>
                    </ul>
                 </div>
              </div>

              {/* SECTION 3: ROUTINE */}
              <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                 <div className="flex-1 relative">
                    <div className="absolute -inset-4 bg-emerald-600/20 blur-2xl rounded-full"></div>
                    <img src="assets/skin-routine.png" alt="Routine" className="relative rounded-xl border border-white/10 shadow-2xl w-full" />
                 </div>
                 <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-emerald-400">Build Your Routine</h2>
                    <p className="text-gray-400 leading-relaxed">
                       Consistency is key to glowing skin. Organize your products into AM and PM routines and get smart reminders so you never miss a step.
                    </p>
                 </div>
              </div>

              {/* DONATION BANNER (GREEN) */}
              <div className="p-8 rounded-2xl bg-emerald-900/10 border border-emerald-500/20 text-center max-w-xl mx-auto">
                 <h3 className="text-lg font-bold mb-2 text-emerald-400">Support Indie Development</h3>
                 <p className="text-emerald-200/60 text-sm mb-6">
                    SkinGenie is free to use. If it helps your skincare journey, consider supporting future updates.
                 </p>
                 <a href={LINKS.kofi} target="_blank" className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/20 no-underline">
                    <Coffee size={18} /> Buy me a Coffee
                 </a>
              </div>
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
