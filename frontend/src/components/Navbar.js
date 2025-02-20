import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <motion.nav className="navbar"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="nav-logo">Personality Finder</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/test">Take Test</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/about">About</Link></li> 
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </motion.nav>
    );
};

export default Navbar;
