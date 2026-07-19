import React, { useState, useEffect } from 'react';
import { ROOMS, HAZARDS } from './data/safetyData';
import { Hazard, RoomId } from './types';
import { AgeGroup, getAdaptedHazard, getAgeGroupName, getWelcomeModalDetails } from './utils/ageAdapter';
import { 
  Zap, 
  Award, 
  RotateCcw, 
  HelpCircle, 
  TrendingUp, 
  Trophy,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Target
} from 'lucide-react';
import RoomView from './components/RoomView';
import HazardModal from './components/HazardModal';
import { playFanfareSound, playSuccessSound } from './utils/audio';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Core state
  const [activeRoomId, setActiveRoomId] = useState<RoomId>('bathroom');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('ranger');
  const [hazards, setHazards] = useState<Hazard[]>(HAZARDS);
  const [score, setScore] = useState<number>(0);
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Progressive Level Up states
  const [showLevelUpModal, setShowLevelUpModal] = useState<boolean>(false);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const welcomeSeen = localStorage.getItem('electrical_hazards_welcome_seen');
    if (!welcomeSeen) {
      setShowWelcomeModal(true);
    }

    const savedAgeGroup = localStorage.getItem('electrical_hazards_age_group');
    if (savedAgeGroup) {
      setAgeGroup(savedAgeGroup as AgeGroup);
    }

    const savedHazards = localStorage.getItem('electrical_hazards_state');
    const savedScore = localStorage.getItem('electrical_hazards_score');
    const savedBadges = localStorage.getItem('electrical_hazards_badges');

    if (savedHazards) {
      try {
        const parsed = JSON.parse(savedHazards);
        // Merge with static HAZARDS to support any new hazards we added (schema evolution)
        const mergedHazards = HAZARDS.map(staticH => {
          const savedH = parsed.find((ph: any) => ph.id === staticH.id);
          return {
            ...staticH,
            solved: savedH ? savedH.solved : false
          };
        });
        setHazards(mergedHazards);
        
        ROOMS.forEach(room => {
          const key = `electrical_hazards_level_${room.id}`;
          if (!localStorage.getItem(key)) {
            const roomHazards = mergedHazards.filter(h => h.roomId === room.id);
            const solvedInRoom = roomHazards.filter(h => h.solved).length;
            const level = solvedInRoom >= 4 ? 4 : solvedInRoom === 3 ? 3 : solvedInRoom === 2 ? 2 : 1;
            localStorage.setItem(key, level.toString());
          }
        });
      } catch (e) {
        console.error(e);
        setHazards(HAZARDS);
      }
    } else {
      setHazards(HAZARDS);
      ROOMS.forEach(room => {
        localStorage.setItem(`electrical_hazards_level_${room.id}`, '1');
      });
    }

    if (savedScore) {
      setScore(Number(savedScore));
    }
    if (savedBadges) {
      try {
        setUnlockedBadges(JSON.parse(savedBadges));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync state to localStorage
  const saveState = (updatedHazards: Hazard[], updatedScore: number, updatedBadges: string[]) => {
    localStorage.setItem('electrical_hazards_state', JSON.stringify(updatedHazards));
    localStorage.setItem('electrical_hazards_score', updatedScore.toString());
    localStorage.setItem('electrical_hazards_badges', JSON.stringify(updatedBadges));
  };

  const handleSolveHazard = (id: string) => {
    const updatedHazards = hazards.map(h => {
      if (h.id === id) {
        return { ...h, solved: true };
      }
      return h;
    });

    // Award 100 points per hazard solved
    const newScore = score + 100;
    setScore(newScore);
    setHazards(updatedHazards);
    playSuccessSound();

    // Check if the current room is now fully solved (all 5 hazards)
    const currentRoomHazards = updatedHazards.filter(h => h.roomId === activeRoomId);
    const solvedInRoom = currentRoomHazards.filter(h => h.solved);
    const roomBadgeName = `${activeRoomId.charAt(0).toUpperCase() + activeRoomId.slice(1)} Badge`;

    let updatedBadges = [...unlockedBadges];
    if (solvedInRoom.length === currentRoomHazards.length && !unlockedBadges.includes(roomBadgeName)) {
      updatedBadges.push(roomBadgeName);
      setUnlockedBadges(updatedBadges);
      playFanfareSound();
      
      // Trigger short celebration alert
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }

    // Check if ALL 25 hazards in the entire house are solved
    const totalSolved = updatedHazards.filter(h => h.solved).length;
    const masterBadge = 'Master Safety Ranger';
    if (totalSolved === updatedHazards.length && !updatedBadges.includes(masterBadge)) {
      updatedBadges.push(masterBadge);
      setUnlockedBadges(updatedBadges);
      playFanfareSound();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    saveState(updatedHazards, newScore, updatedBadges);
  };

  const handleUnsolveHazard = (id: string) => {
    const updatedHazards = hazards.map(h => {
      if (h.id === id) {
        return { ...h, solved: false };
      }
      return h;
    });

    const solvedCount = updatedHazards.filter(h => h.solved).length;
    const newScore = solvedCount * 100;
    setScore(newScore);
    setHazards(updatedHazards);

    let updatedBadges = [...unlockedBadges];
    const roomBadgeName = `${activeRoomId.charAt(0).toUpperCase() + activeRoomId.slice(1)} Badge`;
    
    const currentRoomHazards = updatedHazards.filter(h => h.roomId === activeRoomId);
    const solvedInRoom = currentRoomHazards.filter(h => h.solved);
    
    if (solvedInRoom.length < currentRoomHazards.length && updatedBadges.includes(roomBadgeName)) {
      updatedBadges = updatedBadges.filter(b => b !== roomBadgeName);
      setUnlockedBadges(updatedBadges);
    }

    const masterBadge = 'Master Safety Ranger';
    if (solvedCount < updatedHazards.length && updatedBadges.includes(masterBadge)) {
      updatedBadges = updatedBadges.filter(b => b !== masterBadge);
      setUnlockedBadges(updatedBadges);
    }

    saveState(updatedHazards, newScore, updatedBadges);
  };

  const resetGame = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    const resetHazards = HAZARDS.map(h => ({ ...h, solved: false }));
    setHazards(resetHazards);
    setScore(0);
    setUnlockedBadges([]);
    setSelectedHazard(null);
    localStorage.removeItem('electrical_hazards_state');
    localStorage.removeItem('electrical_hazards_score');
    localStorage.removeItem('electrical_hazards_badges');
    localStorage.removeItem('electrical_hazards_welcome_seen');
    ROOMS.forEach(room => {
      localStorage.removeItem(`electrical_hazards_level_${room.id}`);
    });
    setShowWelcomeModal(true);
    setShowResetConfirm(false);
  };

  const totalHazardsCount = hazards.length;
  const solvedCount = hazards.filter(h => h.solved).length;
  const progressPercent = Math.round((solvedCount / totalHazardsCount) * 100);

  // Helper to determine active level of a given room
  const getRoomLevel = (roomId: string, currentHazards: Hazard[]) => {
    const roomHazards = currentHazards.filter(h => h.roomId === roomId);
    const solvedInRoom = roomHazards.filter(h => h.solved).length;
    if (solvedInRoom >= 4) return 4;
    if (solvedInRoom === 3) return 3;
    if (solvedInRoom === 2) return 2;
    return 1;
  };

  // Filter hazards active for the level each room is currently at
  const activeHazards = hazards.filter(h => {
    const rLvl = getRoomLevel(h.roomId, hazards);
    return !h.requiredLevel || h.requiredLevel <= rLvl;
  });

  const activeRoomLevel = getRoomLevel(activeRoomId, hazards);
  const activeRoomHazards = hazards.filter(h => h.roomId === activeRoomId);
  const activeRoomSolvedCount = activeRoomHazards.filter(h => h.solved).length;

  const roomNames: { [key: string]: string } = {
    bathroom: "Bathroom",
    livingroom: "Living Room",
    kitchen: "Kitchen",
    backyard: "Backyard",
    street: "Street & Power"
  };
  const activeRoomName = roomNames[activeRoomId] || activeRoomId;

  let levelTitle = "Novice Inspector";
  let levelIcon = "🛡️";
  const levelProgress = Math.round((activeRoomSolvedCount / 5) * 100);
  let levelStatusText = "";

  if (ageGroup === 'junior') {
    if (activeRoomLevel === 4) {
      levelTitle = "Electric Safety Champ";
      levelIcon = "🏆";
      levelStatusText = activeRoomSolvedCount === 5 
        ? `Super Star! All 5 items are safe now in the ${activeRoomName}!` 
        : "Found the hidden safe items! Can you spot the last one?";
    } else if (activeRoomLevel === 3) {
      levelTitle = "Water Shield Hero";
      levelIcon = "🌟";
      levelStatusText = `Hero status! Solve the next tricky danger spot in the ${activeRoomName}!`;
    } else if (activeRoomLevel === 2) {
      levelTitle = "Ranger Helper";
      levelIcon = "⚔️";
      levelStatusText = `Helper status! Another water or wire item is active in the ${activeRoomName}!`;
    } else {
      levelTitle = "Junior Rookie";
      levelIcon = "🛡️";
      levelStatusText = `Look around the ${activeRoomName}! Click the danger spots to make them safe.`;
    }
  } else if (ageGroup === 'advanced') {
    if (activeRoomLevel === 4) {
      levelTitle = "Chief Safety Officer";
      levelIcon = "🏆";
      levelStatusText = activeRoomSolvedCount === 5 
        ? `Compliance Verified: Critical hazards mitigated in the ${activeRoomName}!` 
        : "Advanced fault active. Investigate conductive pathways for the final issue.";
    } else if (activeRoomLevel === 3) {
      levelTitle = "Forensic Engineer";
      levelIcon = "🌟";
      levelStatusText = `Analyzing dialectic degradation. Locate high-resistance anomalies in the ${activeRoomName}!`;
    } else if (activeRoomLevel === 2) {
      levelTitle = "Compliance Officer";
      levelIcon = "⚔️";
      levelStatusText = `Verifying thermal loading conditions. Inspect medium-level hazards in the ${activeRoomName}!`;
    } else {
      levelTitle = "Risk Analyst";
      levelIcon = "🛡️";
      levelStatusText = `Evaluating standard residential circuits in the ${activeRoomName}. Identify grounding faults.`;
    }
  } else {
    // Standard Ranger (9-12)
    if (activeRoomLevel === 4) {
      levelTitle = "Elite Safety Legend";
      levelIcon = "🏆";
      levelStatusText = activeRoomSolvedCount === 5 
        ? `Spectacular! All 5 hazards resolved in the ${activeRoomName}!` 
        : "Expert problem active! Search the room for the final hazard.";
    } else if (activeRoomLevel === 3) {
      levelTitle = "Senior Inspector";
      levelIcon = "🌟";
      levelStatusText = `High-voltage expert. A hard hazard is active in the ${activeRoomName}!`;
    } else if (activeRoomLevel === 2) {
      levelTitle = "Apprentice Ranger";
      levelIcon = "⚔️";
      levelStatusText = `Apprentice status active! A medium hazard is active in the ${activeRoomName}!`;
    } else {
      levelTitle = "Novice Inspector";
      levelIcon = "🛡️";
      levelStatusText = `Scan the ${activeRoomName}! Find basic hazards to unlock harder problems.`;
    }
  }

  const getNextRankLabel = () => {
    if (activeRoomSolvedCount < 2) return `${activeRoomSolvedCount} / 2 Solved`;
    if (activeRoomSolvedCount === 2) return `${activeRoomSolvedCount} / 3 Solved`;
    if (activeRoomSolvedCount === 3) return `${activeRoomSolvedCount} / 4 Solved`;
    if (activeRoomSolvedCount === 4) return `${activeRoomSolvedCount} / 5 Solved`;
    return "FULLY COMPLETED";
  };

  // Monitor for room-specific level promotions to show level up modal
  useEffect(() => {
    const roomHazards = hazards.filter(h => h.roomId === activeRoomId);
    const solvedInRoom = roomHazards.filter(h => h.solved).length;
    if (solvedInRoom === 0) return; // Ignore startup or resets

    const key = `electrical_hazards_level_${activeRoomId}`;
    const lastSeenLevelStr = localStorage.getItem(key);
    const lastSeenLevel = lastSeenLevelStr ? parseInt(lastSeenLevelStr, 10) : 1;

    if (activeRoomLevel > lastSeenLevel) {
      setUnlockedLevel(activeRoomLevel);
      setShowLevelUpModal(true);
      playFanfareSound();
      localStorage.setItem(key, activeRoomLevel.toString());
    } else if (activeRoomLevel < lastSeenLevel) {
      localStorage.setItem(key, activeRoomLevel.toString());
    }
  }, [activeRoomLevel, activeRoomId]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30">
      
      {/* Visual celebration overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px]"
          >
            <div className="text-center p-8 bg-slate-900/90 border border-indigo-500/30 rounded-3xl shadow-2xl max-w-sm animate-bounce">
              <Trophy size={64} className="text-amber-400 mx-auto" />
              <h3 className="text-2xl font-display font-black mt-4 text-slate-100">Congratulations!</h3>
              <p className="text-sm text-indigo-300 mt-2">
                You unlocked a new Safety Badge! Keep exploring to protect your family!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-8 flex-1">
        
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 shadow-inner">
              <Zap size={28} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight text-white flex items-center gap-2">
                VoltSafe Kids Academy
              </h1>
              <p className="text-xs md:text-sm text-slate-400 font-medium">
                Household Electrical Safety Exploration & Forensic Research
              </p>
            </div>
          </div>

          {/* Mode switchers & Objective */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setShowWelcomeModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs md:text-sm font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 active:bg-indigo-500/30 border border-indigo-500/30 rounded-2xl transition-all cursor-pointer shadow-sm shadow-indigo-500/5 hover:-translate-y-0.5 duration-150"
            >
              <Target size={16} className="text-indigo-400" />
              Mission Objective
            </button>
          </div>
        </header>

      {/* Age Appropriateness Mode Segmented Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-3xl border border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <div>
            <h4 className="text-sm font-bold text-slate-200">Select Age Level:</h4>
            <p className="text-[11px] text-slate-400">Adapts content, physics depth, and voiceover for different age groups.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-850 w-full sm:w-auto">
          {(['junior', 'ranger', 'advanced'] as AgeGroup[]).map((group) => {
            const label = group === 'junior' ? 'Junior (4-8) 👶' : group === 'ranger' ? 'Ranger (9-12) 🎯' : 'Advanced (13-18) 🔬';
            const isSelected = ageGroup === group;
            return (
              <button
                key={group}
                onClick={() => {
                  setAgeGroup(group);
                  localStorage.setItem('electrical_hazards_age_group', group);
                }}
                className={`flex-1 sm:flex-initial text-center px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Views */}
      <main className="min-h-[50vh]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar: Game Stats & Badges */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Score, Progress & Level Progression Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden flex flex-col gap-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Rank Header */}
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="text-3xl bg-slate-950 p-2.5 rounded-2xl border border-slate-800 shadow-inner flex items-center justify-center select-none">
                  {levelIcon}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-indigo-400 font-extrabold tracking-widest block">
                    {activeRoomName} • Level {activeRoomLevel}
                  </span>
                  <h3 className="text-base font-display font-black text-white leading-tight">
                    {levelTitle}
                  </h3>
                </div>
              </div>

              {/* Level Progression Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-1.5">
                  <span className="text-slate-400 font-medium">Room Progress</span>
                  <span className="font-mono text-indigo-300 font-bold">
                    {getNextRankLabel()}
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 p-[1px]">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1.5 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-950">
                  🎯 <strong className="text-indigo-300">Status:</strong> {levelStatusText}
                </p>
              </div>

              {/* Score & Global Stats */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-850">
                <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-950">
                  <span className="text-[9px] uppercase font-mono text-slate-500 block">Ranger Score</span>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-2xl font-display font-black text-white">{score}</span>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold">PTS</span>
                  </div>
                </div>
                <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-950">
                  <span className="text-[9px] uppercase font-mono text-slate-500 block">Total Solved</span>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-2xl font-display font-black text-white">{solvedCount}</span>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold">/ {totalHazardsCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Case */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-3 mb-4">
                <Award size={16} className="text-indigo-400" />
                My Safety Badges
              </h3>

              <div className="space-y-3">
                {/* Badge List */}
                {[
                  { name: 'Bathroom Badge', desc: 'Solved water/electricity hazards', emoji: '🛀' },
                  { name: 'Livingroom Badge', desc: 'Solved wire/socket hazards', emoji: '🛋️' },
                  { name: 'Kitchen Badge', desc: 'Solved kitchen appliance hazards', emoji: '🍳' },
                  { name: 'Backyard Badge', desc: 'Solved outdoor/wire hazards', emoji: '🌳' },
                  { name: 'Street Badge', desc: 'Solved street & neighborhood hazards', emoji: '🛣️' },
                  { name: 'Master Safety Ranger', desc: 'Completed all 25 hazards', emoji: '👑' }
                ].map((badge, bIdx) => {
                  const isUnlocked = unlockedBadges.includes(badge.name);
                  return (
                    <div 
                      key={bIdx}
                      className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all ${
                        isUnlocked 
                          ? 'bg-slate-950 border-indigo-500/20 text-slate-100' 
                          : 'bg-slate-950/40 border-slate-900 text-slate-600'
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-lg ${
                        isUnlocked ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-slate-900 border border-slate-900'
                      }`}>
                        {isUnlocked ? badge.emoji : '🔒'}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${isUnlocked ? 'text-slate-200' : 'text-slate-500'}`}>
                          {badge.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {badge.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset Progress */}
            <div className="pt-2 text-center">
              <button
                onClick={resetGame}
                className="text-xs text-slate-500 hover:text-rose-400 font-medium flex items-center gap-1.5 mx-auto transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                Reset Ranger Progress
              </button>
            </div>
          </div>

          {/* Game Board: Interactive Rooms */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Room Selector Tab buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 bg-slate-900 p-2 rounded-2xl border border-slate-800">
              {ROOMS.map((room) => {
                const isRoomActive = activeRoomId === room.id;
                const roomHazards = activeHazards.filter(h => h.roomId === room.id);
                const solvedInRoom = roomHazards.filter(h => h.solved).length;
                const isFullySolved = roomHazards.length > 0 && solvedInRoom === roomHazards.length;

                return (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id as RoomId)}
                    className={`p-3.5 rounded-xl text-left transition-all relative cursor-pointer ${
                      isRoomActive 
                        ? 'bg-slate-950 border border-slate-800 text-white shadow-md' 
                        : 'hover:bg-slate-950/60 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold block">{room.label}</span>
                      {isFullySolved && (
                        <span className="text-xs text-emerald-400 animate-pulse">✓</span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                      {solvedInRoom} of {roomHazards.length} hazards
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Stage Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div>
                <h2 className="text-xl font-display font-black text-white flex items-center gap-2">
                  <span>Room Map:</span>
                  <span className="text-indigo-400 font-medium">
                    {ROOMS.find(r => r.id === activeRoomId)?.label}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {ROOMS.find(r => r.id === activeRoomId)?.description}
                </p>
              </div>

              <RoomView
                roomId={activeRoomId}
                hazards={activeHazards.map(h => getAdaptedHazard(h, ageGroup))}
                onSolveHazard={handleSolveHazard}
                onUnsolveHazard={handleUnsolveHazard}
                onSelectHazard={setSelectedHazard}
              />
            </div>
          </div>

        </div>
      </main>
      </div>

      {/* Pop-up modal details for selected hazard */}
      {selectedHazard && (
        <HazardModal 
          hazard={getAdaptedHazard(selectedHazard, ageGroup)} 
          onClose={() => setSelectedHazard(null)} 
        />
      )}

      {/* Footer credits and information */}
      <footer className="bg-slate-950/80 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold flex items-center justify-center gap-1.5 text-slate-400">
            <ShieldCheck className="text-indigo-500" size={16} />
            Electrical Safety Ranger Game — Pediatric forensic pathology analysis & preventative education.
          </p>
          <p className="text-slate-500 leading-relaxed max-w-2xl mx-auto text-[11px]">
            Created using forensic case studies from Guangdong, China; Maharashtra, India; and Diyarbakir, Turkey. Supported by clinical data on child-adolescent mortality risk groups to promote life-saving preventative practices.
          </p>
        </div>
      </footer>

      {/* Reset Confirmation Dialog */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-sm w-full relative overflow-hidden"
            >
              {/* Decorative light */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center">
                  <AlertTriangle size={24} />
                </div>
                
                <div>
                  <h3 className="text-lg font-display font-black text-white">Reset Ranger Progress?</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    This will clear all your solved hazards, earned safety score, and unlocked badges. You will start fresh as a trainee safety recruit!
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmReset}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-slate-950 font-extrabold text-xs transition-colors shadow-lg shadow-rose-500/10 cursor-pointer"
                  >
                    Yes, Reset Game!
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progressive Level Up Modal */}
      <AnimatePresence>
        {showLevelUpModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              className="bg-slate-900 border-2 border-indigo-500/30 rounded-[36px] p-8 shadow-2xl max-w-md w-full relative overflow-hidden text-center space-y-6"
            >
              {/* Pulsating colorful glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2">
                <motion.div
                  initial={{ rotate: -15, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mx-auto text-7xl select-none"
                >
                  {unlockedLevel === 2 ? '⚔️' : unlockedLevel === 3 ? '🌟' : '🏆'}
                </motion.div>
                <div className="text-xs uppercase font-mono text-indigo-400 font-extrabold tracking-widest pt-2">
                  Room Difficulty Promotion!
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
                  {activeRoomName} Rank: {unlockedLevel === 2 ? 'Apprentice Ranger' : unlockedLevel === 3 ? 'Senior Inspector' : 'Elite Safety Legend'}
                </h2>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-xs text-slate-300 leading-relaxed space-y-3 text-left">
                <p className="font-semibold text-slate-200">
                  ⚡ Warning: A new electrical threat has materialized in the {activeRoomName}!
                </p>
                <p className="text-slate-400">
                  Your safety clearance in the <strong className="text-indigo-400">{activeRoomName}</strong> has increased. A new, higher-voltage hazard has just spawned on your current map. Spot it and solve it to protect your home!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowLevelUpModal(false)}
                  className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5 duration-200"
                >
                  Accept Mission 🚀
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Starting Objective / Onboarding Modal */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
              className="bg-slate-900 border-2 border-indigo-500/30 rounded-[36px] p-6 md:p-8 shadow-2xl max-w-lg w-full relative overflow-hidden my-8 text-slate-100"
            >
              {/* Decorative radial glows */}
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center space-y-4">
                <div className="inline-flex p-3.5 bg-indigo-500/10 text-indigo-400 rounded-3xl border border-indigo-500/20 shadow-inner">
                  <Target size={36} className="animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-indigo-400 font-extrabold tracking-widest block">
                    {getWelcomeModalDetails(ageGroup, activeRoomName).subtitle}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight mt-1">
                    {getWelcomeModalDetails(ageGroup, activeRoomName).title}
                  </h2>
                </div>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {getWelcomeModalDetails(ageGroup, activeRoomName).body}
                </p>
              </div>

              {/* Objectives List */}
              <div className="mt-6 space-y-3">
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 text-left">
                  Mission Protocols:
                </h3>
                
                <div className="space-y-2.5">
                  <div className="flex gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-850 text-left">
                    <span className="text-base select-none mt-0.5">🔍</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Investigate Active Zones</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        Scan the 5 primary locations: <span className="text-indigo-400 font-medium">Bathroom</span>, <span className="text-indigo-400 font-medium">Living Room</span>, <span className="text-indigo-400 font-medium">Kitchen</span>, <span className="text-indigo-400 font-medium">Backyard</span>, and <span className="text-indigo-400 font-medium">Street & Power</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-850 text-left">
                    <span className="text-base select-none mt-0.5">⚡</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Mitigate Electrical Risks</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        Identify active threats—like submerged charger cords, overloaded blocks, and faulty grounding. Resolve them to award <span className="text-emerald-400 font-bold">+100 PTS</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-850 text-left">
                    <span className="text-base select-none mt-0.5">📈</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Progressive Local Spawning</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        Your actions provoke reaction! When you solve basic hazards, tougher and trickier problems will immediately spawn on that active map.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-850 text-left">
                    <span className="text-base select-none mt-0.5">🏅</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Earn Safety Badges</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        Eliminate all 5 hazards in an area to lock down the room and claim its badge. Secure all 5 badges to become a Master Ranger!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  onClick={() => {
                    localStorage.setItem('electrical_hazards_welcome_seen', 'true');
                    setShowWelcomeModal(false);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5 duration-200"
                >
                  Accept Mission & Begin Patrol 🛡️
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
