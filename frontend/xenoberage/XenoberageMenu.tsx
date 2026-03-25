import React from 'react';

interface XenoberageMenuProps {
  onNavigate: (section: string) => void;
}

const XenoberageMenu: React.FC<XenoberageMenuProps> = ({ onNavigate }) => (
  <nav className="xenoberage-menu">
    <ul>
      <li><button onClick={() => onNavigate('player')}>Player</button></li>
      <li><button onClick={() => onNavigate('ship')}>Ship</button></li>
      <li><button onClick={() => onNavigate('planet')}>Planet</button></li>
      <li><button onClick={() => onNavigate('sector')}>Sector</button></li>
      {/* Add more menu items as needed */}
    </ul>
  </nav>
);

export default XenoberageMenu;
