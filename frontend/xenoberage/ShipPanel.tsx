import React from 'react';
import { Ship } from '../../shared/types';

interface ShipPanelProps {
  ship: Ship;
}

const ShipPanel: React.FC<ShipPanelProps> = ({ ship }) => (
  <div className="ship-panel">
    <h3>{ship.name}</h3>
    <div>Hull: {ship.hull}</div>
    <div>Engines: {ship.engines}</div>
    {/* Add more ship info as needed */}
  </div>
);

export default ShipPanel;
