const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const chatRouter = require('./routes/chat');
const calendarRouter = require('./routes/calendar');

const app = express();
const PORT = process.env.PORT || 8080;

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'", "https://apis.google.com"]
        }
    }
}));

// CORS setup
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL || false : '*'
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rate Limiting for API routes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        error: 'Too many requests',
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Routes
app.use('/api/chat', chatRouter);
app.use('/api/calendar', calendarRouter);

// Serve frontend for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
