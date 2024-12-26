
import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const [bgColor, setBgColor] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle background color
  const toggleColor = () => {
    const newColor = bgColor === 'light' ? 'dark' : 'light';
    setBgColor(newColor);

    // Change the body background color as well
    document.body.style.backgroundColor = newColor === 'light' ? '#f8f9fa' : '#343a40';
  };

  useEffect(() => {
    // Set the initial body background color when the page loads
    document.body.style.backgroundColor = '#f8f9fa'; // Default light background color
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-${bgColor} bg-${bgColor}`}>
      <div className="container-fluid">
        {/* Left-aligned Home link */}
        <Link className="navbar-brand" to="/"><i class="bi bi-bank"></i></Link>

        {/* Hamburger icon for mobile view */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={isMenuOpen ? 'true' : 'false'} aria-label="Toggle navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-secondary" onClick={toggleColor}>
                Toggle Color
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
