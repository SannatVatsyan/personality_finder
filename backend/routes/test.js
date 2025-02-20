const express = require('express');
const TestResult = require('../models/User'); // Corrected schema import
const router = express.Router();

// Myers-Briggs Personality Calculation
const calculateMBTI = (answers) => {
    if (!answers || answers.length !== 10) {
        return "Unknown"; // Invalid or incomplete test
    }

    let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    const questionsMapping = ["E", "N", "T", "J", "E", "N", "T", "J", "I", "S"];

    answers.forEach((answer, index) => {
        if (answer === "Agree") {
            scores[questionsMapping[index]] += 1;
        } else if (answer === "Disagree") {
            scores[
                questionsMapping[index] === "E" ? "I" :
                questionsMapping[index] === "I" ? "E" :
                questionsMapping[index] === "S" ? "N" :
                questionsMapping[index] === "N" ? "S" :
                questionsMapping[index] === "T" ? "F" :
                questionsMapping[index] === "F" ? "T" :
                questionsMapping[index] === "J" ? "P" :
                "J"
            ] += 1;
        }
    });

    return `${scores["E"] > scores["I"] ? "E" : "I"}${scores["S"] > scores["N"] ? "S" : "N"}${scores["T"] > scores["F"] ? "T" : "F"}${scores["J"] > scores["P"] ? "J" : "P"}`;
};

// ✅ Save Test Result to MongoDB Instead of Sessions
router.post('/submit', async (req, res) => {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length !== 10) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        const personalityType = calculateMBTI(answers);
        const newTestResult = new TestResult({
            personalityType,
            answers,
        });

        await newTestResult.save(); // Save to MongoDB

        console.log("✅ Test saved:", newTestResult);
        res.json({ message: "Test completed", result: newTestResult });
    } catch (error) {
        console.error("Error saving test result:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Fetch Last Test Result from MongoDB
router.get('/last-result', async (req, res) => {
    try {
        const lastTest = await TestResult.findOne().sort({ timestamp: -1 }); // Get the most recent test result

        if (!lastTest) {
            console.log("❌ No test results found in database");
            return res.status(404).json({ message: "No results found" });
        }

        console.log("✅ Fetching last test result:", lastTest);
        return res.json({ result: lastTest });
    } catch (error) {
        console.error("Error fetching last result:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
