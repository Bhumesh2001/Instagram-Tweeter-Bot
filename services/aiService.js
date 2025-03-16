const OpenAI = require('openai');
const winston = require('winston');

exports.summarizeCaption = async (caption) => {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const response = await openai.complete({
            model: 'gpt-4',
            prompt: `Summarize this caption into a concise tweet (280 characters max): ${caption}`,
            max_tokens: 50,
        });
        return response.choices[0].text.trim();
    } catch (error) {
        winston.error('Error summarizing caption:', error);
        return null;
    }
};
