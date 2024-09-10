import React, { useState } from "react";
import "./App.css"; // Make sure to import your CSS

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main class="background">
        {/* Use different containers for mobile and desktop */}
        <div className="desktop-layout">
          {/* Desktop specific layout components */}
          <h1>Desktop Layout (Work in Progress, please veiw on mobile, thank you! &lt;3)</h1>
        </div>
        <div className="mobile-layout" class="grid-container">
          {/* Mobile specific layout components */}
          <h1>RevUMass</h1>
          <nav>
            <HamburgerMenu />
          </nav>
          <section>
            HELLO
          </section>
        </div>
      </main>
    </div>
  );
}

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

export default App;
