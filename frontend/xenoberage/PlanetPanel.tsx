import React from 'react';
import { Planet } from '../../shared/types';

interface PlanetPanelProps {
  planet: Planet;
}

const PlanetPanel: React.FC<PlanetPanelProps> = ({ planet }) => (
  <div className="planet-panel">
    <h3>{planet.name}</h3>
    <div>Sector: {planet.sectorId}</div>
    {/* Add more planet info as needed */}
  </div>
);

export default PlanetPanel;
