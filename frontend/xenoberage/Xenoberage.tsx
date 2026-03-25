import React from 'react';
import { useXenoberage } from './useXenoberage';
import PlayerPanel from './PlayerPanel';
import ShipPanel from './ShipPanel';
import PlanetPanel from './PlanetPanel';

const Xenoberage: React.FC = () => {
  const { player, ship, planet } = useXenoberage();

  return (
    <div className="ued-ingame-layout">
      <h2>Xenoberage</h2>
      {player && <PlayerPanel user={player} />}
      {ship && <ShipPanel ship={ship} />}
      {planet && <PlanetPanel planet={planet} />}
      {/* Add more Xenoberage UI and features here */}
    </div>
  );
};

export default Xenoberage;
