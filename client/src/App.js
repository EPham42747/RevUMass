import React, { useEffect, useState } from "react";
import PictureBox from './PictureBox'; // Import PictureBox component
import "./App.css"; // Make sure to import your CSS

function App() {
  const [items, setItems] = useState([]);

  // Fetch data from MongoDB API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('128.119.202.9:3001/'); // Assume you have an API endpoint to fetch MongoDB data
        const data = await response.json();
        console.log(data);
        setItems(data); // Set data to state
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
        <div className="mobile-layout">
          {/* Mobile specific layout components */}
          <h1>RevUMass</h1>
          <nav>
            <HamburgerMenu />
          </nav>
          <section className="picture-box-container">
            {items.map((item, index) => (
              <PictureBox
                key={index}
                image={item.imageUrl}
                title={item.title}
                description={item.description}
              />
            ))}
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
