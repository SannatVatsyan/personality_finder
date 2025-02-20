import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message Sent! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <motion.div className="contact-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h1>Contact Us</h1>
            <p>Have questions? We're here to help!</p>

            <form className="contact-form" onSubmit={handleSubmit}>
                <motion.input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    whileFocus={{ scale: 1.02 }}
                />
                <motion.input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    whileFocus={{ scale: 1.02 }}
                />
                <motion.textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    whileFocus={{ scale: 1.02 }}
                />
                <motion.button type="submit"
                    whileHover={{ scale: 1.05 }}
                >
                    Send Message
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Contact;
