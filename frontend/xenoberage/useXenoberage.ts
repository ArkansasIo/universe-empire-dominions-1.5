import { useState, useEffect } from 'react';
import type { User, Ship, Planet } from '../../shared/types';

export interface XenoberageState {
  status: string;
  feature: string;
}

export function useXenoberage() {
  const [player, setPlayer] = useState<User | null>(null);
  const [ship, setShip] = useState<Ship | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  // Add more state as needed

  useEffect(() => {
    // Fetch player data
    fetch('/api/xenoberage/player')
      .then(res => res.json())
      .then(setPlayer);
    // Fetch ship data
    fetch('/api/xenoberage/ship')
      .then(res => res.json())
      .then(setShip);
    // Fetch planet data
    fetch('/api/xenoberage/planet')
      .then(res => res.json())
      .then(setPlanet);
  }, []);

  return { player, ship, planet };
}
