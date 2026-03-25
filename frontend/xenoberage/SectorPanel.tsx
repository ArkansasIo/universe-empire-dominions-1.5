import React from 'react';

interface SectorPanelProps {
  sectorId: string;
  // Add more sector-related props as needed
}

const SectorPanel: React.FC<SectorPanelProps> = ({ sectorId }) => (
  <div className="sector-panel">
    <h3>Sector {sectorId}</h3>
    {/* Add more sector info and controls as needed */}
  </div>
);

export default SectorPanel;
