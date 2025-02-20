import React, { useState } from 'react';
import '../styles/Chatbot.css';

const Chatbot = ({ onClose }) => {
    const questions = [
        "I enjoy being in social gatherings.",
        "I prefer sticking to a planned schedule.",
        "I make decisions based on logic rather than emotions.",
        "I like trying new experiences spontaneously.",
        "I feel drained after spending too much time alone."
    ];

    const options = ["Agree", "Neutral", "Disagree"];

    const [chat, setChat] = useState([{ sender: "bot", text: "Hello! Let's discover your personality. Answer a few questions." }]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const handleOptionClick = (option) => {
        const newChat = [...chat, { sender: "user", text: option }];

        if (questionIndex < questions.length - 1) {
            newChat.push({ sender: "bot", text: questions[questionIndex + 1] });
            setQuestionIndex(questionIndex + 1);
        } else {
            newChat.push({ sender: "bot", text: "Thank you! Your personality type is being calculated..." });
        }

        setChat(newChat);
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h3>AI Personality Chat</h3>
                <button onClick={onClose}>✖</button>
            </div>
            <div className="chatbot-messages">
                {chat.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            {questionIndex < questions.length && (
                <div className="chatbot-options">
                    {options.map((option, index) => (
                        <button key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Chatbot;
