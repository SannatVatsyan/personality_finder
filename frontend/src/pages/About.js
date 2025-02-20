import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
    return (
        <motion.div className="about-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <section className="about-hero">
                <h1>About Personality Finder</h1>
                <p>Discover your true self with our AI-powered personality test.</p>
            </section>

            {/* About the Test Section */}
            <section className="about-section">
                <h2>🧠 What is the Personality Test?</h2>
                <p>Our personality test is based on the **Myers-Briggs Type Indicator (MBTI)**, a well-known psychological model that categorizes individuals into 16 personality types. It helps you understand your strengths, preferences, and behaviors in various situations.</p>
            </section>

            <section className="about-section">
                <h2>📋 How Does It Work?</h2>
                <p>The test consists of **a series of carefully designed questions** that assess your choices in different scenarios. Your answers determine where you fall on four key spectrums:</p>
                <ul>
                    <li>🔹 **Introversion (I) vs. Extraversion (E)** – How you interact with the world.</li>
                    <li>🔹 **Sensing (S) vs. Intuition (N)** – How you process information.</li>
                    <li>🔹 **Thinking (T) vs. Feeling (F)** – How you make decisions.</li>
                    <li>🔹 **Judging (J) vs. Perceiving (P)** – How you organize your life.</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>🎯 Why Take This Test?</h2>
                <p>Understanding your personality type can **improve your relationships, career choices, and decision-making**. Companies and psychologists use this model to help people find roles that suit their strengths and communication styles.</p>
            </section>
        </motion.div>
    );
};

export default About;
