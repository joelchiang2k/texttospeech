import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="logo">
        <img src="https://elasticbeanstalk-us-east-1-797064849441.s3.amazonaws.com/logo.png" alt="Logo" />
        <span>Text2Speech</span>
      </div>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="link" onClick={toggleMenu}>
          Home
          <div className="bar"></div>
        </Link>
        <Link to="/about" className="link" onClick={toggleMenu}>
          About
          <div className="bar"></div>
        </Link>
        <Link to="/contact" className="link" onClick={toggleMenu}>
          Contact
          <div className="bar"></div>
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
};

export default Navbar;
