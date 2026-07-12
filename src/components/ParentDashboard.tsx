import React, { useState, useEffect } from 'react';
import { CLINICAL_STUDIES, TEN_COMMON_CAUSES } from '../data/safetyData';
import { 
  FileText, 
  Activity, 
  CheckSquare, 
  ShieldAlert, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState<'studies' | 'checklist'>('studies');
  const [auditState, setAuditState] = useState<Record<string, boolean>>({});

  // Load home safety audit from localStorage
  useEffect(() => {
    const savedAudit = localStorage.getItem('electrical_safety_audit');
    if (savedAudit) {
      try {
        setAuditState(JSON.parse(savedAudit));
      } catch (e) {
        console.error('Failed to load audit state', e);
      }
    }
  }, []);

  const toggleAuditItem = (id: string) => {
    const newState = {
      ...auditState,
      [id]: !auditState[id]
    };
    setAuditState(newState);
    localStorage.setItem('electrical_safety_audit', JSON.stringify(newState));
  };

  const resetAudit = () => {
    setAuditState({});
    localStorage.removeItem('electrical_safety_audit');
  };

  const checkedCount = Object.values(auditState).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / TEN_COMMON_CAUSES.length) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white max-w-6xl mx-auto shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/20">
            For Parents & Educators
          </span>
          <h2 className="text-3xl font-display font-bold mt-2 text-slate-100 flex items-center gap-2">
            <HeartHandshake className="text-rose-500" />
            Safety Guard Academy
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Understanding forensic statistics and implementing preventative actions to secure your home.
          </p>
        </div>
        
        {/* Tab switchers */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('studies')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === 'studies' 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity size={16} />
            Forensic Case Studies
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === 'checklist' 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare size={16} />
            Home Safety Audit ({checkedCount}/{TEN_COMMON_CAUSES.length})
          </button>
        </div>
      </div>

      {activeTab === 'studies' ? (
        <div className="mt-8 space-y-8 animate-fadeIn">
          {/* General analytical summary box */}
          <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-950 p-6 rounded-2xl border border-indigo-500/20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 mt-1">
                <TrendingUp size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200">The Gender Factor</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Across multiple international studies, <strong>79% to 87%</strong> of electrocution victims are male. Active, exploratory play and physical risk-taking contribute heavily to childhood accidents.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mt-1">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200">Upper Extremity Risk</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Forensic data from Turkey shows that <strong>78% of fatal contacts</strong> involve the upper extremities (hands and arms). Wet conditions on hands strip away natural skin resistance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 mt-1">
                <AlertCircle size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200">100% Accidental & Preventable</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Every reviewed study classified the deaths as accidental and fully preventable. Simple interventions like GFCIs, outlet caps, and education would achieve near-perfect survival rates.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-display font-bold text-slate-200 flex items-center gap-2">
            <FileText className="text-indigo-400" size={20} />
            Autopsy Database & Forensic Pathology Literature Reviews
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLINICAL_STUDIES.map((study, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md border border-slate-700">
                      Case File #{idx + 1}
                    </span>
                    <span className="text-xs text-indigo-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {study.period}
                    </span>
                  </div>

                  <h4 className="font-display font-semibold text-lg text-slate-100 leading-snug">
                    {study.title}
                  </h4>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-4">
                    <MapPin size={12} className="text-rose-400" />
                    <span>{study.location}</span>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl text-xs text-slate-400 border border-slate-800/80 mb-4 leading-relaxed">
                    <strong className="text-slate-300">Cohort Size: </strong> {study.sampleSize}
                    <p className="mt-2 text-indigo-300 font-medium">
                      🎯 <strong className="text-indigo-200 font-semibold">Pediatric Focus:</strong> {study.childrenFocus}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 block">Critical Pathology Observations:</span>
                    <ul className="space-y-1.5">
                      {study.keyFindings.map((finding, fIdx) => (
                        <li key={fIdx} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
                          <span className="text-indigo-400 font-bold mt-0.5">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6 animate-fadeIn">
          {/* Audit header summary */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-display font-bold text-slate-200">
                The 10-Point Electrical Safety Home Audit
              </h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Take protective action. Go through each common hazard documented by pathologists, inspect your physical living spaces, and check them off to build a bulletproof safety net for your family.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 min-w-[200px] justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Audit Progress</span>
                <span className="text-2xl font-display font-bold text-indigo-400">{progressPercent}%</span>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-slate-700 flex items-center justify-center relative">
                <span className="text-xs font-bold text-emerald-400">{checkedCount}</span>
                <svg className="absolute inset-0 -rotate-90 w-full h-full">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    className="stroke-emerald-500 fill-none"
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * 16}`}
                    strokeDashoffset={`${2 * Math.PI * 16 * (1 - progressPercent / 100)}`}
                    style={{ transform: 'translate(2px, 2px)' }}
                  />
                </svg>
              </div>
              <button 
                onClick={resetAudit}
                title="Reset checklist"
                className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {TEN_COMMON_CAUSES.map((cause) => {
              const isChecked = !!auditState[cause.number];
              return (
                <div 
                  key={cause.number}
                  className={`border rounded-2xl p-5 transition-all duration-300 ${
                    isChecked 
                      ? 'bg-emerald-950/20 border-emerald-500/30 shadow-sm shadow-emerald-900/10' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleAuditItem(cause.number.toString())}
                      className={`mt-1 h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked 
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                          : 'border-slate-600 hover:border-indigo-400'
                      }`}
                    >
                      {isChecked && <CheckCircle2 size={16} strokeWidth={3} />}
                    </button>

                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Left: Hazard and description */}
                      <div className="lg:col-span-1">
                        <span className="text-xs font-mono text-indigo-400 font-semibold uppercase block">
                          Cause 0{cause.number}
                        </span>
                        <h4 className={`text-base font-display font-bold mt-0.5 ${isChecked ? 'text-slate-300 line-through' : 'text-slate-100'}`}>
                          {cause.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          <strong className="text-rose-400/90 font-medium">Risk Factor:</strong> {cause.danger}
                        </p>
                      </div>

                      {/* Middle: Action items */}
                      <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold tracking-wider flex items-center gap-1 mb-1">
                          <CheckCircle2 size={10} /> Professional Mitigation
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {cause.prevention}
                        </p>
                      </div>

                      {/* Right: How to teach children */}
                      <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold tracking-wider flex items-center gap-1 mb-1">
                          <HelpCircle size={10} /> Explaining to Kids
                        </span>
                        <p className="text-xs text-slate-300 italic leading-relaxed">
                          &ldquo;{cause.tipForKids}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
