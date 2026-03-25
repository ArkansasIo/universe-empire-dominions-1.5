// Shared TypeScript interfaces for XenobeRage

export interface User {
  id: string;
  username: string;
  email: string;
  credits: number;
  // ...other user fields
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
  // ...other ship fields
}

export interface Planet {
  id: string;
  name: string;
  ownerId: string;
  sectorId: string;
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
