// Combat logic for Xenoberage (TypeScript port)
import { Ship, Planet } from '../../shared/types';

export class CombatService {
  // Example: Calculate planet beams
  static calcPlanetBeams(planet: Planet, ownerBeams: number, baseDefense: number, shipsOnPlanet: Ship[]): number {
    let planetBeams = ownerBeams + (planet.base ? baseDefense : 0);
    for (const ship of shipsOnPlanet) {
      planetBeams += ship.beams;
    }
    planetBeams = Math.min(planetBeams, planet.energy);
    // TODO: Deduct used energy from planet
    return planetBeams;
  }

  // Example: Calculate planet torpedoes
  static calcPlanetTorps(planet: Planet, ownerTorpLaunchers: number, baseDefense: number, shipsOnPlanet: Ship[], levelFactor: number): number {
    let torpLaunchers = Math.round(Math.pow(levelFactor, ownerTorpLaunchers + (planet.base ? baseDefense : 0))) * 10;
    for (const ship of shipsOnPlanet) {
      torpLaunchers += Math.round(Math.pow(levelFactor, ship.torpedoes)) * 10;
    }
    const planettorps = Math.min(torpLaunchers, planet.torpedoes);
    // TODO: Deduct used torpedoes from planet
    return planettorps;
  }

  // Example: Calculate planet shields
  static calcPlanetShields(planet: Planet, ownerShields: number, baseDefense: number, shipsOnPlanet: Ship[]): number {
    let planetShields = ownerShields + (planet.base ? baseDefense : 0);
    for (const ship of shipsOnPlanet) {
      planetShields += ship.shields;
    }
    planetShields = Math.min(planetShields, planet.energy);
    // TODO: Deduct used energy from planet
    return planetShields;
  }

  // Add more combat logic as needed
}
