import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Test.css'; // Apple-like styling

const questions = [
    "You find it easy to introduce yourself to others.",
    "You often get lost in deep thoughts, even ignoring your surroundings.",
    "You feel comfortable initiating conversations with new people.",
    "You prefer detailed planning over spontaneous activities.",
    "You often find yourself daydreaming about different possibilities.",
    "You enjoy being the center of attention at social events.",
    "You rely more on logic than emotions when making decisions.",
    "You tend to focus more on the big picture rather than small details.",
    "You feel drained after extended periods of social interaction.",
    "You prefer working alone rather than in a group."
];

const Test = () => {
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem("user")); // Assuming login system

    const handleAnswer = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        const calculatedType = "ExampleType"; // Replace with actual logic
        const response = await fetch('http://localhost:5002/api/test/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: loggedInUser ? loggedInUser.id : null, 
                personalityType: calculatedType,
                answers: answers,
            })
        });

        const data = await response.json();
        console.log("Test result:", data);
        setSubmitted(true);
    };

    return (
        <div className="test-container">
            <motion.h1 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
                className="title"
            >
                Personality Test
            </motion.h1>
            {questions.map((q, index) => (
                <motion.div 
                    key={index} 
                    className="question" 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <p>{q}</p>
                    <div className="options">
                        <button className={answers[index] === "Agree" ? "selected" : ""} onClick={() => handleAnswer(index, "Agree")}>Agree</button>
                        <button className={answers[index] === "Neutral" ? "selected" : ""} onClick={() => handleAnswer(index, "Neutral")}>Neutral</button>
                        <button className={answers[index] === "Disagree" ? "selected" : ""} onClick={() => handleAnswer(index, "Disagree")}>Disagree</button>
                    </div>
                </motion.div>
            ))}
            <motion.button 
                className="submit-btn" 
                onClick={handleSubmit} 
                disabled={submitted}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            >
                {submitted ? "Submitted ✅" : "Submit"}
            </motion.button>
        </div>
    );
};

export default Test;
