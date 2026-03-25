// ── AutoScout24 — Static Reference Data (Belgian Market) ──
// Used by the mapper and validator to convert human-readable vehicle data
// to AS24 numeric IDs and letter codes.

// ── Helper types ──

export interface AS24ModelRef {
  id: number;
  name: string;
}

export interface AS24MakeRef {
  id: number;
  name: string;
  models: AS24ModelRef[];
}

export interface AS24CodeRef {
  id: number;
  name: string;
  aliases: string[];
}

// ── Helper functions ──

/**
 * Normalize a string for fuzzy matching:
 * lowercase, strip diacritics/accents, trim whitespace.
 */
export function normalizeString(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Find a reference entry by matching `search` against `name` and `aliases`.
 * Returns the `id` of the first match or `null` if not found.
 */
export function findReferenceByName(
  refs: { id: number; name: string; aliases?: string[] }[],
  search: string,
): number | null {
  const needle = normalizeString(search);
  if (!needle) return null;

  for (const ref of refs) {
    if (normalizeString(ref.name) === needle) return ref.id;
    if (ref.aliases) {
      for (const alias of ref.aliases) {
        if (normalizeString(alias) === needle) return ref.id;
      }
    }
  }

  // Partial / contains match as fallback
  for (const ref of refs) {
    if (normalizeString(ref.name).includes(needle)) return ref.id;
    if (ref.aliases) {
      for (const alias of ref.aliases) {
        if (normalizeString(alias).includes(needle)) return ref.id;
      }
    }
  }

  return null;
}

/**
 * Find a make entry by name, returning the full object with its models array.
 */
export function findMakeByName(search: string): AS24MakeRef | null {
  const needle = normalizeString(search);
  if (!needle) return null;

  for (const make of AS24_MAKES) {
    if (normalizeString(make.name) === needle) return make;
  }
  for (const make of AS24_MAKES) {
    if (normalizeString(make.name).includes(needle)) return make;
  }
  return null;
}

// ── Makes & Models ──

export const AS24_MAKES: AS24MakeRef[] = [
  {
    id: 9,
    name: "Audi",
    models: [
      { id: 1101, name: "A1" },
      { id: 1102, name: "A3" },
      { id: 1103, name: "A4" },
      { id: 1104, name: "A5" },
      { id: 1105, name: "A6" },
      { id: 1106, name: "A7" },
      { id: 1107, name: "A8" },
      { id: 1108, name: "Q3" },
      { id: 1109, name: "Q5" },
      { id: 1110, name: "Q7" },
    ],
  },
  {
    id: 13,
    name: "BMW",
    models: [
      { id: 1301, name: "Série 1" },
      { id: 1302, name: "Série 2" },
      { id: 1303, name: "Série 3" },
      { id: 1304, name: "Série 4" },
      { id: 1305, name: "Série 5" },
      { id: 1306, name: "X1" },
      { id: 1307, name: "X3" },
      { id: 1308, name: "X5" },
      { id: 1309, name: "X6" },
      { id: 1310, name: "iX" },
    ],
  },
  {
    id: 17,
    name: "Citroën",
    models: [
      { id: 1701, name: "C1" },
      { id: 1702, name: "C3" },
      { id: 1703, name: "C4" },
      { id: 1704, name: "C5 Aircross" },
      { id: 1705, name: "Berlingo" },
      { id: 1706, name: "DS3" },
      { id: 1707, name: "DS4" },
      { id: 1708, name: "DS7" },
    ],
  },
  {
    id: 18,
    name: "Dacia",
    models: [
      { id: 1801, name: "Sandero" },
      { id: 1802, name: "Duster" },
      { id: 1803, name: "Logan" },
      { id: 1804, name: "Spring" },
      { id: 1805, name: "Jogger" },
    ],
  },
  {
    id: 21,
    name: "Fiat",
    models: [
      { id: 2101, name: "500" },
      { id: 2102, name: "Panda" },
      { id: 2103, name: "Tipo" },
      { id: 2104, name: "500X" },
      { id: 2105, name: "500L" },
      { id: 2106, name: "Punto" },
      { id: 2107, name: "Ducato" },
    ],
  },
  {
    id: 22,
    name: "Ford",
    models: [
      { id: 2201, name: "Fiesta" },
      { id: 2202, name: "Focus" },
      { id: 2203, name: "Mondeo" },
      { id: 2204, name: "Kuga" },
      { id: 2205, name: "Puma" },
      { id: 2206, name: "EcoSport" },
      { id: 2207, name: "Mustang" },
      { id: 2208, name: "Ranger" },
    ],
  },
  {
    id: 30,
    name: "Hyundai",
    models: [
      { id: 3001, name: "i10" },
      { id: 3002, name: "i20" },
      { id: 3003, name: "i30" },
      { id: 3004, name: "Tucson" },
      { id: 3005, name: "Kona" },
      { id: 3006, name: "IONIQ 5" },
      { id: 3007, name: "Santa Fe" },
      { id: 3008, name: "Bayon" },
    ],
  },
  {
    id: 34,
    name: "Kia",
    models: [
      { id: 3401, name: "Picanto" },
      { id: 3402, name: "Rio" },
      { id: 3403, name: "Ceed" },
      { id: 3404, name: "Sportage" },
      { id: 3405, name: "Niro" },
      { id: 3406, name: "EV6" },
      { id: 3407, name: "Stonic" },
    ],
  },
  {
    id: 46,
    name: "Mazda",
    models: [
      { id: 4601, name: "Mazda2" },
      { id: 4602, name: "Mazda3" },
      { id: 4603, name: "Mazda6" },
      { id: 4604, name: "CX-3" },
      { id: 4605, name: "CX-5" },
      { id: 4606, name: "CX-30" },
      { id: 4607, name: "MX-5" },
    ],
  },
  {
    id: 47,
    name: "Mercedes-Benz",
    models: [
      { id: 4701, name: "Classe A" },
      { id: 4702, name: "Classe B" },
      { id: 4703, name: "Classe C" },
      { id: 4704, name: "Classe E" },
      { id: 4705, name: "Classe S" },
      { id: 4706, name: "GLA" },
      { id: 4707, name: "GLC" },
      { id: 4708, name: "GLE" },
      { id: 4709, name: "CLA" },
      { id: 4710, name: "EQC" },
    ],
  },
  {
    id: 48,
    name: "Mini",
    models: [
      { id: 4801, name: "Cooper" },
      { id: 4802, name: "Cooper S" },
      { id: 4803, name: "Countryman" },
      { id: 4804, name: "Clubman" },
      { id: 4805, name: "Cabrio" },
    ],
  },
  {
    id: 52,
    name: "Nissan",
    models: [
      { id: 5201, name: "Micra" },
      { id: 5202, name: "Qashqai" },
      { id: 5203, name: "Juke" },
      { id: 5204, name: "X-Trail" },
      { id: 5205, name: "Leaf" },
      { id: 5206, name: "Navara" },
    ],
  },
  {
    id: 54,
    name: "Opel",
    models: [
      { id: 5401, name: "Corsa" },
      { id: 5402, name: "Astra" },
      { id: 5403, name: "Mokka" },
      { id: 5404, name: "Crossland" },
      { id: 5405, name: "Grandland" },
      { id: 5406, name: "Insignia" },
      { id: 5407, name: "Combo" },
    ],
  },
  {
    id: 57,
    name: "Peugeot",
    models: [
      { id: 5701, name: "208" },
      { id: 5702, name: "308" },
      { id: 5703, name: "508" },
      { id: 5704, name: "2008" },
      { id: 5705, name: "3008" },
      { id: 5706, name: "5008" },
      { id: 5707, name: "Partner" },
      { id: 5708, name: "e-208" },
    ],
  },
  {
    id: 58,
    name: "Porsche",
    models: [
      { id: 5801, name: "911" },
      { id: 5802, name: "Cayenne" },
      { id: 5803, name: "Macan" },
      { id: 5804, name: "Panamera" },
      { id: 5805, name: "Taycan" },
      { id: 5806, name: "718 Cayman" },
      { id: 5807, name: "718 Boxster" },
    ],
  },
  {
    id: 60,
    name: "Renault",
    models: [
      { id: 6001, name: "Clio" },
      { id: 6002, name: "Mégane" },
      { id: 6003, name: "Captur" },
      { id: 6004, name: "Kadjar" },
      { id: 6005, name: "Scénic" },
      { id: 6006, name: "Twingo" },
      { id: 6007, name: "Zoé" },
      { id: 6008, name: "Arkana" },
    ],
  },
  {
    id: 63,
    name: "Seat",
    models: [
      { id: 6301, name: "Ibiza" },
      { id: 6302, name: "Leon" },
      { id: 6303, name: "Arona" },
      { id: 6304, name: "Ateca" },
      { id: 6305, name: "Tarraco" },
      { id: 6306, name: "Mii" },
    ],
  },
  {
    id: 65,
    name: "Skoda",
    models: [
      { id: 6501, name: "Fabia" },
      { id: 6502, name: "Octavia" },
      { id: 6503, name: "Superb" },
      { id: 6504, name: "Karoq" },
      { id: 6505, name: "Kodiaq" },
      { id: 6506, name: "Kamiq" },
      { id: 6507, name: "Scala" },
      { id: 6508, name: "Enyaq" },
    ],
  },
  {
    id: 68,
    name: "Toyota",
    models: [
      { id: 6801, name: "Yaris" },
      { id: 6802, name: "Corolla" },
      { id: 6803, name: "C-HR" },
      { id: 6804, name: "RAV4" },
      { id: 6805, name: "Aygo" },
      { id: 6806, name: "Camry" },
      { id: 6807, name: "Land Cruiser" },
      { id: 6808, name: "Supra" },
    ],
  },
  {
    id: 72,
    name: "Volvo",
    models: [
      { id: 7201, name: "XC40" },
      { id: 7202, name: "XC60" },
      { id: 7203, name: "XC90" },
      { id: 7204, name: "V40" },
      { id: 7205, name: "V60" },
      { id: 7206, name: "V90" },
      { id: 7207, name: "S60" },
      { id: 7208, name: "S90" },
      { id: 7209, name: "C40" },
    ],
  },
  {
    id: 74,
    name: "Volkswagen",
    models: [
      { id: 7401, name: "Polo" },
      { id: 7402, name: "Golf" },
      { id: 7403, name: "Passat" },
      { id: 7404, name: "Tiguan" },
      { id: 7405, name: "T-Roc" },
      { id: 7406, name: "T-Cross" },
      { id: 7407, name: "Touran" },
      { id: 7408, name: "Arteon" },
      { id: 7409, name: "ID.3" },
      { id: 7410, name: "ID.4" },
    ],
  },
  {
    id: 125,
    name: "Tesla",
    models: [
      { id: 12501, name: "Model 3" },
      { id: 12502, name: "Model Y" },
      { id: 12503, name: "Model S" },
      { id: 12504, name: "Model X" },
      { id: 12505, name: "Cybertruck" },
    ],
  },
];

// ── Body Colors ──

export const AS24_BODY_COLORS: AS24CodeRef[] = [
  {
    id: 1,
    name: "Noir",
    aliases: [
      "black", "zwart", "schwarz",
      "noir métallisé", "black metallic", "noir mat",
    ],
  },
  {
    id: 2,
    name: "Blanc",
    aliases: [
      "white", "wit", "weiß", "weiss",
      "blanc nacré", "blanc pur", "white pearl",
    ],
  },
  {
    id: 3,
    name: "Gris",
    aliases: [
      "grey", "gray", "grijs", "grau",
      "gris foncé", "gris clair", "anthracite",
    ],
  },
  {
    id: 4,
    name: "Argent",
    aliases: [
      "silver", "zilver", "silber",
      "gris argent", "argenté",
    ],
  },
  {
    id: 5,
    name: "Bleu",
    aliases: [
      "blue", "blauw", "blau",
      "bleu foncé", "bleu clair", "bleu marine", "bleu nuit",
      "navy", "donkerblauw",
    ],
  },
  {
    id: 6,
    name: "Rouge",
    aliases: [
      "red", "rood", "rot",
      "rouge foncé", "bordeaux", "burgundy", "crimson",
    ],
  },
  {
    id: 7,
    name: "Vert",
    aliases: [
      "green", "groen", "grün",
      "vert foncé", "vert clair", "vert olive", "kaki",
    ],
  },
  {
    id: 8,
    name: "Brun",
    aliases: [
      "brown", "bruin", "braun",
      "marron", "chocolat", "brun foncé",
    ],
  },
  {
    id: 9,
    name: "Beige",
    aliases: [
      "beige", "crème", "cream", "creme",
      "sable", "sand", "champagne",
    ],
  },
  {
    id: 10,
    name: "Jaune",
    aliases: [
      "yellow", "geel", "gelb",
      "jaune vif", "jaune pâle", "doré",
    ],
  },
  {
    id: 11,
    name: "Orange",
    aliases: [
      "orange", "oranje",
      "orange vif", "cuivre", "copper",
    ],
  },
  {
    id: 12,
    name: "Violet",
    aliases: [
      "purple", "paars", "lila", "violett",
      "mauve", "aubergine",
    ],
  },
  {
    id: 13,
    name: "Or",
    aliases: [
      "gold", "goud", "golden",
      "doré", "gold metallic",
    ],
  },
  {
    id: 14,
    name: "Autre",
    aliases: [
      "other", "anders", "andere", "sonstige",
      "multicolore", "divers",
    ],
  },
];

// ── Body Types ──

export const AS24_BODY_TYPES: AS24CodeRef[] = [
  {
    id: 1,
    name: "Berline",
    aliases: [
      "sedan", "limousine", "saloon", "berlina",
      "4 portes", "4-door",
    ],
  },
  {
    id: 2,
    name: "Break",
    aliases: [
      "estate", "wagon", "station wagon", "stationwagen",
      "kombi", "touring", "sportswagon", "avant", "variant",
    ],
  },
  {
    id: 3,
    name: "Cabriolet",
    aliases: [
      "convertible", "cabrio", "roadster", "spider",
      "spyder", "décapotable", "open dak",
    ],
  },
  {
    id: 4,
    name: "Coupé",
    aliases: [
      "coupe", "2 portes", "2-door", "fastback",
    ],
  },
  {
    id: 5,
    name: "SUV",
    aliases: [
      "tout-terrain", "4x4", "crossover", "off-road",
      "terreinwagen", "geländewagen",
    ],
  },
  {
    id: 6,
    name: "Monospace",
    aliases: [
      "mpv", "minivan", "van", "people carrier",
      "monovolume", "espace",
    ],
  },
  {
    id: 7,
    name: "Compact",
    aliases: [
      "hatchback", "5 portes", "5-door", "3 portes", "3-door",
      "kleinwagen", "compacte",
    ],
  },
  {
    id: 8,
    name: "Pick-up",
    aliases: [
      "pickup", "pick up", "truck",
    ],
  },
  {
    id: 9,
    name: "Fourgon",
    aliases: [
      "van", "utilitaire", "bestelwagen",
      "fourgonnette", "commercial",
    ],
  },
  {
    id: 10,
    name: "Autre",
    aliases: [
      "other", "anders", "andere", "sonstige",
    ],
  },
];

// ── Interior Colors ──

export const AS24_INTERIOR_COLORS: AS24CodeRef[] = [
  {
    id: 1,
    name: "Noir",
    aliases: ["black", "zwart", "schwarz"],
  },
  {
    id: 2,
    name: "Gris",
    aliases: ["grey", "gray", "grijs", "grau"],
  },
  {
    id: 3,
    name: "Beige",
    aliases: ["beige", "crème", "cream", "creme", "sable"],
  },
  {
    id: 4,
    name: "Brun",
    aliases: ["brown", "bruin", "braun", "marron", "cognac", "chocolat"],
  },
  {
    id: 5,
    name: "Blanc",
    aliases: ["white", "wit", "weiß", "weiss", "ivoire", "ivory"],
  },
  {
    id: 6,
    name: "Rouge",
    aliases: ["red", "rood", "rot", "bordeaux"],
  },
  {
    id: 7,
    name: "Autre",
    aliases: ["other", "anders", "andere", "sonstige"],
  },
];

// ── Equipments (top 50 for Belgian market) ──

export const AS24_EQUIPMENTS: AS24CodeRef[] = [
  { id: 1, name: "GPS / Navigation", aliases: ["gps", "navigation", "navi", "satnav", "navigatie", "navigationssystem"] },
  { id: 2, name: "Climatisation", aliases: ["airco", "air conditioning", "ac", "a/c", "klimaanlage", "airconditioning"] },
  { id: 3, name: "Climatisation automatique", aliases: ["climate control", "auto airco", "automatic climate", "klimaautomatik"] },
  { id: 4, name: "Toit ouvrant", aliases: ["sunroof", "panoramic roof", "toit panoramique", "schuifdak", "panoramadak", "schiebedach"] },
  { id: 5, name: "Sièges chauffants", aliases: ["heated seats", "verwarmde zetels", "verwarmde stoelen", "sitzheizung"] },
  { id: 6, name: "Caméra de recul", aliases: ["backup camera", "rear camera", "reversing camera", "achteruitrijcamera", "rückfahrkamera"] },
  { id: 7, name: "Régulateur de vitesse", aliases: ["cruise control", "tempomat", "snelheidsregelaar"] },
  { id: 8, name: "Régulateur adaptatif", aliases: ["adaptive cruise control", "acc", "adaptieve cruise control", "abstandstempomat"] },
  { id: 9, name: "Bluetooth", aliases: ["bluetooth", "handsfree", "mains libres"] },
  { id: 10, name: "Radar de stationnement avant", aliases: ["front parking sensors", "parkeersensoren voor", "einparkhilfe vorne"] },
  { id: 11, name: "Radar de stationnement arrière", aliases: ["rear parking sensors", "parkeersensoren achter", "einparkhilfe hinten", "aide au stationnement"] },
  { id: 12, name: "Jantes en alliage", aliases: ["alloy wheels", "alloys", "lichtmetalen velgen", "alufelgen"] },
  { id: 13, name: "Phares LED", aliases: ["led headlights", "led lights", "led verlichting", "led-scheinwerfer"] },
  { id: 14, name: "Phares Xenon", aliases: ["xenon headlights", "xenon lights", "xenon verlichting", "xenon-scheinwerfer"] },
  { id: 15, name: "Cuir", aliases: ["leather", "leather seats", "leder", "lederbekleding", "sièges cuir", "volleder"] },
  { id: 16, name: "Aide au stationnement", aliases: ["park assist", "parking assist", "parkeerassistent", "einparkhilfe"] },
  { id: 17, name: "Volant multifonction", aliases: ["multifunction steering wheel", "multifunctioneel stuur", "multifunktionslenkrad"] },
  { id: 18, name: "Démarrage sans clé", aliases: ["keyless start", "keyless go", "push start", "sleutelloos starten", "schlüsselloses starten"] },
  { id: 19, name: "Accès sans clé", aliases: ["keyless entry", "keyless access", "sleutelloze toegang", "schlüsselloser zugang"] },
  { id: 20, name: "Apple CarPlay", aliases: ["carplay", "apple carplay"] },
  { id: 21, name: "Android Auto", aliases: ["android auto"] },
  { id: 22, name: "Système Start/Stop", aliases: ["start stop", "start-stop", "start/stop system", "start-stopsysteem"] },
  { id: 23, name: "Rétroviseurs électriques", aliases: ["electric mirrors", "power mirrors", "elektrische spiegels", "elektrische außenspiegel"] },
  { id: 24, name: "Vitres électriques", aliases: ["electric windows", "power windows", "elektrische ramen", "elektrische fensterheber"] },
  { id: 25, name: "Verrouillage centralisé", aliases: ["central locking", "centrale vergrendeling", "zentralverriegelung"] },
  { id: 26, name: "ABS", aliases: ["abs", "anti-lock braking"] },
  { id: 27, name: "ESP", aliases: ["esp", "electronic stability program", "electronic stability control", "esc"] },
  { id: 28, name: "Airbags latéraux", aliases: ["side airbags", "zij-airbags", "seitenairbags"] },
  { id: 29, name: "Airbags frontaux", aliases: ["front airbags", "frontale airbags", "frontairbags"] },
  { id: 30, name: "Isofix", aliases: ["isofix", "child seat anchor"] },
  { id: 31, name: "Feux de jour", aliases: ["daytime running lights", "drl", "dagrijlichten", "tagfahrlicht"] },
  { id: 32, name: "Détecteur de pluie", aliases: ["rain sensor", "regensensor"] },
  { id: 33, name: "Capteur de lumière", aliases: ["light sensor", "auto lights", "lichtsensor", "automatische verlichting"] },
  { id: 34, name: "Ordinateur de bord", aliases: ["trip computer", "onboard computer", "boordcomputer", "bordcomputer"] },
  { id: 35, name: "Direction assistée", aliases: ["power steering", "stuurbekrachtiging", "servolenkung"] },
  { id: 36, name: "Toit panoramique", aliases: ["panoramic roof", "panoramadak", "panoramadach", "toit vitré"] },
  { id: 37, name: "Caméra 360°", aliases: ["360 camera", "surround view", "360 graden camera", "360-grad-kamera"] },
  { id: 38, name: "Affichage tête haute", aliases: ["head-up display", "hud", "head up display", "windshield display"] },
  { id: 39, name: "Sièges ventilés", aliases: ["ventilated seats", "cooled seats", "geventileerde zetels", "belüftete sitze"] },
  { id: 40, name: "Sièges électriques", aliases: ["electric seats", "power seats", "elektrische zetels", "elektrische sitze"] },
  { id: 41, name: "Hayon électrique", aliases: ["electric tailgate", "power tailgate", "elektrische achterklep", "elektrische heckklappe"] },
  { id: 42, name: "Attelage de remorque", aliases: ["tow bar", "trailer hitch", "trekhaak", "anhängerkupplung"] },
  { id: 43, name: "Barres de toit", aliases: ["roof rails", "roof bars", "dakrails", "dachreling"] },
  { id: 44, name: "Système audio premium", aliases: ["premium sound", "harman kardon", "bose", "bang olufsen", "b&o", "premium audio", "hifi"] },
  { id: 45, name: "Chargeur sans fil", aliases: ["wireless charging", "induction charger", "draadloos opladen", "induktives laden"] },
  { id: 46, name: "Aide au maintien de voie", aliases: ["lane assist", "lane keeping assist", "rijstrookassistent", "spurhalteassistent"] },
  { id: 47, name: "Détection d'angle mort", aliases: ["blind spot detection", "blind spot monitor", "dodehoekdetectie", "toter-winkel-assistent"] },
  { id: 48, name: "Freinage automatique d'urgence", aliases: ["auto emergency braking", "aeb", "automatic braking", "automatische noodremming", "notbremsassistent"] },
  { id: 49, name: "Suspension adaptative", aliases: ["adaptive suspension", "adaptief onderstel", "adaptive fahrwerk"] },
  { id: 50, name: "Mode de conduite", aliases: ["drive modes", "driving modes", "rijmodi", "fahrmodi", "mode sport", "sport mode"] },
];

// ── Fuel Categories ──

export const AS24_FUEL_CATEGORIES: Record<string, string> = {
  // English
  petrol: "B",
  gasoline: "B",
  diesel: "D",
  electric: "E",
  hybrid_petrol: "B",
  hybrid_diesel: "D",
  "plug-in hybrid": "B",
  lpg: "L",
  cng: "C",
  hydrogen: "H",
  ethanol: "2",

  // French
  essence: "B",
  gazole: "D",
  "électrique": "E",
  electrique: "E",
  hybride: "B",
  "hybride essence": "B",
  "hybride diesel": "D",
  "hybride rechargeable": "B",
  gpl: "L",
  gnc: "C",
  "hydrogène": "H",
  hydrogene: "H",
  "éthanol": "2",
  ethanol_fr: "2",
  bioethanol: "2",
  "e85": "2",

  // Dutch
  benzine: "B",
  elektrisch: "E",
  waterstof: "H",

  // German
  benzin: "B",
  elektrisch_de: "E",
  wasserstoff: "H",
};

// ── Transmissions ──

export const AS24_TRANSMISSIONS: Record<string, string> = {
  // English
  manual: "M",
  automatic: "A",
  "semi-automatic": "S",

  // French
  manuelle: "M",
  automatique: "A",
  "semi-automatique": "S",

  // Dutch
  manueel: "M",
  automatisch: "A",
  "semi-automatisch": "S",
  handgeschakeld: "M",

  // German
  schaltgetriebe: "M",
  automatik: "A",
  halbautomatik: "S",
};

// ── Drivetrains ──

export const AS24_DRIVETRAINS: Record<string, string> = {
  // English
  front: "F",
  rear: "R",
  "all-wheel": "A",
  "all wheel drive": "A",
  awd: "A",
  "4x4": "A",
  "4wd": "A",

  // French
  avant: "F",
  "arrière": "R",
  arriere: "R",
  "intégrale": "A",
  integrale: "A",
  "traction avant": "F",
  "propulsion": "R",
  "quatre roues motrices": "A",

  // Dutch
  voorwielaandrijving: "F",
  achterwielaandrijving: "R",
  vierwielaandrijving: "A",

  // German
  frontantrieb: "F",
  hinterradantrieb: "R",
  allradantrieb: "A",
};

// ── Offer Types ──

export const AS24_OFFER_TYPES: Record<string, string> = {
  // English
  used: "U",
  new: "N",
  demo: "D",
  demonstration: "D",
  "pre-owned": "U",

  // French
  occasion: "U",
  neuf: "N",
  "démonstration": "D",
  demonstration_fr: "D",
  "véhicule de direction": "D",

  // Dutch
  tweedehands: "U",
  nieuw: "N",
  demonstratie: "D",

  // German
  gebraucht: "U",
  neu: "N",
  "vorführwagen": "D",
};

// ── Belgium-specific culture & marketplace ──

export const AS24_CULTURES = {
  /** French-speaking Belgium */
  FR_BE: "fr-BE",
  /** Dutch-speaking Belgium (Flanders) */
  NL_BE: "nl-BE",
  /** German-speaking Belgium (small community) */
  DE_BE: "de-BE",
} as const;

export type AS24Culture = (typeof AS24_CULTURES)[keyof typeof AS24_CULTURES];

export const AS24_MARKETPLACES = {
  /** Belgium marketplace ID */
  BE: "be",
} as const;

export type AS24Marketplace = (typeof AS24_MARKETPLACES)[keyof typeof AS24_MARKETPLACES];

/** Default culture for Belgian listings */
export const AS24_DEFAULT_CULTURE: AS24Culture = AS24_CULTURES.FR_BE;

/** Default marketplace for Belgian listings */
export const AS24_DEFAULT_MARKETPLACE: AS24Marketplace = AS24_MARKETPLACES.BE;
