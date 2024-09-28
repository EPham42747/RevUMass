import React, { useEffect, useState } from "react";
import PictureBox from './compontents/PictureBox'; // Import PictureBox component
import HamburgerMenu from "./compontents/HamburgerMenu"; // Import HamburgerMenu component
import "./styles/App.css"; // Make sure to import your CSS

function App() {
  const [items, setItems] = useState([]);

  // Fetch data from MongoDB API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_food = await fetch('http://172.31.128.6:3001/food/');
        const response_reviews = await fetch('http://172.31.128.6:3001/review/66eb1b2537e8362ce2bb7106/'); // Assume you have an API endpoint to fetch MongoDB data
        const data_food = await response_food.json();
        const data_reviews = await response_reviews.json();
        console.log(data_food);
        console.log(data_reviews);
        setItems(data_food); // Set data to state
      } catch (error) {
        console.error("Error fetching data HELLO: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        {/* Use different containers for mobile and desktop */}
        <div className="desktop-layout">
          {/* Desktop specific layout components */}
          <h1>Desktop Layout (Work in Progress, please veiw on mobile, thank you! &lt;3)</h1>
        </div>
        <div className="mobile-layout">
          {/* Mobile specific layout components */}
          <h1>RevUMass</h1>
          <nav>
            <button>Food</button>
            <button>Dorms</button>
            <button>Study Spots</button>
          </nav>
          <section className="picture-box-container">
            {items.map((item, index) => (
              <PictureBox
                key={index}
                image={item.imageUrl}
                title={item.title}
                description={item._id}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
