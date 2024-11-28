import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/styles.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="background-container">
        <main>
          <div className="hero-section">
            <h1>Welcome to Hi-Fi Cars</h1>
            <p>Your one-stop destination for buying and selling cars.</p>
            <Link to="/cars" className="btn">View Cars</Link>
          </div>

        </main>
      </div>
    </div>
  );
};

export default HomePage;