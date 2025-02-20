import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Test from './pages/Test';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<Test />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} /> {/* Ensure this is correct */}
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
};

export default App;
