import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>

      <div
        className="dropdown"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button className="dropdown-btn" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isDropdownOpen}>
          Student
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/add-student" className="dropdown-link">Add Student</Link>
            <Link to="/students" className="dropdown-link">Get All Students</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;