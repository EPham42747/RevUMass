import React, { useEffect, useState } from "react";
import PictureBox from './compontents/PictureBox'; // Import PictureBox component
import "./styles/App.css"; // Make sure to import your CSS

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData("food");
  }, []);

  // Fetch data from MongoDB API
  const fetchData = async (table) => {
    try {
      const response = await fetch(`http://172.31.128.6:3001/${table}/`);
      const data = await response.json();
      setItems(data); // Set data to state
    } catch (error) {
      console.error("Error fetching data Error Code 512930102392190321: ", error);
    }
  };

  const handleClick = (event) => {
    const buttonText = event.target.id;
    try {
      fetchData(buttonText);
    } catch (error) {
      console.error("There was a minor inconvianve Fetching data: ", error);
    }
  };


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
          <section className="fixed_header">
            <h1>RevUMass</h1>
            <nav className="button-container">
              <button onClick={handleClick} id="food">Food</button>
              <button onClick={handleClick} id="dorms">Dorms</button>
              <button onClick={handleClick} id="studySpots">Study Spots</button>
            </nav>
          </section>
          <section className="picture-box-container">
            {items.map((item, index) => (
              <PictureBox
                key={index}
                image={item.imageUrl}
                title={item.title}
                description={item._id}
              />
            ))}
            <PictureBox
                key="0"
                image="/test_img.jpg"
                title="Fish Tacos"
                description="Description"
              />
              <PictureBox
                key="1"
                image="/test_img.jpg"
                title="Taco Casserole"
                description="Description"
              />
              <PictureBox
                key="2"
                image="/test_img.jpg"
                title="Pizza (Cheese)"
                description="Description"
              />
              <PictureBox
                key="3"
                image="/test_img.jpg"
                title="Pizza (Chicken)"
                description="Description"
              />
              <PictureBox
                key="4"
                image="/test_img.jpg"
                title="Ravioli"
                description="Description"
              />
              <PictureBox
                key="5"
                image="/test_img.jpg"
                title="Ramen"
                description="Description"
              />
              <PictureBox
                key="6"
                image="/test_img.jpg"
                title="Stir Fry"
                description="Description"
              />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
