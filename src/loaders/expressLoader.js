const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const authRoutes = require('../routes/auth/authRoutes');
const adminRoutes = require('../routes/admin/adminRoutes');
const portfolioRoutes = require('../routes/portfolio/portfolioRoutes');
const errorHandler = require('../middleware/errorMiddleware');



module.exports = (app) => {
    app.use(helmet());

    app.use(cors({
        origin:process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true
    }));

    app.use(express.json());
    app.use(cookieParser());

    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/portfolio', portfolioRoutes);

    app.use(errorHandler);
};