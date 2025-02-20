import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot'; // Import the chatbot
import '../styles/Home.css';

const Home = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const navigate = useNavigate();

    const shareResults = (platform) => {
        const resultLink = `${window.location.origin}/dashboard`; // Assuming results are on dashboard
        
        if (platform === 'copy') {
            navigator.clipboard.writeText(resultLink);
            alert("Link copied! You can share your personality result with friends.");
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${resultLink}`, '_blank');
        } else if (platform === 'whatsapp') {
            window.open(`https://api.whatsapp.com/send?text=Check out my personality test results: ${resultLink}`, '_blank');
        }
    };

    return (
        <motion.div className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Hero Section */}
            <section className="hero">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Discover Your True Personality
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    Take our AI-powered personality test and find out where you fit in.
                </motion.p>
                <Link to="/test">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cta-button"
                    >
                        Take the Test
                    </motion.button>
                </Link>
            </section>

            {/* Feature Section */}
            <section className="features">
                <motion.div className="feature-box"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowChatbot(true)} // Open Chatbot
                >
                    <h2>🔍 AI-Based Analysis</h2>
                    <p>Chat with our AI and answer personality questions.</p>
                </motion.div>

                <motion.div className="feature-box"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/dashboard')} // Open Dashboard
                >
                    <h2>📊 Interactive Dashboard</h2>
                    <p>Visualize your personality breakdown in an engaging way.</p>
                </motion.div>

                <motion.div className="feature-box share-container" whileHover={{ scale: 1.05 }} onClick={() => setShowShareModal(true)}>
                    <h2>📤 Share with Friends</h2>
                    <p>Let others know about your personality type.</p>
                </motion.div>
            </section>

            {/* Share Modal */}
            {showShareModal && (
                <div className="share-modal">
                    <div className="share-modal-content">
                        <h3>Share Your Result</h3>
                        <button onClick={() => shareResults('copy')} className="share-button">Copy Link</button>
                        <button onClick={() => shareResults('facebook')} className="share-button">Share on Facebook</button>
                        <button onClick={() => shareResults('whatsapp')} className="share-button">Share on WhatsApp</button>
                        <button onClick={() => setShowShareModal(false)} className="close-button">Close</button>
                    </div>
                </div>
            )}

            {/* Chatbot Component */}
            {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 Personality Finder. All rights reserved.</p>
            </footer>
        </motion.div>
    );
};

export default Home;
