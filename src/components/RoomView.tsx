import React, { useState } from 'react';
import { Hazard, RoomId } from '../types';
import { 
  playSafeSound, 
  playSuccessSound, 
  playErrorSound 
} from '../utils/audio';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Heart, 
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import generated room background images
import bathroomBg from '../assets/images/bathroom_hazards_bg_1783843741908.jpg';
import livingroomBg from '../assets/images/livingroom_hazards_bg_1783842235047.jpg';
import kitchenBg from '../assets/images/kitchen_hazards_bg_1783844083812.jpg';
import backyardBg from '../assets/images/room_backyard_bg_1783840475192.jpg';
import streetBg from '../assets/images/room_street_bg_1783840485209.jpg';

interface SafeObject {
  id: string;
  name: string;
  emoji: string;
  material: string;
  whySafe: string;
  x: number;
  y: number;
}

const SAFE_OBJECTS: Record<RoomId, SafeObject[]> = {
  bathroom: [
    {
      id: 'bath_duck',
      name: 'Rubber Bath Duck',
      emoji: '🦆',
      material: 'Rubber',
      whySafe: 'Rubber is an insulator. This means electricity cannot easily pass through it, keeping it safe to float in your bath!',
      x: 35,
      y: 78
    },
    {
      id: 'bath_towel',
      name: 'Dry Cotton Towel',
      emoji: '🧼',
      material: 'Dry Cotton',
      whySafe: 'Cotton is a great insulator when dry. It cannot conduct current, making dry towels 100% safe to touch!',
      x: 10,
      y: 50
    }
  ],
  livingroom: [
    {
      id: 'living_table',
      name: 'Wooden Coffee Table',
      emoji: '🪵',
      material: 'Wood',
      whySafe: 'Solid wood does not conduct electricity. Unlike metal forks, it is safe because it is a natural insulator!',
      x: 50,
      y: 65
    },
    {
      id: 'living_pillow',
      name: 'Wool Sofa Cushion',
      emoji: '🧸',
      material: 'Wool Fabric',
      whySafe: 'Wool and soft fabric fibers block electric flow. Hugging this cushion is perfectly safe!',
      x: 15,
      y: 45
    }
  ],
  kitchen: [
    {
      id: 'kitchen_cup',
      name: 'Plastic Water Cup',
      emoji: '🥤',
      material: 'Plastic',
      whySafe: 'Plastic is a super safety insulator. That is why electrical wires are wrapped in a protective layer of plastic!',
      x: 52,
      y: 40
    },
    {
      id: 'kitchen_spoon',
      name: 'Wooden Cooking Spoon',
      emoji: '🥄',
      material: 'Wood',
      whySafe: 'Wood blocks electrical flow. It is always safe to hold a dry wooden spoon in the kitchen!',
      x: 20,
      y: 45
    }
  ],
  backyard: [
    {
      id: 'back_boots',
      name: 'Rubber Rain Boots',
      emoji: '🥾',
      material: 'Rubber',
      whySafe: 'Thick rubber boot soles block electricity from passing into the ground. Rubber keeps electrical workers safe too!',
      x: 40,
      y: 82
    },
    {
      id: 'back_ball',
      name: 'Plastic Soccer Ball',
      emoji: '⚽',
      material: 'Plastic/Synthetic Leather',
      whySafe: 'Since it is made of plastic, it does not conduct electric current. Safe to kick in the open garden!',
      x: 15,
      y: 80
    }
  ],
  street: [
    {
      id: 'street_cone',
      name: 'Rubber Safety Cone',
      emoji: '🚧',
      material: 'Thick Orange Rubber',
      whySafe: 'Rubber is a fantastic insulator that blocks current flow. Traffic cones warn us about utility roadwork zones safely!',
      x: 28,
      y: 84
    },
    {
      id: 'street_broom',
      name: 'Dry Wooden Broom',
      emoji: '🧹',
      material: 'Dry Wood',
      whySafe: 'Dry wood does not conduct electricity. It is safe because wood acts as a natural insulator!',
      x: 75,
      y: 82
    }
  ]
};

interface RoomViewProps {
  roomId: RoomId;
  hazards: Hazard[];
  onSolveHazard: (id: string) => void;
  onSelectHazard: (hazard: Hazard) => void;
}

export default function RoomView({ roomId, hazards, onSolveHazard, onSelectHazard }: RoomViewProps) {
  const [activeInspector, setActiveInspector] = useState<string | null>(null);
  const [inspectorText, setInspectorText] = useState<{
    title: string;
    desc: string;
    isHazard: boolean;
    imageUrl?: string;
    rawHazard?: Hazard;
  } | null>(null);
  const [draggingHazardId, setDraggingHazardId] = useState<string | null>(null);
  const [currentDragDistance, setCurrentDragDistance] = useState<number>(0);

  const DRAG_THRESHOLD = 95; // Pixels to pull out of danger

  const roomHazards = hazards.filter(h => h.roomId === roomId);
  const roomSafeObjects = SAFE_OBJECTS[roomId] || [];

  const handleHazardClick = (hazard: Hazard) => {
    if (hazard.solved) {
      // If solved, show modal and info for review
      onSelectHazard(hazard);
      setActiveInspector(hazard.id);
      setInspectorText({
        title: `✓ Solved: ${hazard.title}`,
        desc: `Great work! This hazard has been moved to safety. ${hazard.shortDescription}`,
        isHazard: true,
        imageUrl: hazard.imageUrl,
        rawHazard: hazard
      });
    } else {
      // If unsolved, just inspect it at the bottom, and instruct the player to drag it!
      setActiveInspector(hazard.id);
      setInspectorText({
        title: `🔒 Unresolved: ${hazard.title}`,
        desc: `${hazard.shortDescription} (Action Required: Drag the warning icon out of the red danger circle to solve it!)`,
        isHazard: true,
        imageUrl: hazard.imageUrl,
        rawHazard: hazard
      });
    }
  };

  const handleHazardDragSuccess = (hazard: Hazard) => {
    onSolveHazard(hazard.id);
    onSelectHazard(hazard);
    setActiveInspector(hazard.id);
    setInspectorText({
      title: `⚡ Hazard Solved: ${hazard.title}!`,
      desc: hazard.shortDescription,
      isHazard: true,
      imageUrl: hazard.imageUrl,
      rawHazard: hazard
    });
  };

  const handleDragStart = (hazardId: string) => {
    setDraggingHazardId(hazardId);
    setCurrentDragDistance(0);
  };

  const handleDrag = (event: any, info: any) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    setCurrentDragDistance(distance);
  };

  const handleDragEnd = (event: any, info: any, hazard: Hazard) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    setDraggingHazardId(null);
    setCurrentDragDistance(0);

    if (distance >= DRAG_THRESHOLD) {
      handleHazardDragSuccess(hazard);
    } else {
      playErrorSound();
    }
  };

  const handleSafeObjectClick = (obj: SafeObject) => {
    playSafeSound();
    setActiveInspector(obj.id);
    setInspectorText({
      title: `${obj.emoji} Safe Object: ${obj.name}`,
      desc: `Material: ${obj.material}. ${obj.whySafe}`,
      isHazard: false
    });
  };

  // Render Room Background Graphic & Furniture using high-quality generated images
  const renderRoomArt = () => {
    switch (roomId) {
      case 'bathroom':
        return (
          <div className="absolute inset-0 bg-slate-950 overflow-hidden select-none">
            <img 
              src={bathroomBg} 
              alt="Bathroom Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-500" 
              referrerPolicy="no-referrer"
            />
            {/* Visual overlay for immersive game feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40 pointer-events-none" />
          </div>
        );

      case 'livingroom':
        return (
          <div className="absolute inset-0 bg-slate-950 overflow-hidden select-none">
            <img 
              src={livingroomBg} 
              alt="Living Room Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-500" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40 pointer-events-none" />
          </div>
        );

      case 'kitchen':
        return (
          <div className="absolute inset-0 bg-slate-950 overflow-hidden select-none">
            <img 
              src={kitchenBg} 
              alt="Kitchen Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-500" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40 pointer-events-none" />
          </div>
        );

      case 'backyard':
        return (
          <div className="absolute inset-0 bg-slate-950 overflow-hidden select-none">
            <img 
              src={backyardBg} 
              alt="Backyard Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-500" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40 pointer-events-none" />
          </div>
        );

      case 'street':
        return (
          <div className="absolute inset-0 bg-slate-950 overflow-hidden select-none">
            <img 
              src={streetBg} 
              alt="Street Infrastructure Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-500" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40 pointer-events-none" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Game Stage Area */}
      <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
        
        {/* Render Background Scene */}
        {renderRoomArt()}

        {/* Dynamic Scan lines / Grid Layer */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />

        {/* Hazard Hotspots (Conductors) */}
        {roomHazards.map((hazard) => {
          const isDraggingThis = draggingHazardId === hazard.id;
          const isOverThreshold = isDraggingThis && currentDragDistance >= DRAG_THRESHOLD;

          return (
            <div
              key={hazard.id}
              style={{ left: `${hazard.x}%`, top: `${hazard.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              {/* Static Danger Zone Outline behind current dragging hazard */}
              {isDraggingThis && (
                <div 
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: DRAG_THRESHOLD * 2,
                    height: DRAG_THRESHOLD * 2,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div 
                    className="w-full h-full rounded-full border-2 border-dashed border-red-500/50 bg-red-500/10 flex items-center justify-center animate-pulse"
                  >
                    <span className="text-[9px] font-display font-black text-red-400 bg-slate-950/90 border border-red-500/30 px-2 py-0.5 rounded shadow-md uppercase tracking-wider">
                      Danger Zone
                    </span>
                  </div>
                </div>
              )}

              {/* Solved state vs. Draggable state */}
              {hazard.solved ? (
                <button
                  onClick={() => handleHazardClick(hazard)}
                  className="relative group cursor-pointer"
                >
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 bg-emerald-500 border-emerald-400 text-slate-950 flex items-center justify-center shadow-xl transition-all scale-95 hover:scale-105">
                    <CheckCircle2 size={18} strokeWidth={2.5} />
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 text-white text-[11px] font-semibold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    Solved ✓ (Review)
                  </div>
                </button>
              ) : (
                <motion.button
                  drag
                  dragSnapToOrigin={true}
                  dragMomentum={false}
                  dragElastic={0.15}
                  onDragStart={() => handleDragStart(hazard.id)}
                  onDrag={handleDrag}
                  onDragEnd={(e, info) => handleDragEnd(e, info, hazard)}
                  onClick={() => handleHazardClick(hazard)}
                  className="relative group cursor-grab active:cursor-grabbing focus:outline-none"
                >
                  {/* Glowing background circles */}
                  <span className={`absolute inset-0 rounded-full scale-150 transition-colors duration-200 ${
                    isOverThreshold 
                      ? 'bg-emerald-500/40 animate-pulse' 
                      : 'bg-amber-500/30 animate-ping group-hover:bg-amber-400/50'
                  }`} />
                  
                  {/* Warning Icon shape */}
                  <div className={`h-11 w-11 md:h-13 md:w-13 rounded-full border-2 flex items-center justify-center shadow-2xl transition-all duration-200 ${
                    isOverThreshold
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-110 font-bold'
                      : 'bg-amber-500 border-amber-400 text-slate-950 group-hover:scale-115'
                  }`}>
                    <ShieldAlert size={19} className="stroke-[2.5]" />
                  </div>

                  {/* Tooltip helper for kids */}
                  <div className="absolute bottom-13 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl flex flex-col items-center gap-0.5">
                    <span className="text-amber-400 font-extrabold uppercase text-[9px] tracking-wider">Drag to Safety! ↔️</span>
                    <span className="text-slate-300 font-medium text-[10px]">{hazard.title}</span>
                  </div>
                </motion.button>
              )}
            </div>
          );
        })}

        {/* Safe Objects Hotspots (Insulators) */}
        {roomSafeObjects.map((obj) => (
          <button
            key={obj.id}
            onClick={() => handleSafeObjectClick(obj)}
            style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-teal-500/20 scale-125 animate-pulse group-hover:bg-teal-400/30" />
            <div className="h-9 w-9 md:h-11 md:w-11 rounded-xl bg-teal-500/25 border border-teal-400/40 hover:border-teal-400 text-base flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95">
              <span>{obj.emoji}</span>
            </div>
            {/* Tooltip on hover */}
            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              Check {obj.name}
            </div>
          </button>
        ))}

        {/* Help Overlay Hint */}
        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-[10px] md:text-xs text-slate-300 font-medium px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md pointer-events-none">
          <Sparkles className="text-amber-400 animate-pulse" size={12} />
          <span>Drag <strong className="text-amber-400 font-bold">⚠️ Hazards</strong> OUT of the Red Circle, or inspect <strong className="text-teal-400 font-bold">Insulators</strong>!</span>
        </div>
      </div>

      {/* Inspector Detail Box */}
      <AnimatePresence mode="wait">
        {activeInspector && inspectorText ? (
          <motion.div
            key={activeInspector}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden ${
              inspectorText.isHazard 
                ? 'bg-amber-950/10 border-amber-500/30' 
                : 'bg-teal-950/10 border-teal-500/30'
            }`}
          >
            {/* Background design accents */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -z-10 opacity-30 ${
              inspectorText.isHazard ? 'bg-amber-500' : 'bg-teal-500'
            }`} />

            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {inspectorText.imageUrl && (
                <div className="w-full md:w-40 h-28 md:h-auto rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 shrink-0 relative group">
                  <img 
                    src={inspectorText.imageUrl} 
                    alt={inspectorText.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className={`p-1.5 rounded-lg shrink-0 ${
                    inspectorText.isHazard ? 'bg-amber-500/10 text-amber-400' : 'bg-teal-500/10 text-teal-400'
                  }`}>
                    <Info size={18} />
                  </span>
                  <div>
                    <h4 className={`text-sm md:text-base font-display font-black tracking-wide ${
                      inspectorText.isHazard ? 'text-amber-400' : 'text-teal-400'
                    }`}>
                      {inspectorText.title}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {inspectorText.desc}
                    </p>
                  </div>
                </div>

                {/* If it is a hazard, provide a direct CTA button to reveal the case study and full-screen photo */}
                {inspectorText.isHazard && inspectorText.rawHazard && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => inspectorText.rawHazard && onSelectHazard(inspectorText.rawHazard)}
                      className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs font-black px-4 py-1.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Reveal Case Study & Full Photo 📸</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 text-center text-slate-500 italic text-sm">
            🔦 Point-and-click objects inside the room to scan for electrical safety features.
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
