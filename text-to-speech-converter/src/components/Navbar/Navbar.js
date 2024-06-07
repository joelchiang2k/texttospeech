import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        Text2Speech
      </div>
      <div className="menu"> 
        <Link to="/" className="link">
          <div className="title">Home</div>
          <div className="bar"></div>
        </Link>
        <Link to="/about" className="link">
          <div className="title">About</div>
          <div className="bar"></div>
        </Link>
        <Link to="/contact" className="link">
          <div className="title">Contact</div>
          <div className="bar"></div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
