import { Hazard, QuizQuestion } from '../types';

export type AgeGroup = 'junior' | 'ranger' | 'advanced';

// Junior adaptation helper to avoid scary clinical autopsy terms for 4-8 year olds.
// Advanced adaptation to introduce advanced physics, Ohm's law, GFCIs, and body resistance.
export function getAdaptedHazard(hazard: Hazard, ageGroup: AgeGroup): Hazard {
  if (ageGroup === 'ranger') {
    return hazard; // Returns standard high-quality balanced data
  }

  const adapted = { ...hazard };

  if (ageGroup === 'junior') {
    // ------------------------------------------
    // JUNIOR MODE (Ages 4-8): Friendly, simple, cute, actionable
    // ------------------------------------------
    adapted.title = getJuniorTitle(hazard.id, hazard.title);
    adapted.shortDescription = getJuniorShortDesc(hazard.id, hazard.shortDescription);
    adapted.description = getJuniorDesc(hazard.id, hazard.description);
    adapted.whyDangerous = getJuniorWhyDangerous(hazard.id, hazard.whyDangerous);
    // Replace "Clinical Forensic Fact" with a friendly "Safety Ranger Tip"
    adapted.clinicalFact = getJuniorFriendlyTip(hazard.id, hazard.clinicalFact);
    adapted.safetyAction = getJuniorAction(hazard.id, hazard.safetyAction);
  } else if (ageGroup === 'advanced') {
    // ------------------------------------------
    // ADVANCED MODE (Ages 13-18): Highly technical, physics-based, Ohm's Law, GFCIs, tissue resistance
    // ------------------------------------------
    adapted.title = getAdvancedTitle(hazard.id, hazard.title);
    adapted.shortDescription = getAdvancedShortDesc(hazard.id, hazard.shortDescription);
    adapted.description = getAdvancedDesc(hazard.id, hazard.description);
    adapted.whyDangerous = getAdvancedWhyDangerous(hazard.id, hazard.whyDangerous);
    adapted.clinicalFact = getAdvancedClinicalFact(hazard.id, hazard.clinicalFact);
    adapted.safetyAction = getAdvancedAction(hazard.id, hazard.safetyAction);
  }

  return adapted;
}

// ---------------- JUNIOR DATA MAPS ----------------

function getJuniorTitle(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: '⚡ iPad Charging near Bathtub',
    bath_hairdryer_sink: '💨 Hairdryer near Splashing Water',
    bath_outlet_steam: '🧩 Broken Socket Cover with Steam',
    bath_heater_shower: '🔥 Space Heater near the Wet Shower',
    bath_unplugged_charger_puddle: '🔌 Live Charger Cable in a Puddle',
    living_fork_outlet: '🚫 Poking Metal inside Outlets',
    living_overloaded_strip: '⚠️ Overloaded Power Strip',
    living_rug_cord: '🧶 Wire Hidden under Rug',
    living_heater_drapes: '🔥 Heater right under Curtains',
    living_chewed_wire_couch: '🐹 Chewed Lamp Wire behind Sofa',
    kitchen_frayed_toaster: '🥪 Frayed Toaster Cord',
    kitchen_wet_switch: '🧼 Touching Switches with Wet Hands',
    kitchen_diy_tape: '🩹 Homemade Tape Wire Fix',
    kitchen_kettle_edge: '🍵 Kettle Cord Hanging off Edge',
    kitchen_sparking_microwave: '✨ Sparky Metal inside Microwave',
    back_lawnmower_puddle: '🌧️ Lawnmower Cord in a Water Puddle',
    back_climbing_wires: '🌳 Climbing Trees near Overhead Wires',
    back_substation_ball: '🚧 Climbing Substation Fences',
    back_broken_pole_wire: '⚡ Fallen Power Line on the Ground',
    back_metallic_fence_wire: '🛑 Charged Metal Fence'
  };
  return map[id] || def;
}

function getJuniorShortDesc(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'An iPad charging in a plug right next to the water tub.',
    bath_hairdryer_sink: 'A hairdryer plugged in next to the splashy, wet sink.',
    bath_outlet_steam: 'A cracked wall socket getting wet from hot shower steam.',
    bath_heater_shower: 'A portable heater sitting right next to the slippery wet shower.',
    bath_unplugged_charger_puddle: 'A plugged-in phone charger cord resting in a wet puddle on the floor.',
    living_fork_outlet: 'Trying to slide a metal fork or key inside the wall socket plug.',
    living_overloaded_strip: 'Too many things plugged into one outlet making it hot and sick.',
    living_rug_cord: 'An extension cord being crushed and squished underneath a heavy carpet.',
    living_heater_drapes: 'A warm space heater sitting right under long curtains.',
    living_chewed_wire_couch: 'A wire that a puppy or kitten chewed, showing bare wire inside.',
    kitchen_frayed_toaster: 'A toaster cord with its rubber skin peeled off, showing shiny metal wires.',
    kitchen_wet_switch: 'Flipping a light switch while your hands are still dripping with soap and water.',
    kitchen_diy_tape: 'A broken cord taped up with regular sticky tape instead of being replaced.',
    kitchen_kettle_edge: 'An electric kettle cord hanging off the table where it can be pulled down.',
    kitchen_sparking_microwave: 'Putting metal foil or spoons in the microwave, causing bright sparks.',
    back_lawnmower_puddle: 'A lawnmower extension cord sitting in a wet grass puddle.',
    back_climbing_wires: 'Climbing a tree where giant power wires pass through the branches.',
    back_substation_ball: 'Going inside a giant fenced high-voltage utility cage to get a ball.',
    back_broken_pole_wire: 'A snapped electric line touching the grass after a windy storm.',
    back_metallic_fence_wire: 'A snapped street wire touching a metal fence, making the fence live.'
  };
  return map[id] || def;
}

function getJuniorDesc(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'Electricity and water are NOT friends! If a plugged-in tablet falls into your bathtub while you are inside, the electric current will jump through the water and can cause a very bad shock. Keep toys and plugs away from water!',
    bath_hairdryer_sink: 'Even if the hairdryer is turned off, electricity is still waiting inside the wire! If water splashes on it, or if it falls into the sink, the power can leak out onto the wet counter. Keep it unplugged and stored away!',
    bath_outlet_steam: 'Condensation from hot bath steam can sneak behind cracked socket covers. Water is a conductor, which means it helps electricity travel. It can short out and sparks can jump!',
    bath_heater_shower: 'Portable space heaters don\'t like wet rooms. Steam can coat the inside coils, making the outer metallic body live with electricity. Keep them completely out of the bathroom!',
    bath_unplugged_charger_puddle: 'The end of this USB cord has a live electric flow, even if no phone is connected. If it sits in a puddle of water, the water can carry electricity, or the wire can melt and spark!',
    living_fork_outlet: 'Plugs are coated with rubber or plastic to keep you safe, but bare metal like forks, keys, or hairpins let 100% of the wall power flow into you. Only standard power plugs belong in outlets!',
    living_overloaded_strip: 'Plugging too many things into one outlet makes it "over-eat"! The wall wires get super hot, melt their plastic skins, and can cause a fire. Keep power outlets clean and simple.',
    living_rug_cord: 'Stepping on a cord under a rug crushes the copper inside. The friction rubs off the plastic insulation, exposing live wires under a flammable rug. Keep wires out where they are cool!',
    living_heater_drapes: 'Heaters need breathing room! Putting them too close to curtains, blankets, or pillows can set the fabric on fire. Always give your heaters lots of space!',
    living_chewed_wire_couch: 'Our furry friends love to chew on strings, but chewing cords peels off the safe rubber coating. Pushing a couch over bare wires can make sparky fires or shock you!',
    kitchen_frayed_toaster: 'Toaster cords get worn out. If the plastic skin peels off, touching the exposed wire strands lets the high voltage jump directly into your fingers! Never use a frayed cord.',
    kitchen_wet_switch: 'Squeezing switches with wet hands lets water trickle inside. Water helps the electric current jump right out of the wall and into your body. Dry your hands first!',
    kitchen_diy_tape: 'Normal tape is not strong enough to block electricity. If wires are patched with household tape, it can melt, slip off, and spark a major fire. Always replace broken cords!',
    kitchen_kettle_edge: 'An overhanging kettle cord can be easily pulled by a toddler or pet, causing boiling water and electrical currents to crash down in a messy puddle!',
    kitchen_sparking_microwave: 'Microwaves use magnetic waves to cook food. Metal things reflect these waves, making electric sparks fly around inside! Never put metal in the microwave.',
    back_lawnmower_puddle: 'A wet grass puddle plus electricity is a big danger! Stepping in an electrified puddle can give you a very nasty ouchie. Never lay cords through puddles.',
    back_climbing_wires: 'Always look up before climbing! Power lines are uninsulated, meaning they have no plastic cover. Touching a wire while on a tree can make electricity travel through your body down to the earth.',
    back_substation_ball: 'Those big utility cages with high-voltage signs contain massive machines. Electricity can jump through the air like mini lightning bolts even if you don\'t touch the machines! Stay outside.',
    back_broken_pole_wire: 'A wire fallen from a pole is NOT dead! It can snake around and energize the grass all around it. Stay far back and call for help.',
    back_metallic_fence_wire: 'If a broken street wire touches a metal fence, the whole fence acts like a live electrical cord. Touching it will deliver a severe shock. Stay away!'
  };
  return map[id] || def;
}

function getJuniorWhyDangerous(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'Water lowers your skin\'s resistance to electricity, letting power flow easily into your heart.',
    bath_hairdryer_sink: 'Electricity flows into wet puddles on the counter, waiting for you to touch it.',
    bath_outlet_steam: 'Condensation acts as a wet bridge, helping power escape from the socket.',
    bath_heater_shower: 'Water vapor makes the metal shell live, giving you a shock when you touch it.',
    bath_unplugged_charger_puddle: 'Wet charger ends electrify puddles. Damp skin touching it can cause small shocks or cable melts.',
    living_fork_outlet: 'Metal forks are super-conductors. They carry high voltage directly into your arm.',
    living_overloaded_strip: 'Too much electrical current melts plastic covers, exposing live, hot wires.',
    living_rug_cord: 'Crushed and squished wires trap heat and can cause a sudden fire under the carpet.',
    living_heater_drapes: 'Intense heat can easily set blowing fabrics on fire in seconds.',
    living_chewed_wire_couch: 'Exposed bare wires can spark or shock anyone touching the back of the sofa.',
    kitchen_frayed_toaster: 'Frayed rubber loses its barrier, leaving active electricity bare and exposed.',
    kitchen_wet_switch: 'Soap and water on fingers carry wall voltage right through the light switch.',
    kitchen_diy_tape: 'Regular tape degrades and slips off when warm, letting voltage leak out.',
    kitchen_kettle_edge: 'Boiling water and live electricity falling together can cause severe burns and shocks.',
    kitchen_sparking_microwave: 'Electricity bounces off shiny metal, starting fires and destroying the appliance.',
    back_lawnmower_puddle: 'Wet puddles enlarge the danger zone, conducting power deep into the wet soil.',
    back_climbing_wires: 'High-voltage lines will use your body to reach the ground, causing serious injuries.',
    back_substation_ball: 'Extremely high power can jump across empty space to find a path to the ground.',
    back_broken_pole_wire: 'The wet ground around the fallen wire carries high voltage in circles.',
    back_metallic_fence_wire: 'Metal fences conduct electricity for blocks. Anyone touching it gets shocked.'
  };
  return map[id] || def;
}

function getJuniorFriendlyTip(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'Safety Tip: Keep all tablets and phones on a desk far away from your bath time!',
    bath_hairdryer_sink: 'Safety Tip: When you are done drying your hair, always pull the plug out and put it in a drawer.',
    bath_outlet_steam: 'Safety Tip: Sockets in bathrooms should have "Test" and "Reset" buttons. Those are automatic safety shields!',
    bath_heater_shower: 'Safety Tip: Keep space heaters in dry rooms like bedrooms or living rooms, far away from showers.',
    bath_unplugged_charger_puddle: 'Safety Tip: Ask a parent to unplug phone chargers once they are finished charging.',
    living_fork_outlet: 'Safety Tip: Wall outlets are only for plastic plugs. Cover unused plugs with cute baby caps.',
    living_overloaded_strip: 'Safety Tip: Use one socket for one big appliance. Don\'t double-stack power bars!',
    living_rug_cord: 'Safety Tip: Run cords along the wall edges or behind desks so they never get stepped on.',
    living_heater_drapes: 'Safety Tip: Keep heaters at least three steps away from any fabric or soft curtains.',
    living_chewed_wire_couch: 'Safety Tip: Use a protective plastic wrap around cables if you have a curious puppy or kitten.',
    kitchen_frayed_toaster: 'Safety Tip: If you see a cord that is peeling or looks fuzzy, tell an adult right away!',
    kitchen_wet_switch: 'Safety Tip: Dry your hands with a soft dish towel before starting the blender or toaster!',
    kitchen_diy_tape: 'Safety Tip: Broken wires cannot be healed with tape. They need to be recycled or fixed by a professional.',
    kitchen_kettle_edge: 'Safety Tip: Keep all kettle and toaster cables pushed far back against the kitchen walls.',
    kitchen_sparking_microwave: 'Safety Tip: Use only glass, paper, or ceramic bowls inside the microwave.',
    back_lawnmower_puddle: 'Safety Tip: Wait for the lawn to dry completely before plugging in lawn equipment or cutting grass!',
    back_climbing_wires: 'Safety Tip: Always look up before you climb any tree to ensure no overhead cables are nearby.',
    back_substation_ball: 'Safety Tip: If your favorite toy falls behind a utility gate, ask a grown-up to call the electric company.',
    back_broken_pole_wire: 'Safety Tip: If you spot a fallen wire on the street, stand back, shout to others, and tell an adult!',
    back_metallic_fence_wire: 'Safety Tip: Metal fences can carry electric currents if a wire touches them. Always stay clear after a storm.'
  };
  return map[id] || `Safety Tip: ${def.replace(/autopsy|death|electrocution|forensic/gi, 'safety studies')}`;
}

function getJuniorAction(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'Charge tablets in your bedroom, and never bring any electronic devices near the tub or water!',
    bath_hairdryer_sink: 'Unplug the hairdryer and place it safely in a cabinet far away from splashing sink water.',
    bath_outlet_steam: 'Have parents install safe, moisture-proof GFCI wall plugs and replace cracked covers.',
    bath_heater_shower: 'Keep space heaters out of the bathroom entirely. Use safe, built-in dry heating instead.',
    bath_unplugged_charger_puddle: 'Always unplug charging cords as soon as you are done, and keep cords off damp floors.',
    living_fork_outlet: 'Never stick anything except standard plugs into sockets. Use plastic safety caps to cover empty plugs.',
    living_overloaded_strip: 'Unplug extra appliances, and ask an adult to use separate wall sockets instead of stacking power bars.',
    living_rug_cord: 'Move cords out from under carpets. Run them safely along wall boards where they can breathe.',
    living_heater_drapes: 'Move space heaters at least three feet away from drapes, blankets, or couches.',
    living_chewed_wire_couch: 'Replace damaged cables immediately and install cord protector tubes to keep pets safe.',
    kitchen_frayed_toaster: 'Stop using the toaster immediately. Ask parents to safely recycle it or get a new cord!',
    kitchen_wet_switch: 'Dry hands completely with a dish towel before turning on any switches or kitchen appliances.',
    kitchen_diy_tape: 'Throw away the makeshift tape wire, and get a new certified appliance power cord!',
    kitchen_kettle_edge: 'Push kettle wires far back on the counter so children and pets can\'t grab or pull them down.',
    kitchen_sparking_microwave: 'Turn off the microwave immediately, remove any metal foil, and use only microwave-safe plates.',
    back_lawnmower_puddle: 'Unplug the outdoor extension cord, dry the ground, and only operate lawnmowers on dry grass.',
    back_climbing_wires: 'Climb only on trees that are far away from electric poles and overhead wiring.',
    back_substation_ball: 'Stay outside substation fences. Ask an adult to notify the utility department to fetch the ball.',
    back_broken_pole_wire: 'Keep a safe distance of at least 35 feet from fallen wires, and call 911 immediately!',
    back_metallic_fence_wire: 'Never touch metal fences after a storm if street wires are down. Stay away and tell an adult.'
  };
  return map[id] || def;
}


// ---------------- ADVANCED DATA MAPS ----------------

function getAdvancedTitle(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'AC Line Voltage Ground Path near Saturated Medium',
    bath_hairdryer_sink: 'Uninsulated Resistive Appliance near Wet Basin',
    bath_outlet_steam: 'Degraded Enclosure Faceplate under Vapor Deposition',
    bath_heater_shower: 'Humid High-Wattage Convection Unit near Wet Zone',
    bath_unplugged_charger_puddle: 'Live DC Secondary Output in Electrolytic Puddle',
    living_fork_outlet: 'Direct Intrusive Contact with Phase Terminal',
    living_overloaded_strip: 'Excess Current Loading & Thermal Insulation Overload',
    living_rug_cord: 'Friction-Degraded Cable Cover under Rug',
    living_heater_drapes: 'Thermal Convection Hazard near Combustible Textiles',
    living_chewed_wire_couch: 'Mechanical Insulation Breakdown from Animal Chewing',
    kitchen_frayed_toaster: 'Conductor Attrition & Dielectric Failure on Toaster',
    kitchen_wet_switch: 'High-Conductivity Hand Contact on Electrical Switch',
    kitchen_diy_tape: 'Substandard Adhesive Splice & Resistance Leakage',
    kitchen_kettle_edge: 'Mechanical Cord Strain & Inductive Spilling Hazard',
    kitchen_sparking_microwave: 'Electromagnetic Field Arcing on Reflective Metallic Foil',
    back_lawnmower_puddle: 'Submersion of Damaged Extension Conductors',
    back_climbing_wires: 'High-Voltage Ground Path via Climber & Tree Canopy',
    back_substation_ball: 'Air Dielectric Breakdown & Arc Flash Trespass',
    back_broken_pole_wire: 'High-Voltage Gradient & Step Potential Hazard',
    back_metallic_fence_wire: 'Earthed Conductor Energization & Block-Wide Shock Risk'
  };
  return map[id] || def;
}

function getAdvancedShortDesc(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'A 120V AC device charging via an outlet directly adjacent to a water-saturated bathtub.',
    bath_hairdryer_sink: 'A hairdryer plugged into a 120V AC outlet, sitting on a wet surface with running water.',
    bath_outlet_steam: 'A cracked outlet faceplate exposed to hot shower condensation, lowering dielectric strength.',
    bath_heater_shower: 'A high-amperage space heater placed where heavy water vapor and stepping paths converge.',
    bath_unplugged_charger_puddle: 'A plugged-in 5V/9V charger resting its live contact in an electrolytic puddle.',
    living_fork_outlet: 'An attempt to insert highly conductive cutlery or wire into an energized phase slot.',
    living_overloaded_strip: 'Multiple high-amperage appliances drawing currents exceeding the strip\'s ampacity.',
    living_rug_cord: 'An active extension cable experiencing mechanical wear and thermal insulation aging under a carpet.',
    living_heater_drapes: 'A portable convection heater located within the thermal radiation radius of drapes.',
    living_chewed_wire_couch: 'Insulation shielding sheared off by animal chewing, exposing high-voltage strands.',
    kitchen_frayed_toaster: 'A standard appliance cable suffering from dielectric wear, exposing copper cores.',
    kitchen_wet_switch: 'Operating a live electrical switch with wet fingers, bypassing standard skin impedance.',
    kitchen_diy_tape: 'Joining severed lines with electrical-grade tape instead of professional terminal junctions.',
    kitchen_kettle_edge: 'A heavy kettle cord experiencing tensile load, hanging over countertops where it is easily snared.',
    kitchen_sparking_microwave: 'Introducing high-conductivity metal into a 2.45GHz electromagnetic field, causing arcing.',
    back_lawnmower_puddle: 'Running an outdoor line with worn rubber insulation through standing rainwater.',
    back_climbing_wires: 'Ascending a tree canopy within the flashover arc distance of 13.8kV overhead lines.',
    back_substation_ball: 'Trespassing into a sub-transmission substation where high-voltage arcing can occur over open air.',
    back_broken_pole_wire: 'A snapped sub-transmission line lying on wet grass, creating a radial step-potential field.',
    back_metallic_fence_wire: 'A fallen primary conductor energizing a high-conductivity metallic fence boundary.'
  };
  return map[id] || def;
}

function getAdvancedDesc(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'Under Ohm’s Law (I = V/R), a wet human body offers less than 1,000 ohms of resistance compared to the dry skin baseline of 100,000 ohms. If a device charging on 120V AC falls into the tub, the current path bypasses skin impedance, channeling high-amperage current directly through the water, leading to immediate ventricular fibrillation (cardiac arrest).',
    bath_hairdryer_sink: 'A plugged-in hairdryer maintains an active line connection. Water splashes lower the air gap insulation resistance. If water completes the path between the active phase terminal and the earthed wet countertop, any human touching the wet surface completes the ground return path, receiving a heavy shock.',
    bath_outlet_steam: 'Steam is water vapor that deposits as liquid droplets on cold surfaces. When a faceplate is cracked, water vapor condenses directly on the terminal screws. This lowers the dielectric barrier of the air gap, leading to creepage current, carbon tracking, short circuits, or ground faults.',
    bath_heater_shower: 'Humid spaces cause condensation to form on high-resistance elements. Steam on internal heating wires bridges the gap to the metallic external cabinet, energizing the chassis. Without functional grounding, anyone stepping out of the shower touching the cabinet will absorb the full current load.',
    bath_unplugged_charger_puddle: 'Even low-voltage (5V-12V) USB cables pose risks when submerged. Water containing dissolved minerals acts as an electrolyte. The potential difference causes electrolytic corrosion of the cable pins, generating heat that can melt the connector insulation, risking secondary fires or skin burns.',
    living_fork_outlet: 'Wall sockets operate at 120V-240V AC. Inserting a conductive steel fork into the hot phase slot provides a path of near-zero resistance. According to electrical physics, the current flows immediately through the hand-arm pathway, causing severe muscular contraction (making it impossible to let go) and thermal tissue burns.',
    living_overloaded_strip: 'Every wire has an ampacity limit based on cross-sectional area (AWG). Overloading multiple devices (e.g., space heaters and gaming rigs) draws current exceeding the wire\'s rated load. This triggers Joule heating (P = I²R), causing rapid thermal breakdown of the PVC insulation, resulting in short-circuits and intense electrical fires.',
    living_rug_cord: 'Cords under rugs are subject to mechanical compression from foot traffic, which shears copper strands and weakens the PVC dielectric shield. Additionally, carpets act as thermal insulators. The heat generated by the current cannot dissipate, accelerating thermal insulation aging and sparking arcing faults.',
    living_heater_drapes: 'High-wattage radiant space heaters can raise adjacent surface temperatures past their autoignition point. Long fabric drapes can easily be swept into contact with the heating coils by convective air currents, igniting a rapid, oxygen-rich fire.',
    living_chewed_wire_couch: 'Chewing by pets strips the protective thermoplastic insulation. This leaves copper cores bare. Moving heavy metallic-framed furniture over these bare conductors can clip the copper strands, causing a high-energy short circuit or spark discharge.',
    kitchen_frayed_toaster: 'Repetitive mechanical flexing of the toaster cable leads to copper fatigue and wire strand breakage, which increases resistance at the stress point. This generates concentrated heat, breaking down the rubber sheath and leaving active AC lines exposed to direct human contact.',
    kitchen_wet_switch: 'The stratum corneum provides high resistance to electrical flow. However, moisture or sweat completely destroys this epidermal impedance, dropping skin resistance by 99%. Reaching for a switch with wet fingers allows moisture to bridge the internal contacts, creating an immediate electrical pathway into the nervous system.',
    kitchen_diy_tape: 'Joining high-current cords using electrical tape instead of mechanical connectors creates high-resistance junctions. Over time, the adhesive degrades under standard current temperatures, causing the wires to separate slightly, forming high-temperature electrical arcs that can exceed 1,000°C and ignite nearby objects.',
    kitchen_kettle_edge: 'Electric kettles require high power (up to 1,500W). An overhanging cord creates a mechanical lever. A minor snag can yank the kettle down, causing high-voltage terminal damage and releasing boiling water that floods adjacent outlets, triggering massive ground-fault surges.',
    kitchen_sparking_microwave: 'Microwaves emit radio waves at 2.45 GHz, which excite water molecules. If conductive metal foil is introduced, the electric field induces high surface currents. On thin metallic edges or crumpled foil, the voltage gradient exceeds the dielectric breakdown strength of air (approx 3kV/mm), creating high-temperature electric arcs.',
    back_lawnmower_puddle: 'Water is highly conductive when filled with dirt and lawn chemicals. Submerging a damaged extension cable allows phase current to leak directly into the water. This creates an active potential gradient on the wet surface, exposing anyone stepping into the puddle to step-potential or touch-potential shocks.',
    back_climbing_wires: 'Sub-transmission lines carry 13.8kV to 34.5kV. Trees contain moisture and sap, making them semi-conductive. If a climber gets within the flashover envelope of these high-voltage lines, the air breaks down, and an intense electrical arc discharge will strike the climber, channeling thousands of volts through their body to the tree roots.',
    back_substation_ball: 'Utility substations convert transmission voltages down to local distributions. The spacing of conductors relies on the dielectric insulation of open air. Entering this perimeter puts you in close proximity to massive magnetic fields and conductors where electrical arc-over can occur spontaneously without direct physical contact.',
    back_broken_pole_wire: 'A snapped high-voltage line on wet grass creates a radial voltage gradient. As you walk toward or away from the wire, your feet touch areas with different electrical potentials. This "step potential" forces current up one leg, through the lower torso and heart, and down the other leg. Always keep feet together and shuffle away!',
    back_metallic_fence_wire: 'A metal fence has incredibly low electrical resistance. If a live primary phase line falls on it, the entire metallic fence structure for blocks becomes energized. Lacking ground fault safety systems on fencing, touching any portion of the metal can result in lethal current pathways.'
  };
  return map[id] || def;
}

function getAdvancedWhyDangerous(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'Saturated skin drops bodily resistance below 1,000 ohms. A 120V shock delivers over 100mA, crossing the ventricular fibrillation threshold.',
    bath_hairdryer_sink: 'Liquid droplets act as a conductive bridge. Water lowers the air barrier between line voltage and grounded sinks.',
    bath_outlet_steam: 'High humidity causes moisture creepage across exposed terminal screws, creating an electrolytic short circuit.',
    bath_heater_shower: 'Steam condensation forms a water bridge on high-resistance coils, transferring full line potential to the external metal chassis.',
    bath_unplugged_charger_puddle: 'Minerals in standing water promote electrolytic erosion, causing copper dendrite bridges that short-circuit and melt cables.',
    living_fork_outlet: 'Inserting low-impedance metal into phase terminals delivers direct line current, causing involuntary muscle lock and severe nerve damage.',
    living_overloaded_strip: 'Exceeding rated wire ampacity triggers Joule heating (I²R), melting thermoplastic PVC jackets and starting high-energy fires.',
    living_rug_cord: 'Mechanical compression shears copper wires and traps heat, raising temperatures past the autoignition point of the carpet.',
    living_heater_drapes: 'Convective draft currents pull light fabrics into contact with open high-temperature elements, initiating rapid ignition.',
    living_chewed_wire_couch: 'Exposed bare copper conductors can spark when mechanical pressure is applied, creating arc faults that easily bypass circuit breakers.',
    kitchen_frayed_toaster: 'Broken copper strands decrease wire cross-section, increasing local resistance and causing thermal failure of the insulation.',
    kitchen_wet_switch: 'Wet hands nullify epidermal electrical resistance, allowing nominal line voltage to penetrate deep muscle tissue.',
    kitchen_diy_tape: 'High-resistance connections wrapped in tape experience thermal expansion, exposing live connections and forming arc discharges.',
    kitchen_kettle_edge: 'Tensile cord loads wear down socket internal spring contacts, creating a loose high-resistance connection that can arc-heat and spark.',
    kitchen_sparking_microwave: 'High-frequency electric fields concentrate on sharp metal edges, ionizing the air and creating plasma arcs (sparking).',
    back_lawnmower_puddle: 'Charged liquid creates an electrical potential gradient. Touching or stepping on it completes the circuit to true earth ground.',
    back_climbing_wires: '13,800-volt lines have an air breakdown distance. A conductive tree or body nearby triggers flashover, delivering fatal currents.',
    back_substation_ball: 'Dielectric air breakdown allows voltage to arc across gaps to any conductive object, bypassing the need for physical contact.',
    back_broken_pole_wire: 'Voltage decays radially from the wire contact point. Spaced steps bridge a potential difference, driving current through the lower torso.',
    back_metallic_fence_wire: 'Metal fencing acts as an uninsulated bus bar, transporting high voltage across extensive boundaries without tripping safety breakers.'
  };
  return map[id] || def;
}

function getAdvancedClinicalFact(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'Forensic Pathology Review: Bathtub electrocutions are highly lethal because the large surface area of water makes contact resistance near zero, causing massive current flow across the thoracic cavity.',
    bath_hairdryer_sink: 'Medical Safety Data: Low-voltage (120V-240V) shocks in wet areas are responsible for a significant percentage of household electrocutions due to the conductive properties of municipal water.',
    bath_outlet_steam: 'National Fire Code Analysis: Standard bathroom outlets require Ground Fault Circuit Interrupters (GFCIs) calibrated to detect currents as low as 4-6 milliamperes and cut off power in 25ms.',
    bath_heater_shower: 'Clinical Accident Logs: Portable heaters in bathrooms are notorious for causing chassis energization through moisture condensation, leading to severe touch-potential shocks.',
    bath_unplugged_charger_puddle: 'Pediatric Burn Studies: Small children suffer severe electrolytic oral and mucosal burns when playing with or chewing on the energized tips of plugged-in USB cables.',
    living_fork_outlet: 'Pediatric Trauma Reports: Inserting foreign metal objects into outlets causes severe localized arc burns (up to 3,000°C), permanent nerve damage, and involuntary tetanic muscle contractions.',
    living_overloaded_strip: 'Fire Forensic Science: Overloading circuit conductors triggers pyrolytic degradation of surrounding plastics, generating flammable gases that ignite explosively.',
    living_rug_cord: 'Underwriter Laboratory Research: Cords covered by rugs are subject to double-insulation failure: structural strand damage from stepping and thermal traps from carpet insulation.',
    living_heater_drapes: 'Convection Fire Studies: Portable heaters positioned within three feet of household combustibles account for the highest fatality-to-incident ratio among electrical appliances.',
    living_chewed_wire_couch: 'Domestic Accident Database: Rodent and pet chewing on electrical wiring accounts for a hidden 12% of structural fires in older residential buildings.',
    kitchen_frayed_toaster: 'Clinical Electrocution Registry: Skin contact with frayed cords represents the primary mechanical trigger for residential low-voltage ventricular fibrillation.',
    kitchen_wet_switch: 'Forensic Autopsy Studies: 78% of low-voltage household electrocution cases show entry marks on the upper extremities (fingers/palms) due to touching wet switches or plugs.',
    kitchen_diy_tape: 'Electrical Engineering Standards: Household tape possesses poor dielectric strength and cannot handle the temperature rises associated with continuous appliance current draws.',
    kitchen_kettle_edge: 'Pediatric Emergency Data: Thermal scalding from snagged kettle cords is a major emergency room trigger, often accompanied by electrical arc burns from damaged terminals.',
    kitchen_sparking_microwave: 'Applied Physics Reports: Microwave arcing is a form of gas discharge where induced electric potential ionizes air molecules, creating high-temperature plasma.',
    back_lawnmower_puddle: 'Outdoor Safety Statistics: Outdoor electrical fatalities show a high correlation with agricultural work and lawnmowing in humid conditions without proper GFCI protection.',
    back_climbing_wires: 'High-Voltage Incident Reports: Overhead utility wires are typically bare aluminum or copper. Climbing trees near these lines carries an extreme risk of lethal high-voltage flashover.',
    back_substation_ball: 'Utility Grid Safety Data: Electrical substations contain high-voltage bus bars spaced to rely on air gap insulation. Human intrusion within this zone causes instant catastrophic arc discharges.',
    back_broken_pole_wire: 'Forensic Case Reviews: High-voltage lines resting on ground create radial voltage fields. Step-potential shocks are highly fatal because current crosses the vital organs.',
    back_metallic_fence_wire: 'Fencing Safety Standards: Metallic perimeter fences near utility lines are supposed to be grounded. If ungrounded and energized, they act as active high-voltage conductors.'
  };
  return map[id] || def;
}

function getAdvancedAction(id: string, def: string): string {
  const map: Record<string, string> = {
    bath_tub_tablet: 'Establish a strict zero-device policy in wet areas. Never plug in or use any device connected to AC line voltage while inside or near a bathtub or wet basin.',
    bath_hairdryer_sink: 'Disconnect the power supply cord when the hairdryer is not in use, and store it in a dry drawer. Ensure all kitchen and bathroom outlets have functional GFCIs.',
    bath_outlet_steam: 'Inspect bathroom outlet covers regularly. Replace cracked faceplates immediately and ensure the outlet housing box is fully sealed against moisture.',
    bath_heater_shower: 'Ban portable space heaters from wet zones. Install dedicated, sealed bathroom wall heaters that comply with moisture-ingress protection (IP) codes.',
    bath_unplugged_charger_puddle: 'Unplug USB chargers from the wall receptacle when the device is not connected. Keep charging tips completely clear of damp surfaces.',
    living_fork_outlet: 'Never introduce foreign metallic objects into power outlets. Install childproof tamper-resistant receptacles (TRRs) that block entry unless equal pressure is applied.',
    living_overloaded_strip: 'Calculate the total amperage draw of connected devices (Amps = Watts / Volts). Ensure the total draw never exceeds 80% of the power strip or wall circuit rating.',
    living_rug_cord: 'Reroute power cords along baseboards, clear of foot traffic. Never cover active power cables with rugs, carpets, furniture, or heavy insulating materials.',
    living_heater_drapes: 'Maintain a minimum of three feet of clearance around all space heaters. Keep them clear of curtains, papers, and upholstery, and turn them off when unattended.',
    living_chewed_wire_couch: 'Inspect power cords behind couches regularly. Replace any cords showing signs of mechanical wear or animal chewing, and use protective split-loom tubing.',
    kitchen_frayed_toaster: 'De-energize the circuit, unplug the appliance, and replace the frayed power cord or dispose of the appliance. Never patch live high-voltage cords with tape.',
    kitchen_wet_switch: 'Thoroughly dry your hands on a clean towel before operating any electrical switch, outlet, or plugged-in kitchen appliance.',
    kitchen_diy_tape: 'Do not use electrical tape for permanent splices on high-power appliance cords. Wires must be joined using certified wire nuts, soldering, or terminal blocks.',
    kitchen_kettle_edge: 'Reroute kettle cords to prevent them from hanging over the counter edge. Use cable-management wraps to bind excess wire close to the wall.',
    kitchen_sparking_microwave: 'Only use certified microwave-safe containers. Never introduce metals, metallic trim plates, or aluminum foil into the microwave cavity.',
    back_lawnmower_puddle: 'Unplug the cord immediately at the source. Run outdoor cords only on dry terrain, and ensure they are connected to a certified outdoor GFCI-protected outlet.',
    back_climbing_wires: 'Identify overhead lines before climbing trees. Stay at least 10 feet away from distribution lines, and notify the utility company if branches touch wires.',
    back_substation_ball: 'Never trespass inside a substation boundary. Call the utility company or contact emergency services to coordinate a safe retrieval of lost items.',
    back_broken_pole_wire: 'Maintain a distance of at least 35 feet from any downed line. To escape, keep your feet together and hop or shuffle slowly without lifting either foot.',
    back_metallic_fence_wire: 'Keep far away from metallic fences after high-wind storms. Notify the local power utility of downed lines touching perimeter fencing immediately.'
  };
  return map[id] || def;
}

// ---------------- WELCOME MODAL DETAILS ----------------

export function getWelcomeModalDetails(ageGroup: AgeGroup, roomLabel: string): { title: string; subtitle: string; body: string } {
  if (ageGroup === 'junior') {
    return {
      title: 'VoltSafe Kids Club 🛡️',
      subtitle: 'Little Sparks Safety Academy (Ages 4-8)',
      body: `Hi there, Safety Rookie! Some tricky electric toys and wires have gone dangerous in the ${roomLabel}! Can you help us find them so we can keep our family safe and dry? Solve problems to earn shiny badges!`
    };
  } else if (ageGroup === 'advanced') {
    return {
      title: 'VoltSafe Forensic Research ⚡',
      subtitle: 'Advanced Risk Assessment (Ages 13-18)',
      body: `Inspector, we have a critical safety mission in the ${roomLabel}. High-voltage hazards, insulation failures, and grounding risks are compromised. Your mission is to analyze molecular moisture creepage, compute overload limits, and enforce safety action plans. Locate all active problems now.`
    };
  } else {
    return {
      title: 'VoltSafe Ranger Academy 🎯',
      subtitle: 'Safety Ranger Patrol (Ages 9-12)',
      body: `Welcome, Recruit! High-voltage hazards have compromised the ${roomLabel}. We need a qualified inspector to secure the premises immediately. Mitigate electrical risks, progress through local room-specific difficulty spawns, and claim your Master Safety Badge!`
    };
  }
}

// ---------------- SPECIALIZED QUIZ QUESTIONS ----------------

export const JUNIOR_QUIZ: QuizQuestion[] = [
  {
    id: 'jq1',
    question: 'Is it safe to charge an iPad or phone next to a bathtub full of water?',
    options: [
      'Yes, water makes it charge super fast!',
      'No! If it falls in, the electricity can travel through water and give you a bad ouchie!',
      'Only if you have toys in the tub.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Water and electricity are enemies! Water lets electricity escape easily, which is extremely dangerous. Always charge your toys on a dry table.'
  },
  {
    id: 'jq2',
    question: 'What belongs inside a wall outlet socket?',
    options: [
      'Standard power plugs only!',
      'Metal forks, keys, or hairpins.',
      'Spoons and fingers.'
    ],
    correctAnswerIndex: 0,
    explanation: 'Only standard power plugs belong in outlets! Sticking metal things inside wall outlets lets electricity shoot straight into your hand.'
  },
  {
    id: 'jq3',
    question: 'What is the first thing you should do if your hands are wet and you want to turn on a light switch?',
    options: [
      'Turn it on very quickly with a wet finger.',
      'Dry your hands completely with a clean towel first!',
      'Ask a puppy to lick it.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Always dry your hands completely! Wet skin lets electricity flow into your body much easier, which can shock you.'
  },
  {
    id: 'jq4',
    question: 'What should you do if you see an electric wire with fuzzy, cracked rubber that shows bare wire inside?',
    options: [
      'Wrap it in colorful sticky tape yourself.',
      'Leave it alone and don\'t tell anyone.',
      'Do not touch it and tell an adult immediately!'
    ],
    correctAnswerIndex: 2,
    explanation: 'Never touch a broken wire! Tell a grown-up right away so they can replace the wire safely.'
  },
  {
    id: 'jq5',
    question: 'Where should you climb trees?',
    options: [
      'Only in trees that are far away from electric wires and poles!',
      'Right next to the power lines so you can touch them.',
      'Any tree, wires are just ropes.'
    ],
    correctAnswerIndex: 0,
    explanation: 'Look up before you climb! Power wires are uninsulated, meaning they don\'t have safe rubber skins. Stay far away from trees touching wires.'
  }
];

export const ADVANCED_QUIZ: QuizQuestion[] = [
  {
    id: 'aq1',
    question: 'Under Ohm\'s Law (I = V/R), why does wet skin dramatically increase the severity of a 120V AC household shock?',
    options: [
      'Wet skin increases total capacitance, letting high frequencies pass through.',
      'Water dissolves the outer stratum corneum layer instantly, increasing skin voltage.',
      'Wet skin drops electrical resistance from ~100,000 ohms to under 1,000 ohms, allowing current to surpass the 100mA ventricular fibrillation threshold.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Dry skin offers significant protective resistance (R). When skin is wet, resistance (R) drops by 99%. Under I = V/R, this low resistance allows nominal 120V AC voltage to drive over 100mA of current directly through the heart, causing fatal cardiac arrest.'
  },
  {
    id: 'aq2',
    question: 'How does a Ground Fault Circuit Interrupter (GFCI) outlet protect against lethal electrocution in damp areas?',
    options: [
      'It steps down the 120V AC line voltage to a harmless 12V DC current.',
      'It monitors current balance between the hot and neutral conductors, tripping the circuit within 25 milliseconds if a minor leak of 4-6 mA is detected.',
      'It senses temperature rises in the wall conduit and triggers the main breaker.'
    ],
    correctAnswerIndex: 1,
    explanation: 'GFCIs are life-saving devices that constantly compare current flowing out on the hot wire and returning on the neutral wire. If a current imbalance (as small as 4-6 mA) occurs, it means electricity is leaking (likely through a person to ground), and the GFCI trips in milliseconds to prevent death.'
  },
  {
    id: 'aq3',
    question: 'What physical phenomenon occurs when too many high-wattage appliances overload a single power strip?',
    options: [
      'Electrolytic dissociation of copper, which blocks the returning neutral path.',
      'Joule heating (P = I²R) in the wires, which causes thermal degradation of the polymer insulation and triggers short-circuits.',
      'Inductive reactance in the plug terminals, which creates a high-voltage back-EMF.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Overloading draws current exceeding the wire\'s rated ampacity. This triggers Joule heating (power dissipation equal to current squared times resistance). The resulting excessive heat melts the PVC insulating jacket, causing direct contact between hot and neutral wires, initiating an arc fire.'
  },
  {
    id: 'aq4',
    question: 'If a high-voltage power line falls onto wet grass, what is the safest way to escape the surrounding "step potential" field?',
    options: [
      'Run as fast as possible to minimize contact time with the damp surface.',
      'Keep your feet tightly together and slowly shuffle or hop without lifting either foot, minimizing any potential difference between your contact points.',
      'Lie flat on your stomach and crawl away to distribute your body weight.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Downed high-voltage lines create a radial voltage gradient in the ground. If you take standard steps, your feet touch ground at different voltage potentials (bridging a potential difference), causing high current to shoot up one leg and down the other. Keeping feet together and shuffling prevents this potential difference.'
  },
  {
    id: 'aq5',
    question: 'Why are electrical extension cords run underneath heavy rugs or carpets considered a severe residential fire hazard?',
    options: [
      'The rug blocks electromagnetic fields, causing voltage to build up inside the conductors.',
      'Stepping on the cord causes mechanical abrasion that shears copper strands (increasing local resistance), while the carpet acts as a thermal trap preventing heat dissipation.',
      'Static electricity from walking on the carpet joins with the AC current to blow up the cord.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Hiding cords under rugs combines two dangers: mechanical crushing that shears copper strands (which reduces cross-section and spikes resistance/heat) and thermal insulation where the carpet traps the heat. This triggers thermal degradation of the cable cover and ignites the flammable carpet.'
  }
];

export function getQuizQuestions(ageGroup: AgeGroup): QuizQuestion[] {
  if (ageGroup === 'junior') {
    return JUNIOR_QUIZ;
  }
  if (ageGroup === 'advanced') {
    return ADVANCED_QUIZ;
  }
  // Default to standard high-quality quiz
  return [
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
}

export function getAgeGroupName(ageGroup: AgeGroup): string {
  if (ageGroup === 'junior') return 'Little Sparks (Ages 4-8)';
  if (ageGroup === 'advanced') return 'Advanced Inspector (Ages 13-18)';
  return 'Safety Ranger (Ages 9-12)';
}
