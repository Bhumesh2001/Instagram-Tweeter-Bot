require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.summarizeCaption = async (caption) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('Missing OpenAI API key');
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',  // Change to 'gpt-4' if you have access
            messages: [
                { role: 'system', content: 'Summarize the caption for a tweet (280 chars max).' },
                { role: 'user', content: caption }
            ],
            max_tokens: 50
        });

        console.log("OpenAI Response:", JSON.stringify(response, null, 2));

        return response.choices[0]?.message?.content.trim() || 'No summary generated';
    } catch (error) {
        console.error("OpenAI API Error:", error.response?.data || error.message);
        return null;
    }
};
