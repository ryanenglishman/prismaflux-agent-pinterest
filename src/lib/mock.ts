export type MockVehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  status: "online" | "draft" | "sold";
  aiCompletion: number; // 0-100
  platforms: string[];
  photo?: string;
};

export const MOCK_VEHICLES: MockVehicle[] = [
  {
    id: "v1",
    make: "Volkswagen",
    model: "Golf 8 GTI",
    year: 2022,
    price: 34900,
    mileage: 28000,
    fuel: "Essence",
    transmission: "DSG",
    status: "online",
    aiCompletion: 96,
    platforms: ["autoscout24", "2ememain"],
  },
  {
    id: "v2",
    make: "BMW",
    model: "320d xDrive",
    year: 2021,
    price: 42500,
    mileage: 41000,
    fuel: "Diesel",
    transmission: "Automatique",
    status: "online",
    aiCompletion: 88,
    platforms: ["autoscout24"],
  },
  {
    id: "v3",
    make: "Audi",
    model: "A3 Sportback",
    year: 2023,
    price: 38200,
    mileage: 12000,
    fuel: "Hybride",
    transmission: "S-Tronic",
    status: "draft",
    aiCompletion: 74,
    platforms: [],
  },
  {
    id: "v4",
    make: "Mercedes",
    model: "Classe C 220d",
    year: 2020,
    price: 36800,
    mileage: 58000,
    fuel: "Diesel",
    transmission: "9G-Tronic",
    status: "online",
    aiCompletion: 92,
    platforms: ["autoscout24", "2ememain", "gocar"],
  },
  {
    id: "v5",
    make: "Peugeot",
    model: "308 SW",
    year: 2022,
    price: 24900,
    mileage: 33000,
    fuel: "Diesel",
    transmission: "EAT8",
    status: "sold",
    aiCompletion: 100,
    platforms: ["autoscout24"],
  },
];

export const MOCK_ACTIVITY = [
  {
    id: "a1",
    copilot: "Robin",
    action: "a publié le Golf GTI sur AutoScout24",
    time: "il y a 12 min",
    type: "publish",
  },
  {
    id: "a2",
    copilot: "Lana",
    action: "a retouché 4 photos du BMW 320d",
    time: "il y a 1h",
    type: "photo",
  },
  {
    id: "a3",
    copilot: "Robin",
    action: "a détecté 3 champs manquants sur l'Audi A3",
    time: "il y a 2h",
    type: "alert",
  },
  {
    id: "a4",
    copilot: "Pierre",
    action: "a généré le rapport mensuel de février",
    time: "hier",
    type: "report",
  },
  {
    id: "a5",
    copilot: "Robin",
    action: "a auto-rempli 94% de la fiche Mercedes C220d",
    time: "hier",
    type: "autofill",
  },
];

export const MOCK_STATS = {
  vehiclesOnline: 3,
  vehiclesDraft: 1,
  vehiclesSold: 1,
  avgAiCompletion: 90,
  publishedThisMonth: 8,
  platforms: 3,
};
