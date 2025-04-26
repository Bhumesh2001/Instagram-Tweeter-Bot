const express = require('express');
const dotenv = require('dotenv');
const instagramRoutes = require('./routes/instagramRoutes');
const twitterRoutes = require('./routes/twitterRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/instagram', instagramRoutes);
app.use('/twitter', twitterRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
