module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging

    let statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed: ' + Object.values(err.errors).map(e => e.message).join(', ');
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token. Please log in again.';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Session expired. Please log in again.';
    } else if (err.code === 11000) { // MongoDB duplicate key error
        statusCode = 400;
        message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`;
    } else if (err.response && err.response.data) {
        // Handle external API errors (like OpenAI, Instagram Graph API, etc.)
        statusCode = err.response.status || 500;
        message = err.response.data.error || 'External API error';
    } else if (err.name === 'SyntaxError') {
        statusCode = 400;
        message = 'Invalid JSON payload';
    }

    res.status(statusCode).json({
        success: false,
        message: message
    });
};
