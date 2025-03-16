const express = require('express');
const dotenv = require('dotenv');
const instagramRoutes = require('./routes/instagramRoutes');
const twitterRoutes = require('./routes/twitterRoutes');
const errorHandler = require('./middlewares/errorHandler');
const winston = require('winston');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

app.use(express.json());
app.use('/instagram', instagramRoutes);
app.use('/twitter', twitterRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
