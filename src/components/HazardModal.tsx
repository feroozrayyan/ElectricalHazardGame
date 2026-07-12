import React, { useState, useEffect } from 'react';
import { Hazard } from '../types';
import { 
  X, 
  ShieldAlert, 
  Lightbulb, 
  FileText, 
  CheckCircle,
  Tablet,
  Wind,
  Zap,
  FlameKindling,
  Layers,
  EyeOff,
  Cable,
  Droplets,
  Scissors,
  CloudRain,
  Trees,
  Volume2,
  VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Tablet: Tablet,
  Wind: Wind,
  Zap: Zap,
  FlameKindling: FlameKindling,
  Layers: Layers,
  EyeOff: EyeOff,
  Cable: Cable,
  Droplets: Droplets,
  Scissors: Scissors,
  CloudRain: CloudRain,
  Trees: Trees,
  ShieldAlert: ShieldAlert
};

interface HazardModalProps {
  hazard: Hazard;
  onClose: () => void;
}

export default function HazardModal({ hazard, onClose }: HazardModalProps) {
  const IconComponent = iconMap[hazard.icon] || ShieldAlert;
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        // Strip out high-end scientific jargon formulas or format nicely for TTS
        const cleanTitle = hazard.title.replace(/AC Line Voltage|Uninsulated/gi, 'Warning');
        const textToSpeak = `${cleanTitle}. ${hazard.description}. What to do: ${hazard.safetyAction}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        utterance.rate = 0.85; // highly legible speed for children
        utterance.pitch = 1.05; // warm, encouraging tone
        
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleCloseAndStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        {/* Modal container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl text-slate-100"
        >
          {/* Top colored alert banner */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 p-6 flex items-center gap-4 text-slate-950">
            <div className="p-3 bg-white/30 backdrop-blur-md rounded-2xl">
              <IconComponent size={28} className="stroke-[2.5]" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-950 text-white px-2 py-0.5 rounded-full">
                Danger Spot Detected!
              </span>
              <h3 className="text-xl md:text-2xl font-display font-extrabold mt-1 text-slate-950 leading-tight">
                {hazard.title}
              </h3>
            </div>
            <button 
              onClick={handleCloseAndStop}
              className="p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Hazard Illustration if available */}
            {hazard.imageUrl && (
              <div className="relative w-full h-48 md:h-60 rounded-2xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950">
                <img 
                  src={hazard.imageUrl} 
                  alt={hazard.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-md">
                  Hazard Snapshot 📸
                </span>
              </div>
            )}

            {/* Story description for kids */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase font-mono text-amber-400 font-bold tracking-wider block">What’s going on?</span>
                {'speechSynthesis' in window && (
                  <button
                    onClick={handleSpeak}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                      isSpeaking 
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/10' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {isSpeaking ? <VolumeX size={14} className="text-indigo-400 animate-pulse" /> : <Volume2 size={14} />}
                    {isSpeaking ? 'Stop voiceover' : 'Read Aloud 🔊'}
                  </button>
                )}
              </div>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
                {hazard.description}
              </p>
            </div>

            {/* Why it's dangerous box */}
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-4 flex gap-4">
              <div className="text-amber-400 mt-1 shrink-0">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-amber-300 uppercase tracking-wide">
                  Why is this dangerous?
                </h4>
                <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
                  {hazard.whyDangerous}
                </p>
              </div>
            </div>

            {/* Scientific Forensic Pathology link */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex gap-4">
              <div className="text-indigo-400 mt-1 shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
                  Real-World Forensic Insight
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed italic">
                  &ldquo;{hazard.clinicalFact}&rdquo;
                </p>
              </div>
            </div>

            {/* Safety action plan */}
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 flex gap-4">
              <div className="text-emerald-400 mt-1 shrink-0">
                <Lightbulb size={22} />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-sm text-emerald-300 uppercase tracking-wide">
                  Safe Kid Action Plan 🛡️
                </h4>
                <p className="text-xs md:text-sm text-slate-200 mt-1 font-semibold leading-relaxed">
                  {hazard.safetyAction}
                </p>
              </div>
            </div>
          </div>

          {/* Safe closure footer */}
          <div className="bg-slate-950 p-4 px-6 md:px-8 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">Severity: {hazard.severity.toUpperCase()}</span>
            <button
              onClick={handleCloseAndStop}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold rounded-xl shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer"
            >
              <CheckCircle size={16} />
              Got it, I’ll be Safe!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
