const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema({
    personalityType: { type: String, required: true },  // Stores MBTI type (e.g., "ENTP")
    answers: { type: [String], required: true },       // Stores user's test answers (Agree/Neutral/Disagree)
    timestamp: { type: Date, default: Date.now }       // Saves when the test was taken
});

module.exports = mongoose.model("TestResult", TestResultSchema);
