import { Hazard, QuizQuestion, ClinicalStudy, SafetyCause } from '../types';

// Import hazard images
import overloadedStripImg from '../assets/images/hazard_overloaded_strip_1783841708737.jpg';
import pokingOutletImg from '../assets/images/hazard_poking_outlet_1783841722288.jpg';

// Bathroom
import tubTabletImg from '../assets/images/hazard_ipad_charging_bath_1784443434288.jpg';
import hairdryerSinkImg from '../assets/images/hazard_hairdryer_splashing_1784443449465.jpg';
import outletSteamImg from '../assets/images/hazard_outlet_steam_1783842923471.jpg';
import heaterShowerImg from '../assets/images/hazard_heater_shower_1783842934157.jpg';
import chargerPuddleImg from '../assets/images/hazard_charger_puddle_1783842943768.jpg';

// Living Room
import rugCordImg from '../assets/images/hazard_rug_cord_1783842953951.jpg';
import heaterDrapesImg from '../assets/images/hazard_heater_drapes_1783842970677.jpg';
import chewedWireImg from '../assets/images/hazard_chewed_wire_1783842980956.jpg';
import laptopBedImg from '../assets/images/hazard_laptop_bed_1784441205012.jpg';
import heaterExtensionImg from '../assets/images/hazard_heater_extension_1784441222780.jpg';
import nailWireImg from '../assets/images/hazard_nail_wire_1784441239728.jpg';
import ironDanglingImg from '../assets/images/hazard_iron_dangling_1784441253899.jpg';

// Kitchen
import frayedToasterImg from '../assets/images/hazard_frayed_toaster_1783842992721.jpg';
import wetSwitchImg from '../assets/images/hazard_wet_switch_1783843002978.jpg';
import diyTapeImg from '../assets/images/hazard_diy_tape_1783843012062.jpg';
import kettleEdgeImg from '../assets/images/hazard_kettle_edge_1783843020774.jpg';
import sparkingMicrowaveImg from '../assets/images/hazard_sparking_microwave_1783843037155.jpg';
import kitchenSinkRadioImg from '../assets/images/hazard_sink_radio_1784440443431.jpg';

// Backyard
import lawnmowerPuddleImg from '../assets/images/hazard_lawnmower_puddle_1783843048293.jpg';
import climbingWiresImg from '../assets/images/hazard_climbing_wires_1783843060901.jpg';
import generatorRainImg from '../assets/images/hazard_generator_rain_1783843072551.jpg';
import poolRadioImg from '../assets/images/hazard_pool_radio_1783843088588.jpg';
import socketDeckImg from '../assets/images/hazard_socket_deck_1783843099804.jpg';
import metalLadderWireImg from '../assets/images/hazard_metal_ladder_1784440460910.jpg';

// Street
import substationBallImg from '../assets/images/hazard_substation_ball_1783843113990.jpg';
import wireFenceImg from '../assets/images/hazard_wire_fence_1783843124053.jpg';
import kiteLinesImg from '../assets/images/hazard_kite_lines_1783843136544.jpg';
import openTransformerImg from '../assets/images/hazard_open_transformer_1783843147314.jpg';
import downedLineCarImg from '../assets/images/hazard_downed_line_car_1783843159210.jpg';
import climbingUtilityPoleImg from '../assets/images/hazard_utility_pole_1784440479272.jpg';

export const ROOMS = [
  { id: 'bathroom', label: 'Bathroom 🛀', description: 'Watch out for water and steam around electricity!' },
  { id: 'livingroom', label: 'Living Room 🛋️', description: 'Be careful with outlets, wires, and multiple appliances!' },
  { id: 'kitchen', label: 'Kitchen 🍳', description: 'Sinks, heavy appliances, and wet hands are a risky mix.' },
  { id: 'backyard', label: 'Backyard 🏡', description: 'Safety in the yard with mowers, pools, and cables.' },
  { id: 'street', label: 'Street & Power 🛣️', description: 'Stay alert around neighborhood power lines, utility boxes, and substations.' }
] as const;

export const HAZARDS: Hazard[] = [
  // --- BATHROOM ---
  {
    id: 'bath_tub_tablet',
    roomId: 'bathroom',
    title: 'iPad Charging near Bathtub',
    shortDescription: 'An iPad plugged into a charger sitting precariously on the slippery edge of a full bathtub.',
    description: 'Electricity and water should never meet! Bringing an electronic device like a tablet or phone that is plugged into a charging cable near the edge of the tub is extremely hazardous. If the device falls into the water, the live current can flow through the water and cause a fatal shock.',
    whyDangerous: 'Charging cables carry electrical current directly to the wet area. Water dramatically lowers the body’s electrical resistance, creating a high-voltage path through your body.',
    clinicalFact: 'Childhood safety studies showed that playing with or using electrical equipment in the bathtub is a leading cause of accidental electrocution in children and adolescents.',
    safetyAction: 'Always keep all electronic devices (phones, tablets, hair dryers) completely away from the bathtub, sink, or shower. Never charge a device while you are in or near water!',
    icon: 'Tablet',
    x: 45,
    y: 65,
    solved: false,
    severity: 'high',
    requiredLevel: 1,
    imageUrl: tubTabletImg
  },
  {
    id: 'bath_hairdryer_sink',
    roomId: 'bathroom',
    title: 'Hairdryer near Splashing Water',
    shortDescription: 'A hairdryer sitting on a wet counter right next to a splashing, running sink with no outlet nearby.',
    description: 'A hairdryer left near a splashing sink is extremely dangerous, even if there are no visible wall outlets or plugs nearby. Water splashing from the sink onto the hairdryer or getting into its heating elements can cause it to short-circuit or shock you when handled with wet hands.',
    whyDangerous: 'Water splashing onto the hairdryer can bridge internal contacts to your skin when touched, delivering a severe electric shock under wet conditions.',
    clinicalFact: 'Accidental shocks are highly preventable. 10 Common Causes of Electric Shocks point out that using electrical devices in wet areas without supervision is extremely high risk.',
    safetyAction: 'Unplug all hair dryers, curlers, or electric shavers when they are not in use, and store them away from water. Never touch them if your hands are wet!',
    icon: 'Wind',
    x: 75,
    y: 42,
    solved: false,
    severity: 'medium',
    requiredLevel: 1,
    imageUrl: hairdryerSinkImg
  },
  {
    id: 'bath_outlet_steam',
    roomId: 'bathroom',
    title: 'Broken Socket Cover with Steam',
    shortDescription: 'A broken electrical socket plate with steam and condensation building up on it.',
    description: 'The steam from hot showers fills the air with tiny water droplets. If an outlet cover is cracked or has exposed wires, this humid moisture can seep inside, leading to short-circuits and dangerous electric leakages.',
    whyDangerous: 'Moisture in the air acts as a tiny bridge for electricity to jump out of the wall. Sockets in bathrooms must have special "GFCI" safety breakers (the ones with Test/Reset buttons) that shut off instantly when water is detected.',
    clinicalFact: 'According to home safety studies, lack of proper grounding or ground fault protection (GFCIs) increases the risk of shock from defective wiring and humid conditions.',
    safetyAction: 'Ask parents to replace cracked socket covers immediately and ensure all bathroom outlets are equipped with working GFCI (Ground Fault Circuit Interrupter) outlets.',
    icon: 'Zap',
    x: 20,
    y: 35,
    solved: false,
    severity: 'medium',
    requiredLevel: 2,
    imageUrl: outletSteamImg
  },
  {
    id: 'bath_heater_shower',
    roomId: 'bathroom',
    title: 'Space Heater Near the Shower',
    shortDescription: 'A portable high-wattage electric space heater placed right next to the glass shower door.',
    description: 'Using portable electric heaters in damp rooms like bathrooms is extremely hazardous. Condensation and steam can settle on the heater’s internal heating coils, creating a conductive moisture bridge that can energize the entire metal outer casing.',
    whyDangerous: 'When steam turns back into water inside the heater, it causes the electrical current to leak outside its insulated path, creating an active shock risk for anyone stepping out of the shower.',
    clinicalFact: 'Clinical reports indicate that moisture-heavy environments account for high rates of severe household shocks when resistive heating devices are used without proper water-isolation safeguards.',
    safetyAction: 'Never use portable space heaters inside bathrooms. Use safe wall-mounted heaters designed specifically for wet areas, and keep them far from any water spray.',
    icon: 'Flame',
    x: 15,
    y: 72,
    solved: false,
    severity: 'high',
    requiredLevel: 3,
    imageUrl: heaterShowerImg
  },
  {
    id: 'bath_unplugged_charger_puddle',
    roomId: 'bathroom',
    title: 'Wet Live USB Cable on Floor',
    shortDescription: 'A USB charging cable plugged into the wall, with the phone end resting in a puddle of water on the floor.',
    description: 'Even if no phone is connected, a USB charging cable plugged into a wall outlet carries a small live electrical current. If the metal contact tip sits in a puddle of water, the water can become slightly electrified, or the current can short out and melt the cable, posing a fire risk.',
    whyDangerous: 'Live chargers sitting in puddles create a wet connection point. Damp skin touching the metal tip or stepping in the puddle can still deliver an unpleasant electrical shock.',
    clinicalFact: 'Child-safety studies show that toddlers and young children are at risk of oral burns or electrical shocks when chewing on live charging cables left plugged in near damp floors.',
    safetyAction: 'Unplug charging cables from the wall as soon as your device is done charging. Never let any charging cable rest on wet countertops or floors!',
    icon: 'Plug2',
    x: 88,
    y: 78,
    solved: false,
    severity: 'medium',
    requiredLevel: 4,
    imageUrl: chargerPuddleImg
  },

  // --- LIVING ROOM ---
  {
    id: 'living_fork_outlet',
    roomId: 'livingroom',
    title: 'Direct Intrusive Contact with Phase Terminal',
    shortDescription: 'A child trying to slide a metal fork or key inside an uncovered power socket.',
    description: 'Wall outlets are designed only for electrical plugs. Metal objects like keys, forks, hairpins, or paperclips are super-conductors. If you poke them into a socket, electricity will instantly shoot up the metal directly into your arm and body!',
    whyDangerous: 'Plugs are coated with rubber or plastic to protect you, but bare metal transfers 100% of the high voltage from the wall directly into your nervous system.',
    clinicalFact: 'A study of childhood electrocution deaths noted that a significant number of accidents happen to curious children aged under 15 when playing with outlets and switches.',
    safetyAction: 'Never, ever poke anything except a standard plug into an outlet. Sockets should be covered with safety caps (childproof plugs) when not in use!',
    icon: 'FlameKindling',
    x: 82,
    y: 75,
    solved: false,
    severity: 'high',
    requiredLevel: 1,
    imageUrl: pokingOutletImg
  },
  {
    id: 'living_overloaded_strip',
    roomId: 'livingroom',
    title: 'Excess Current Loading & Thermal Insulation Overload',
    shortDescription: 'Too many high-power appliances plugged into a single outlet using daisy-chained power strips.',
    description: 'Plugging a heater, TV, game console, lamp, and laptop all into a single socket using multiple adapters causes "Overloading". This forces the wires inside the wall to carry too much electric current, making them super hot and creating a major fire and shock hazard!',
    whyDangerous: 'When too much current passes through a wire, it melts the plastic insulation, exposing live electricity and causing dangerous shocks or house fires.',
    clinicalFact: 'Circuit overloading is one of the leading triggers for house fires and electrical shocks. Using the correct wire sizes and not chaining extension cords are vital rules.',
    safetyAction: 'Plug only one high-power appliance into a single socket. Never connect a power strip into another power strip (daisy-chaining). Unplug things when you are done!',
    icon: 'Layers',
    x: 25,
    y: 80,
    solved: false,
    severity: 'high',
    requiredLevel: 1,
    imageUrl: overloadedStripImg
  },
  {
    id: 'living_rug_cord',
    roomId: 'livingroom',
    title: 'Friction-Degraded Cable Cover Under Rug',
    shortDescription: 'An extension cord crushed under a heavy carpet in a high-traffic hallway.',
    description: 'Hiding an electrical cord under a rug might seem neat, but walking over it crushes the thin copper wires inside. The friction causes the plastic protective layer to crack, leaving live, bare wires exposed under the flammable rug.',
    whyDangerous: 'Trampling on cords destroys their insulation. Also, heat cannot escape from under a rug, causing the cord to overheat, spark, and easily catch fire.',
    clinicalFact: 'Department of forensic research reports show that damaged cable insulation is a major source of electricity leakages, which can cause severe accidental shocks when touched.',
    safetyAction: 'Never run cords under carpets, rugs, or doorways. Keep cords in open spaces where they are visible, cool, and safe from being stepped on.',
    icon: 'EyeOff',
    x: 55,
    y: 88,
    solved: false,
    severity: 'medium',
    requiredLevel: 2,
    imageUrl: rugCordImg
  },
  {
    id: 'living_heater_drapes',
    roomId: 'livingroom',
    title: 'Thermal Convection Hazard Near Combustible Textiles',
    shortDescription: 'A portable space heater humming away right underneath long, blowing fabric curtains.',
    description: 'Space heaters require ample breathing room. Placing them within three feet of flammable objects like curtains, bedding, or sofas can cause the intense radiant heat to spark a sudden, devastating house fire.',
    whyDangerous: 'The combination of high electrical current drawing heat and blowing drapes blocking ventilation is a leading cause of home fires. It can also melt the heater’s own cord if it touches the hot element.',
    clinicalFact: 'Data from fire safety organizations reveals that portable heaters are involved in nearly 74% of all electrical fire-related injuries and deaths in residential homes.',
    safetyAction: 'Always keep space heaters at least three feet away from curtains, furniture, papers, and toys. Turn them off completely when you leave the room!',
    icon: 'FlameKindling',
    x: 12,
    y: 45,
    solved: false,
    severity: 'high',
    requiredLevel: 3,
    imageUrl: heaterDrapesImg
  },
  {
    id: 'living_chewed_wire_couch',
    roomId: 'livingroom',
    title: 'Mechanical Insulation Breakdown from Animal Chewing',
    shortDescription: 'An electrical lamp wire behind the couch that has been chewed by a pet, exposing bare copper.',
    description: 'Pets like dogs, cats, or rabbits love chewing on cords. When they chew through the rubber insulation, they leave the bare copper wire carrying 110V of electricity completely exposed. Touching this wire or sliding the couch against it can cause a spark, a shock, or a fire.',
    whyDangerous: 'Bare copper carries full electrical current. Crushing or touching exposed wire strands creates a high-voltage short circuit.',
    clinicalFact: 'Forensic studies of household hazards emphasize that animal damage to cord insulation is a major hidden contributor to unexpected residential structural fires and shocks.',
    safetyAction: 'Check behind couches and furniture regularly to inspect cords. Use protective cord covers or plastic conduits to prevent pets from chewing on electrical wires.',
    icon: 'Scissors',
    x: 42,
    y: 65,
    solved: false,
    severity: 'high',
    requiredLevel: 4,
    imageUrl: chewedWireImg
  },
  {
    id: 'living_spilled_drink_strip',
    roomId: 'livingroom',
    title: 'Spilled Juice on Power Strip',
    shortDescription: 'A glass of juice spilled right next to or on top of an active power strip on the floor.',
    description: 'When liquid spills onto a live power strip, it seeps into the internal contacts. Since water and sugary drinks are great conductors, this can cause a direct short-circuit, sparking, or fire, and anyone touching the wet spill will get a severe electric shock.',
    whyDangerous: 'Electricity easily travels through liquid. Spilling onto live sockets instantly creates an active shock hazard throughout the wet area.',
    clinicalFact: 'Emergency medical registries record numerous home shock incidents from liquid contact with power strips or extension cords on carpets.',
    safetyAction: 'Keep drinks far away from any electric plugs, outlets, or power strips. If a spill happens, have an adult turn off the main circuit breaker before wiping it up!',
    icon: 'Droplets',
    x: 32,
    y: 75,
    solved: false,
    severity: 'high',
    requiredLevel: 2,
    imageUrl: undefined
  },
  {
    id: 'living_iron_dangling',
    roomId: 'livingroom',
    title: 'Dangling Cord of Hot Iron',
    shortDescription: 'A hot steam iron left on an ironing board with its cord dangling down where kids can pull it.',
    description: 'An electrical cord dangling off a high surface is an accident waiting to happen. If a child, pet, or someone walking by pulls the cord, it brings a heavy, scorching-hot appliance crashing down, risking both severe skin burns and electrical injuries if the wire breaks.',
    whyDangerous: 'Mechanical pulling of active power cords can damage the wall outlet, expose internal live metal contacts, or pull a hot element onto people.',
    clinicalFact: 'Pediatric burn centers report that overhanging or dangling cords from irons, kettles, and heaters are a primary cause of severe thermal contact injuries in toddlers.',
    safetyAction: 'Keep power cords tucked safely back onto the ironing board or table, and never leave a hot iron plugged in unattended!',
    icon: 'Cable',
    x: 70,
    y: 55,
    solved: false,
    severity: 'medium',
    requiredLevel: 2,
    imageUrl: ironDanglingImg
  },
  {
    id: 'living_laptop_bed',
    roomId: 'livingroom',
    title: 'Laptop Charging on Soft Bedding',
    shortDescription: 'A powerful laptop charging while resting directly on a soft pillow or plush blanket.',
    description: 'Laptops have bottom vents to release heat during operation. Placing them on soft bedding, blankets, or pillows blocks these vents, trapping heat. This can cause the battery or charger to overheat, potentially melting the plastic and starting a bedding fire.',
    whyDangerous: 'Blockage of air convection around charging electronics traps intense heat. Lithium batteries can suffer thermal runaway and catch fire if overheated.',
    clinicalFact: 'Fire safety investigations note that charging laptops and phones on soft, combustible bedding or cushions is a frequent cause of bedroom fires.',
    safetyAction: 'Always charge laptops, phones, and tablets on flat, hard, and non-flammable surfaces like a wooden desk or table. Never charge them on beds or couches!',
    icon: 'Layers',
    x: 88,
    y: 38,
    solved: false,
    severity: 'low',
    requiredLevel: 3,
    imageUrl: laptopBedImg
  },
  {
    id: 'living_nail_wire',
    roomId: 'livingroom',
    title: 'Nail Driven Through Cable on Wall',
    shortDescription: 'A metal nail hammered straight through an electrical wire to pin it to the living room wall.',
    description: 'Driving metal nails, staples, or tacks directly through a wire to hold it in place is extremely dangerous. The sharp metal nail can pierce the rubber insulation and touch the live wire inside, turning the nail itself into a live conductor and risking a short circuit or fire.',
    whyDangerous: 'The metal nail penetrates the insulation, making direct contact with the copper core. If you touch the nail, you will receive a powerful shock.',
    clinicalFact: 'Residential electrical fires are often traced back to damaged hidden cabling that was punctured by nails or screws during home decoration.',
    safetyAction: 'Never use nails, tacks, or staples to secure electrical cords to walls. Use plastic self-adhesive cord clips or conduits that do not pierce the protective insulation!',
    icon: 'Zap',
    x: 50,
    y: 40,
    solved: false,
    severity: 'high',
    requiredLevel: 3,
    imageUrl: nailWireImg
  },
  {
    id: 'living_space_heater_extension',
    roomId: 'livingroom',
    title: 'Space Heater on Thin Extension Cord',
    shortDescription: 'A high-powered portable heater plugged into a thin, low-gauge household extension cord.',
    description: 'Portable space heaters draw a huge amount of electrical current. Standard thin extension cords are not designed to handle that much power. The high electrical flow causes the thin cord to overheat, melt its rubber insulation, and spark a major fire.',
    whyDangerous: 'Overloading a thin cord causes a rapid rise in temperature (thermal overload), melting its plastic covering and exposing active wires.',
    clinicalFact: 'Electrical safety statistics show that using inadequate, thin cords with high-wattage space heaters is a leading trigger for winter residential fires.',
    safetyAction: 'Always plug portable heaters directly into a wall outlet. If you must use an extension cord, ensure it is a thick, heavy-duty cord rated specifically for high-wattage appliances!',
    icon: 'FlameKindling',
    x: 20,
    y: 62,
    solved: false,
    severity: 'high',
    requiredLevel: 4,
    imageUrl: heaterExtensionImg
  },

  // --- KITCHEN ---
  {
    id: 'kitchen_frayed_toaster',
    roomId: 'kitchen',
    title: 'Frayed Appliance Cord on the Toaster',
    shortDescription: 'A toaster cord with its outer rubber coating worn out, showing exposed copper wire strands.',
    description: 'The toaster cord has frayed and worn out over time, exposing bare copper wires. If anyone touches this cord while it is plugged in, the electricity will leak directly into their hand, causing a powerful electric shock.',
    whyDangerous: 'The rubber coating around wires is an "insulator" that traps the electricity safely inside. Worn-out, frayed, or taped-up cords lose this defense entirely.',
    clinicalFact: 'Forensic autopsy studies of low-voltage electrocutions reveal that touching damaged cords or charged machinery is the second-most frequent cause of electrical deaths.',
    safetyAction: 'Do not use appliances with damaged, cracked, or frayed cords. Tell an adult to replace the cord or the appliance immediately. Never try to patch them with regular tape!',
    icon: 'Cable',
    x: 35,
    y: 48,
    solved: false,
    severity: 'medium',
    requiredLevel: 1,
    imageUrl: frayedToasterImg
  },
  {
    id: 'kitchen_wet_switch',
    roomId: 'kitchen',
    title: 'Touching Light Switch with Wet Hands',
    shortDescription: 'Someone with wet hands reaching to flip the blender switch or wall light switch.',
    description: 'Switching appliances on or off with dripping wet hands is very dangerous. Water can easily trickle through the tiny cracks around the button or switch cover, reaching the live wires behind it and giving you a nasty shock!',
    whyDangerous: 'Pure skin has some resistance, but water on hands dramatically reduces that barrier, allowing current to flow into the body through the upper extremities.',
    clinicalFact: 'Clinical reports from Diyarbakir, Turkey, found that the upper extremity (hands/arms) was the contact site in 78% of all electrocution deaths due to touching live parts with wet hands.',
    safetyAction: 'Always dry your hands completely with a clean towel before touching any light switches, plugs, or electrical appliances!',
    icon: 'Droplets',
    x: 65,
    y: 40,
    solved: false,
    severity: 'low',
    requiredLevel: 1,
    imageUrl: wetSwitchImg
  },
  {
    id: 'kitchen_diy_tape',
    roomId: 'kitchen',
    title: 'DIY Tape Splice on Blender Wire',
    shortDescription: 'A loose, messy knot of wires wrapped in thin household sticky tape instead of a professional plug.',
    description: 'Doing DIY repairs on appliances without expert skills is extremely hazardous. Using normal sticky tape or plastic wrap to join broken wires leaves gaps where live electricity can spark out, risking shock and fire.',
    whyDangerous: 'Household tape is not rated for electricity. It degrades, slides off when warm, and fails to stop voltage leakage. Only qualified electricians should handle high-voltage fixes.',
    clinicalFact: 'Department of Forensic Pathology stats list "DIY Electrical Work" and "touching charged machine casing" as top causes of industrial and residential electrocutions.',
    safetyAction: 'DIY electrical projects should be left to certified professionals. Keep appliances maintained by experts, and never use makeshift home-made wiring fixes!',
    icon: 'Scissors',
    x: 80,
    y: 52,
    solved: false,
    severity: 'medium',
    requiredLevel: 2,
    imageUrl: diyTapeImg
  },
  {
    id: 'kitchen_kettle_edge',
    roomId: 'kitchen',
    title: 'Overhanging Kettle Cord',
    shortDescription: 'An electric kettle full of boiling water with its power cord hanging off the kitchen counter.',
    description: 'An electric kettle cord hanging over the edge of the kitchen counter is a double hazard. A curious toddler or pet could pull on the cord, spilling scalding water and bringing a live electrical appliance crashing down into puddles on the floor.',
    whyDangerous: 'Pulling on cords causes mechanical damage to outlet terminals and can instantly expose live parts if the cord snaps or is yanked out forcefully.',
    clinicalFact: 'Burn and pediatric units report that overhanging cords from electric kettles and slow cookers are the leading cause of severe scalding injuries in toddlers.',
    safetyAction: 'Keep electric cords pushed back onto countertops, away from the edges. Use cordless kettles or wrap excess cable using cord-management straps.',
    icon: 'HelpCircle',
    x: 15,
    y: 75,
    solved: false,
    severity: 'medium',
    requiredLevel: 3,
    imageUrl: kettleEdgeImg
  },
  {
    id: 'kitchen_sparking_microwave',
    roomId: 'kitchen',
    title: 'Metal Foil Sparking in Microwave',
    shortDescription: 'A container with shiny metal foil left inside the microwave, causing bright electrical sparks.',
    description: 'Microwaves use electromagnetic waves to heat food. Metal surfaces like foil, spoons, or metallic rimmed plates reflect these waves, causing electrons to build up rapidly. This results in heavy electrical sparking (arcing) that can destroy the microwave or start a fire.',
    whyDangerous: 'Electromagnetic energy builds up high voltage currents on thin metal edges, sparking across to the microwave walls and igniting any dry food or plastic nearby.',
    clinicalFact: 'Kitchen fire safety reports note that microwave arcing due to metal insertion is a highly frequent source of fast-spreading kitchen appliance fires.',
    safetyAction: 'Never place metal containers, foil, cutlery, or gold-rimmed plates in the microwave. Only use microwave-safe glass, ceramic, or plastic!',
    icon: 'Sparkles',
    x: 52,
    y: 82,
    solved: false,
    severity: 'high',
    requiredLevel: 4,
    imageUrl: sparkingMicrowaveImg
  },
  {
    id: 'kitchen_fridge_compressor',
    roomId: 'kitchen',
    title: 'Dust-Clogged Refrigerator Vent',
    shortDescription: 'Thick blankets of dust blocking the compressor and heat coils at the back of the refrigerator.',
    description: 'The back of the refrigerator has cooling coils that release heat. If dust, pet hair, or clutter builds up and blocks these coils, the refrigerator has to work twice as hard. This causes the motor and electrical wires to severely overheat, creating a high risk of short-circuits or a house fire.',
    whyDangerous: 'Dust is highly flammable, and when trapped next to an overheated compressor motor, it acts as tinder that can easily ignite a fire behind the kitchen counters.',
    clinicalFact: 'Fire department reports list compressor fan failures and dust build-up as primary sources of behind-counter kitchen appliance fires.',
    safetyAction: 'Ask parents to clean or vacuum the dust from behind and underneath the refrigerator at least once a year, and keep the area free of clutter!',
    icon: 'Layers',
    x: 92,
    y: 30,
    solved: false,
    severity: 'low',
    requiredLevel: 2,
    imageUrl: undefined
  },
  {
    id: 'kitchen_sink_radio',
    roomId: 'kitchen',
    title: 'Plugged-In Radio on Sink Divider',
    shortDescription: 'A radio plugged into the wall and sitting precariously right between two filled water basins of the kitchen sink.',
    description: 'Placing any plugged-in appliance (like a radio, kettle, or phone charger) on a wet sink divider is extremely dangerous. Any splash of water or a slight nudge can send the device into the soapy water, instantly electrifying the water and giving anyone washing dishes a severe or fatal shock.',
    whyDangerous: 'Water lowers the body’s skin resistance, and dishwater containing soap conducts electric currents even faster, completing the path to ground through your body.',
    clinicalFact: 'Water-immersion accidents with electrical devices are among the leading causes of home electrocutions, showing how crucial water-isolation is in kitchens and bathrooms.',
    safetyAction: 'Keep all plugged-in electrical devices far away from the sink. If you want to listen to music while doing dishes, use a safe, battery-powered portable speaker!',
    icon: 'Droplets',
    x: 45,
    y: 55,
    solved: false,
    severity: 'high',
    requiredLevel: 2,
    imageUrl: kitchenSinkRadioImg
  },

  // --- BACKYARD ---
  {
    id: 'back_lawnmower_puddle',
    roomId: 'backyard',
    title: 'Lawnmower Extension Cord in a Puddle',
    shortDescription: 'An outdoor extension cord with damaged insulation lying directly inside a puddle of rainwater.',
    description: 'An electric lawnmower is plugged into a cracked extension cord that has been run across a wet grass puddle. Rainwater enters the cracks in the cord’s rubber, turning the entire puddle of water into a live, electrified pool.',
    whyDangerous: 'Water expands the danger zone! If you step into the electrified puddle, or touch the wet cord, electricity passes from the water, through your feet, and deep into the ground.',
    clinicalFact: 'Forensic reviews highlight that outdoor accidental electrocutions often happen due to damaged outdoor equipment and extension cords being used in wet conditions.',
    safetyAction: 'Check outdoor cords for cracks before plugging them in. Only use cords specifically rated "Outdoor Safe". Never lay or run electrical cords through water or wet grass!',
    icon: 'CloudRain',
    x: 25,
    y: 72,
    solved: false,
    severity: 'high',
    requiredLevel: 1,
    imageUrl: lawnmowerPuddleImg
  },
  {
    id: 'back_climbing_wires',
    roomId: 'backyard',
    title: 'Climbing a Tree Near Overhead Wires',
    shortDescription: 'A child climbing a tall tree where thick overhead power lines pass right through the upper branches.',
    description: 'Climbing trees is fun, but trees near overhead power lines are extremely dangerous. Wires are often uninsulated (bare metal). If the wind blows a branch into a wire, or if you touch a wire while climbing, the electricity will ground itself by flowing directly through you!',
    whyDangerous: 'Power lines carry extremely high voltage (thousands of volts!). This current will cause catastrophic injury or instant death because your body becomes the wire to the ground.',
    clinicalFact: 'A study on adolescent electrocution deaths noted overhead power wires as a common cause of high-voltage accidents for children and teens playing outdoors.',
    safetyAction: 'Look up before you climb! Never climb trees that are close to power lines. If you see a wire touching a tree, stay far away and tell an adult immediately.',
    icon: 'Trees',
    x: 55,
    y: 35,
    solved: false,
    severity: 'high',
    requiredLevel: 1,
    imageUrl: climbingWiresImg
  },
  {
    id: 'back_generator_rain',
    roomId: 'backyard',
    title: 'Uncovered Generator in the Rain',
    shortDescription: 'A portable electrical generator running completely uncovered outdoors while rain is falling.',
    description: 'Portable generators produce highly powerful electricity. Running a generator in wet conditions, rain, or snow can lead to heavy electrocution, short-circuits, and permanent damage to the generator or connected home appliances.',
    whyDangerous: 'Falling rain acts as an instant conductor on hot electrical plugs, terminals, and generator outlets, charging the metal chassis and creating a high-risk shock zone.',
    clinicalFact: 'Post-hurricane or post-storm safety records show that improper generator use, including running them in wet areas or rain, causes a spike in accidental electrocutions.',
    safetyAction: 'Never run a generator in the rain. If outdoor use is necessary during a storm, use a certified generator tent or open canopy that keeps it dry while allowing proper ventilation.',
    icon: 'CloudRain',
    x: 45,
    y: 85,
    solved: false,
    severity: 'high',
    requiredLevel: 3,
    imageUrl: generatorRainImg
  },
  {
    id: 'back_paddling_pool_radio',
    roomId: 'backyard',
    title: 'Portable Radio Near Paddling Pool',
    shortDescription: 'A radio plugged into an extension cord resting on wet grass right next to a paddling pool.',
    description: 'Electrical devices should never be close to pools. Water can splash out or someone could pull the cord, bringing the live electric radio into the pool water and shocking anyone swimming.',
    whyDangerous: 'Water reduces skin resistance, causing any current leakage to flow directly and forcefully through anyone in the pool.',
    clinicalFact: 'Pediatric safety studies caution that water-rich environments like inflatable pools pose serious electrocution threats when cord-connected entertainment devices are used nearby.',
    safetyAction: 'Only use battery-powered speakers or devices near pools. Keep all plugged-in electrical cords at least 10 feet away from water!',
    icon: 'Music',
    x: 72,
    y: 65,
    solved: false,
    severity: 'high',
    requiredLevel: 2,
    imageUrl: poolRadioImg
  },
  {
    id: 'back_socket_wet_deck',
    roomId: 'backyard',
    title: 'Uncovered Outlet on Deck during Rain',
    shortDescription: 'An outdoor electrical socket on the wooden deck without its weatherproof flip-cover closed.',
    description: 'Outdoor sockets must have special spring-loaded flip covers that keep rain and moisture out. If the cover is left open, rain can enter the socket terminals, causing short circuits, sparks, and shock risks when touched.',
    whyDangerous: 'Rainwater builds a conductive path inside the socket, energizing the surface or causing a fire on wooden decks.',
    clinicalFact: 'Home safety data notes that wet-weather exposure of non-weatherproofed external outlets is a common source of electrical ground faults and residential shocks.',
    safetyAction: 'Make sure all outdoor outlets have spring-loaded weatherproof covers, and keep them closed when not in use!',
    icon: 'Zap',
    x: 15,
    y: 58,
    solved: false,
    severity: 'medium',
    requiredLevel: 4,
    imageUrl: socketDeckImg
  },
  {
    id: 'back_metal_ladder_wire',
    roomId: 'backyard',
    title: 'Metal Ladder Near Overhead Wires',
    shortDescription: 'An aluminum ladder leaning near the roofline, dangerously close to overhead power lines.',
    description: 'Aluminum and metal ladders are excellent conductors of electricity. If you lean a metal ladder close to or touching overhead power lines, the electricity will instantly jump to the ladder, shooting straight down to the ground—and through anyone climbing or holding it.',
    whyDangerous: 'Metal ladders provide a perfect path for thousands of volts of electrical current to travel from overhead lines directly into your body and the ground, causing catastrophic shock.',
    clinicalFact: 'Occupational and residential statistics show that contact between metal ladders and overhead power lines is one of the most common causes of high-voltage electrocutions.',
    safetyAction: 'Always look up before placing a ladder! Keep all ladders, especially metal ones, at least 10 feet away from any overhead power lines. Use fiberglass or wooden ladders for outdoor work when possible!',
    icon: 'Trees',
    x: 85,
    y: 45,
    solved: false,
    severity: 'high',
    requiredLevel: 3,
    imageUrl: metalLadderWireImg
  },

  // --- STREET ---
  {
    id: 'street_substation_ball',
    roomId: 'street',
    title: 'Sneaking into an Electrical Substation',
    shortDescription: 'Retrieving a soccer ball from inside the fenced area of an electrical substation.',
    description: 'Electrical substations contain giant transformers and massive high-voltage machinery. These areas are fenced off with barbed wire and "DANGER" signs for a reason. Sneaking inside, even just to grab a lost toy or ball, puts you in close range of invisible electric arcs that can jump through the air!',
    whyDangerous: 'Substations operate at ultra-high voltages. At this power level, electricity can literally jump or "arc" across several feet of air to find a ground (like you), even if you don\'t touch the metal!',
    clinicalFact: 'Academic forensic studies of childhood deaths identify high-voltage substation trespasses as catastrophic, 100% fatal events that can be prevented entirely by fencing and education.',
    safetyAction: 'Never climb over, crawl under, or squeeze through fences of electrical substations or utility boxes. If a ball goes inside, ask an adult to call the power company to get it back safely.',
    icon: 'ShieldAlert',
    x: 82,
    y: 60,
    solved: false,
    severity: 'high',
    requiredLevel: 2,
    imageUrl: substationBallImg
  },
  {
    id: 'street_overhead_wire_fence',
    roomId: 'street',
    title: 'Wire Touching Metal Fence',
    shortDescription: 'A fallen overhead wire resting directly on a long metal chain-link property fence.',
    description: 'If an overhead power line snaps and touches a metal chain-link fence, the entire length of the fence can instantly become highly electrified. Anyone touching the fence, even hundreds of feet away from the wire, can suffer a catastrophic high-voltage electric shock.',
    whyDangerous: 'Metal fences have zero electrical resistance. A high-voltage wire touching any part of the metal turns the entire perimeter into a silent, lethal electric trap.',
    clinicalFact: 'High-voltage safety case studies document multiple fatalities where victims touched boundary fences or gates that had been energized by a fallen utility line miles away.',
    safetyAction: 'Never approach or touch any fence that is in contact with a fallen wire. Stay at least 35 feet away, and call emergency services and the power utility immediately!',
    icon: 'ShieldAlert',
    x: 12,
    y: 40,
    solved: false,
    severity: 'high',
    requiredLevel: 4,
    imageUrl: wireFenceImg
  },
  {
    id: 'street_flying_kite_lines',
    roomId: 'street',
    title: 'Flying a Kite near Power Lines',
    shortDescription: 'A kid flying a large kite with its string tangled in active overhead utility power lines.',
    description: 'Flying kites is lots of fun, but doing it near overhead power lines is extremely risky! Kite strings (especially if wet or containing metal threads) can conduct thousands of volts of electricity from the power lines directly down to the person holding the string.',
    whyDangerous: 'High-voltage lines look harmless, but they carry enough power to cause severe thermal burns and heart stop. A kite string becomes a direct extension cord for lightning-fast high voltage.',
    clinicalFact: 'Pediatric trauma registers indicate that kite and balloon-related power line contacts are a leading seasonal cause of severe high-voltage entry/exit burns in school-aged children.',
    safetyAction: 'Always fly kites, balloons, or model planes in wide, open parks or beaches, completely away from any power lines or utility poles!',
    icon: 'Wind',
    x: 38,
    y: 25,
    solved: false,
    severity: 'high',
    requiredLevel: 1,
    imageUrl: kiteLinesImg
  },
  {
    id: 'street_open_transformer_box',
    roomId: 'street',
    title: 'Open Green Utility Transformer Box',
    shortDescription: 'A green metal electrical transformer box on the sidewalk with its lock broken and doors slightly open, showing wires.',
    description: 'Those green metal boxes in neighborhood lawns are padmount transformers that step down high-voltage power for houses. If one has its lock broken or doors left open, it exposes live 120-volt and 240-volt electrical connections. Touching any component inside can cause massive shocks.',
    whyDangerous: 'The interior of a transformer box has exposed high-energy metal bars. Curiosity or climbing on them can lead to severe shocks and explosions.',
    clinicalFact: 'Utility safety logs indicate that tampering with or sitting on damaged padmount transformers causes preventable, severe contact injuries in residential neighborhoods.',
    safetyAction: 'Never play near, sit on, or open green utility boxes. If you see one that is open, rusted out, or damaged, keep your distance and tell parents to report it to the utility company immediately!',
    icon: 'Zap',
    x: 50,
    y: 72,
    solved: false,
    severity: 'high',
    requiredLevel: 1,
    imageUrl: openTransformerImg
  },
  {
    id: 'street_downed_line_car',
    roomId: 'street',
    title: 'Downed Power Line on a Car',
    shortDescription: 'A high-voltage power line resting on top of a car following a windstorm, with sparks flying.',
    description: 'A snapped overhead power line has fallen directly on top of a parked car. The metal body of the car is now energized, but the rubber tires keep the electricity from reaching the ground. If someone inside the car steps out, their body will complete the circuit, leading to severe electrocution.',
    whyDangerous: 'Touching the ground and the car at the same time creates a path of least resistance for high-voltage electricity, which can be fatal instantly.',
    clinicalFact: 'Rescue training manuals emphasize that the safest place to be if a power line falls on your vehicle is INSIDE the vehicle. You should only exit by jumping clear of the car without touching both at once.',
    safetyAction: 'If a line falls on a vehicle you are in, stay inside and honk for help. If you are outside, stay at least 35 feet away and never approach the car. Call 911 immediately!',
    icon: 'ShieldAlert',
    x: 65,
    y: 62,
    solved: false,
    severity: 'high',
    requiredLevel: 3,
    imageUrl: downedLineCarImg
  },
  {
    id: 'street_water_hydrant_box',
    roomId: 'street',
    title: 'Sprinkler Spraying Utility Box',
    shortDescription: 'A high-powered water sprinkler spraying water directly into a rusted green electrical utility box.',
    description: 'Outdoor green utility boxes (padmount transformers) contain high-voltage electrical equipment. While they are built to be weather-resistant against gentle rain, high-pressure continuous spraying from a sprinkler can enter rusted seams or vents, creating a short circuit, sparking, or rendering the surrounding wet grass highly electrified.',
    whyDangerous: 'Spraying high-pressure water directly into electrical cabinets forces water inside, which bypasses internal insulation and electrifies the enclosure and nearby ground.',
    clinicalFact: 'Utility safety reports warn that lawn maintenance equipment spraying water into damaged or rusted electrical cabinets causes unexpected ground electrification shocks.',
    safetyAction: 'Position all sprinklers so they spray away from electrical utility boxes. If you see a rusted or leaking box, report it to the utility company immediately!',
    icon: 'Droplets',
    x: 28,
    y: 78,
    solved: false,
    severity: 'medium',
    requiredLevel: 2,
    imageUrl: undefined
  },
  {
    id: 'street_mowing_ground_wire',
    roomId: 'street',
    title: 'Digging Near Underground Power Cables',
    shortDescription: 'Someone digging deeply with a metal shovel right next to a yellow underground utility warning flag.',
    description: 'Many power lines are buried underground. Digging with sharp metal shovels or pickaxes without checking can slice through the thick protective insulation of these buried cables, causing an instant underground short-circuit, explosion, and massive electrical shock through the metal tool.',
    whyDangerous: 'A metal shovel blade slicing into a high-voltage buried line creates a direct connection between the live conductor, your hands, and the earth, leading to severe shock.',
    clinicalFact: 'National excavation safety campaigns emphasize that accidental contact with buried power and gas lines is one of the top causes of utility worker and homeowner injuries.',
    safetyAction: 'Before digging in your yard or on the street, always call the local utility helpline (like 811) to mark underground cables with flags or paint so you can dig completely away from them!',
    icon: 'Zap',
    x: 15,
    y: 85,
    solved: false,
    severity: 'high',
    requiredLevel: 3,
    imageUrl: undefined
  },
  {
    id: 'street_truck_snags_line',
    roomId: 'street',
    title: 'Truck Snagging Overhead Power Lines',
    shortDescription: 'A high-top dump truck driving with its bed raised, snagging and pulling low-hanging overhead wires.',
    description: 'Overhead wires crossing streets are placed high up to clear normal traffic. However, vehicles like dump trucks with raised beds, cranes, or tall ladders can snag low-hanging power lines. This can snap the utility poles, bring high-voltage wires crashing down onto the street, or turn the entire truck body into a live electrical threat.',
    whyDangerous: 'Snagging overhead lines can cause them to break and touch the vehicle, electrifying the metal frame and the street, posing an extreme risk of electrocution.',
    clinicalFact: 'Transportation safety logs show that dump trucks and agricultural equipment are the most frequent vehicles involved in overhead power line snagging incidents.',
    safetyAction: 'Drivers and workers must ensure vehicle beds and equipment are fully lowered before moving. If you see a vehicle snagging a line, keep your distance, stay inside if you are in the vehicle, and call 911!',
    icon: 'Cable',
    x: 75,
    y: 35,
    solved: false,
    severity: 'high',
    requiredLevel: 3,
    imageUrl: undefined
  },
  {
    id: 'street_climbing_utility_pole',
    roomId: 'street',
    title: 'Climbing a Utility Pole',
    shortDescription: 'A teenager climbing up the metal steps of an electrical utility pole to grab a tangled sneaker.',
    description: 'Climbing utility poles is extremely dangerous. The wires at the top of these wooden poles carry thousands of volts of raw electricity, and there are active electrical components like transformers and cutouts. Climbing up puts you in close contact with these uninsulated components, risking massive shocks and falling from high up.',
    whyDangerous: 'High-voltage components at the top of utility poles are completely uninsulated. Coming anywhere near them can cause electricity to arc through the air, causing fatal shocks.',
    clinicalFact: 'Trauma databases list falls and high-voltage electrocutions from utility poles as extremely severe injuries that almost always result in lifelong damage or death.',
    safetyAction: 'Never climb utility poles or towers. If you see a sneaker, toy, or balloon tangled in wires, tell an adult to contact the electrical utility company to retrieve it safely!',
    icon: 'ShieldAlert',
    x: 92,
    y: 45,
    solved: false,
    severity: 'high',
    requiredLevel: 4,
    imageUrl: climbingUtilityPoleImg
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Why is it extremely dangerous to charge your phone or use a tablet while taking a bath?',
    options: [
      'The device might get water-damaged and stop working.',
      'Water conducts electricity, and if the plugged-in device falls in, it can deliver a fatal electric shock.',
      'The battery will charge much slower in humid rooms.',
      'The screen might fog up from the bathroom steam.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Water is an excellent conductor of electricity, and water lowers your body\'s natural electrical resistance. A plugged-in device falling into water creates a direct path for dangerous high-voltage current to travel through your body.'
  },
  {
    id: 'q2',
    question: 'You are helping your parents tidy up, and you notice an extension cord running underneath a heavy hallway rug. What should you do?',
    options: [
      'Nothing, it keeps the room looking nice and tidy.',
      'Stomp on it to make sure it lies completely flat.',
      'Tell an adult that running cords under rugs is a hazard because walking over them damages wires, trapping heat and risking fires.',
      'Unplug the cord and hide it behind the sofa so nobody notices.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Crushing wires under heavy walking paths cracks their insulation, exposing live wires. Also, rugs trap heat, which can cause the wire to melt, spark, and start a fire.'
  },
  {
    id: 'q3',
    question: 'Your hand is wet after washing dishes, and you want to turn on the kitchen blender. What is the safest first step?',
    options: [
      'Turn it on quickly with just your pinky finger.',
      'Blow on your hands for three seconds, then flip the switch.',
      'Dry your hands completely with a clean towel before touching any switch, plug, or electrical appliance.',
      'Ask a younger sibling to turn it on for you instead.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Wet skin lets electric current enter your body much easier. Forensic studies show that most accidental shocks occur through the hands/arms (upper extremities) due to touching live switches or plugs with wet hands.'
  },
  {
    id: 'q4',
    question: 'While playing in the garden, your toy airplane or soccer ball lands inside a fenced area with "Danger: High Voltage" signs. What should you do?',
    options: [
      'Carefully climb over the fence, grab it quickly, and jump back.',
      'Poke a long wooden stick through the fence to try and drag it out.',
      'Tell an adult immediately, who can contact the utility company. Never enter a substation fence.',
      'Throw rocks at it to see if it will slide closer to the fence.'
    ],
    correctAnswerIndex: 2,
    explanation: 'High-voltage substations can create "electric arcs" where electricity jumps right through the air without contact. Fences are locked to protect lives; only trained, equipped utility workers should ever enter.'
  },
  {
    id: 'q5',
    question: 'What is the purpose of the special buttons labeled "TEST" and "RESET" on outlets found in bathrooms and kitchens?',
    options: [
      'They are buttons to play radio or music.',
      'They turn on a tiny heater to warm up the room.',
      'They are GFCI safety devices that instantly cut off electricity if they detect water or an electrical leak, saving lives.',
      'They reset your home Wi-Fi connection.'
    ],
    correctAnswerIndex: 2,
    explanation: 'GFCI (Ground Fault Circuit Interrupter) outlets monitor electricity flow. If water or a person starts drawing electrical current away, it trips in milliseconds, cutting power before a lethal shock can occur.'
  }
];

export const CLINICAL_STUDIES: ClinicalStudy[] = [
  {
    title: 'Death due to electrocution in childhood and early adolescence',
    location: 'Global pediatric review (10 months to 15 years)',
    period: 'Forensic Pediatric Case Study',
    sampleSize: '16 accidental cases identified (mean age 8.0 years)',
    childrenFocus: 'Highlights that 100% of cases were accidental, occurring while children were playing near faulty equipment at home or school, climbing near wires, or in bathrooms.',
    keyFindings: [
      'Male-to-Female Ratio of 5:3, indicating higher risk among active, playing boys.',
      'Major causes: Electrical appliances used in the bathtub or shower.',
      'Accidental contacts with damaged outdoor electrical wires/lawn equipment.',
      'Trespassing into high-voltage electricity substations and climbing near overhead lines.'
    ]
  },
  {
    title: 'Low-Voltage Electrocution Mortality Review',
    location: 'Guangdong, China (Department of Forensic Pathology)',
    period: '2001 - 2010 (10-Year Study)',
    sampleSize: '71 identified low-voltage cases out of 3,370 autopsies',
    childrenFocus: 'Analyzed residential and factory risks. Demonstrates that low voltage (normal household outlet voltage) is fully capable of causing fatal cardiac arrest.',
    keyFindings: [
      '87.33% of victims were male; average age was 31.77 years (females averaged 22.63 years).',
      'Most electrocutions occurred due to touching active electric wires (38.02%).',
      'Second leading cause was touching a charged metal appliance casing (28.17%) due to grounding failure.',
      'Highlights the lack of functional safety breakers or proper grounding in low-voltage circuits.'
    ]
  },
  {
    title: 'Retrospective Study of Fatal Electrocution',
    location: 'Western Maharashtra, India (Pravara Rural Hospital)',
    period: 'July 2004 - June 2014 (10-Year Study)',
    sampleSize: '53 fatal cases, representing 2.31% of all autopsies',
    childrenFocus: 'Strong proof that youth and children must be saved. Shows extreme vulnerability of the 11-30 age group in rural/agricultural regions.',
    keyFindings: [
      '100% of the investigated electrocution deaths were accidental in nature.',
      '79.25% of victims were males, with the majority belonging to the 11-30 age group.',
      'Most incidents occurred during humid monsoon seasons, when water logged ground lowers electrical resistance.',
      'Points out that lack of basic electrical safety knowledge is the root cause of these tragedies.'
    ]
  },
  {
    title: 'Electrocution-Related Mortality Review',
    location: 'Diyarbakir, Turkey',
    period: '1996 - 2002 (7-Year Study)',
    sampleSize: '123 accidental electrocution cases',
    childrenFocus: 'Demonstrates the critical importance of keeping hands dry and insulating cords.',
    keyFindings: [
      '100% of cases were accidental, showing they were completely preventable with safety measures.',
      'In 96 out of 123 deaths (78%), the upper extremity (hands/arms) was the primary electrical contact point.',
      'Highlights that hand contact with faulty switches, cords, and wet appliances is the chief mechanism of injury.'
    ]
  }
];

export const TEN_COMMON_CAUSES: SafetyCause[] = [
  {
    number: 1,
    title: 'Faulty Electrical Appliances',
    danger: 'Frayed cords, exposed wiring, and broken plugs leak live voltage onto device shells.',
    prevention: 'Maintain appliances, check cords for damage, and unplug devices not in use.',
    tipForKids: 'If an appliance’s wire looks cracked, fuzzy, or has wire hair poking out, tell an adult immediately!'
  },
  {
    number: 2,
    title: 'Overloaded Circuits',
    danger: 'Plugging too many devices into one socket overloads wires, melting plastic and causing fire.',
    prevention: 'Only plug necessary devices into a socket. Avoid daisy-chaining multiple adapters.',
    tipForKids: 'Do not plug power strips into other power strips. It makes the wall outlet "over-eating" and sick!'
  },
  {
    number: 3,
    title: 'Wet & Humid Conditions',
    danger: 'Water lowers electrical resistance. Running cords through wet grass or humid bathrooms leads to heavy shocks.',
    prevention: 'Check outdoor cords for damage. Only use certified moisture-rated wiring outdoors.',
    tipForKids: 'Never use radios, tablets, or hair dryers in the bathroom or while wet. Keep toys away from puddles!'
  },
  {
    number: 4,
    title: 'Damaged & Old Wiring',
    danger: 'Over time, electrical insulation wears down, leaking active electricity inside walls.',
    prevention: 'Inspect home wires regularly for insulation breaks or cracking.',
    tipForKids: 'Tell your parents if you see cords that feel hot to the touch or make weird buzzing noises!'
  },
  {
    number: 5,
    title: 'Misuse of Extension Cords',
    danger: 'Extension cords are temporary and not built to handle heavy power loads like refrigerators or heaters.',
    prevention: 'Use correctly rated extension cords for temporary tasks only, never as permanent household wires.',
    tipForKids: 'Extension cords are not permanent roads! Keep them clear of walkways and don\'t step on them.'
  },
  {
    number: 6,
    title: 'Risky DIY Electrical Work',
    danger: 'Fixing outlets, switches, or wiring without training leads to incorrect wiring, fire, and shock hazards.',
    prevention: 'Always entrust electrical repairs and installations to licensed professionals.',
    tipForKids: 'Electricity is invisible and powerful. Never try to build or fix electrical things without a pro!'
  },
  {
    number: 7,
    title: 'Lightning Strikes',
    danger: 'Lightning strikes on exposed wiring trigger immense power surges, blowing up appliances and shocking users.',
    prevention: 'Install whole-home surge protectors and unplug expensive electronics during severe thunderstorms.',
    tipForKids: 'If there is a thunderstorm, unplug gaming consoles and stay away from metal and wired devices!'
  },
  {
    number: 8,
    title: 'Improper Grounding',
    danger: 'Without proper ground wires or GFCIs, a failing appliance will electrocute anyone who touches its frame.',
    prevention: 'Ensure home systems are grounded. Install GFCI safety breakers in bathrooms, kitchens, and yards.',
    tipForKids: 'Look for the "Test" and "Reset" buttons on bathroom sockets. Those are safety guards protecting you!'
  },
  {
    number: 9,
    title: 'Human Error & Neglect',
    danger: 'Forgetting to switch off breakers during maintenance, or leaving loose cords plugged in.',
    prevention: 'Turn off switches before working. Schedule regular inspections for corrosion or loose plugs.',
    tipForKids: 'Always pull the plug from the thick plastic base, never yank the thin cable cord!'
  },
  {
    number: 10,
    title: 'Kids Playing with Outlets',
    danger: 'Inserting small toys, metal objects, or fingers into active power sockets.',
    prevention: 'Teach electrical safety early. Install safety covers on all unused electrical outlets.',
    tipForKids: 'Power outlets are NOT toy boxes. Only plugs belong in outlets. Treat them like sleepy, powerful bees!'
  }
];
