import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__logo">Jabez Collano</div>
      <ul className="navbar__links">
        <li><a href="#workflows">Work</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#cases">Cases</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="navbar__cta">Book a Call</button>
    </nav>
  );
}
