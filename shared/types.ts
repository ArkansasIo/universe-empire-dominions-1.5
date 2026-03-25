// Shared TypeScript interfaces for XenobeRage

export interface User {
  id: string;
  username: string;
  email: string;
  credits: number;
  fullName?: string;
  facebookId?: string;
  lastLogin?: string;
  // Add more user fields as needed
}

export interface Ship {
  id: string;
  name: string;
  ownerId: string;
  hull: number;
  engines: number;
  beams: number;
  shields: number;
  armor: number;
  torpedoes: number;
  fighters: number;
  energy: number;
  sectorId?: string;
  planetId?: string;
  turns?: number;
  turnsUsed?: number;
  score?: number;
  credits?: number;
  // Add more ship fields as needed
}

export interface Planet {
  id: string;
  name: string;
  ownerId: string;
  sectorId: string;
  colonists?: number;
  organics?: number;
  ore?: number;
  goods?: number;
  energy?: number;
  fighters?: number;
  torpedoes?: number;
  base?: boolean;
  defeated?: boolean;
  // Add more planet fields as needed
}
  colonists: number;
  energy: number;
  ore: number;
  goods: number;
  organics: number;
  fighters: number;
  torpedoes: number;
  shields: number;
  // ...other planet fields
}

export interface Sector {
  id: string;
  name: string;
  links: string[];
  // ...other sector fields
}

export interface CombatResult {
  attackerId: string;
  defenderId: string;
  outcome: 'win' | 'lose' | 'draw';
  details: string;
  // ...other combat fields
}
