require('dotenv').config();
const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // ✅ Add this

const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');

const app = express(); 

// ✅ Fix: Proper CORS configuration to allow credentials
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

// ✅ Fix: Store sessions in MongoDB instead of memory
app.use(session({
    secret: 'test_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions' // Store session data in 'sessions' collection
    }),
    cookie: { secure: false }  // Use `true` only for HTTPS
}));

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MongoDB connection string is missing! Check your .env file.");
    process.exit(1);
}

// ✅ Fix: Handle MongoDB connection errors
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes); 

app.get('/', (req, res) => res.send('Backend is working!')); 

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
