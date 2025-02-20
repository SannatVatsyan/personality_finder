const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    personalityType: String,
    answers: [String],
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResult', UserSchema);
