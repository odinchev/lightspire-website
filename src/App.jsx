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
  CheckCircle2
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

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0,0);
  }, [page]);

  // YOUR ACTUAL LINKS
  const LINKS = {
    mallornDownload: "https://github.com/odinchev/Mallorn/releases/latest/download/Mallorn_Setup.exe",
    mallornRepo: "https://github.com/odinchev/Mallorn",
    skinGenieStore: "https://play.google.com/store/apps/details?id=com.lightspire.skingenie",
    kofi: "https://ko-fi.com/YOUR_USERNAME" // Add your real link
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

        {page === 'home' && (
           <div className={`transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              {/* HERO */}
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

              {/* CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* MALLORN CARD */}
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

                 {/* SKINGENIE CARD */}
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

        {/* --- DETAIL PAGES --- */}

        {page !== 'home' && (
           <div className="animate-fade-in">
              <button
                 onClick={() => setPage('home')}
                 className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK_TO_ROOT
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 {/* Text Content */}
                 <div>
                    <div className={`inline-block px-3 py-1 rounded mb-4 text-xs font-mono border ${page === 'mallorn' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-purple-500/30 text-purple-400 bg-purple-500/10'}`}>
                       MODULE: {page.toUpperCase()}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                       {page === 'mallorn' ? 'Predictive Storage Defense' : 'Your Pocket Dermatologist'}
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                       {page === 'mallorn'
                          ? "The Sentinel for your Storage. Trained on 300,000+ drives. Mallorn ignores manufacturer thresholds and uses a machine learning model to detect non-linear failure patterns."
                          : "Stop guessing what your skin needs. SkinGenie uses advanced computer vision to scan your face in seconds and give you personalized recomendations."
                       }
                    </p>

                    <div className="space-y-4 mb-8">
                       {(page === 'mallorn'
                          ? ['Random Forest AI Model', 'Hybrid Scanning (Smartctl + WinAPI)', 'Native System Tray Integration']
                          : ['Computer Vision Analysis', 'Routine Tracking & Reminders', 'Routine Notifications']
                       ).map((feat, i) => (
                          <div key={i} className="flex items-center gap-3">
                             <CheckCircle2 size={18} className={page === 'mallorn' ? 'text-blue-500' : 'text-purple-500'} />
                             <span className="text-gray-300">{feat}</span>
                          </div>
                       ))}
                    </div>

                    <div className="flex gap-4">
                       {/* DOWNLOAD ACTIONS */}
                       <a
                          href={page === 'mallorn' ? LINKS.mallornDownload : LINKS.skinGenieStore}
                          className="btn-ai px-6 py-3 font-bold flex items-center gap-2 no-underline"
                          target={page === 'mallorn' ? '_self' : '_blank'}
                       >
                          {page === 'mallorn' ? <Monitor size={18}/> : <Play size={18} fill="currentColor"/>}
                          {page === 'mallorn' ? 'Download for Windows' : 'Get on Google Play'}
                       </a>

                       {page === 'mallorn' && (
                         <a href={LINKS.mallornRepo} target="_blank" className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium text-sm flex items-center gap-2 text-white no-underline">
                            <Github size={18}/> View on GitHub
                         </a>
                       )}
                    </div>
                 </div>

                 {/* Visual Showcase (REAL IMAGES) */}
                 <div className="relative group">
                    <div className={`absolute -inset-4 rounded-[2rem] opacity-30 blur-2xl transition-all group-hover:opacity-50 ${page === 'mallorn' ? 'bg-blue-600' : 'bg-purple-600'}`}></div>

                    <div className="relative bg-[#050505] rounded-[1rem] border border-white/10 p-2 shadow-2xl overflow-hidden">
                       {/* DYNAMIC IMAGE LOADING */}
                       <img
                          src={page === 'mallorn' ? "assets/theme-mallorn.png" : "assets/skin-hero.png"}
                          alt="App Screenshot"
                          className="w-full h-auto rounded-lg"
                       />
                    </div>
                 </div>
              </div>

              {/* DONATION BANNER */}
              <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center max-w-xl mx-auto">
                 <h3 className="text-lg font-bold mb-2">Support Indie Development</h3>
                 <p className="text-gray-400 text-sm mb-4">
                    Both apps are free to use. If they help you, consider supporting future updates.
                 </p>
                 <a href={LINKS.kofi} target="_blank" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-bold transition-colors">
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
