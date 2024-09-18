import React, {useState} from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="hamburger-menu">
        <button className="hamburger-icon" onClick={toggleMenu}>
          ☰
        </button>
        {isOpen && (
          <div className="menu-dropdown">
            <button className="menu-button">Food</button>
            <button className="menu-button">Study Spots</button>
            <button className="menu-button">Dorms</button>
          </div>
        )}
      </div>
    );
  };

export default HamburgerMenu;