import React from 'react';
import { User } from '../../shared/types';

interface PlayerPanelProps {
  user: User;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ user }) => (
  <div className="player-panel">
    <h3>{user.username}</h3>
    <div>Credits: {user.credits}</div>
    {/* Add more player info as needed */}
  </div>
);

export default PlayerPanel;
