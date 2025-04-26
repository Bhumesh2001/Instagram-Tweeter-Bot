// require('dotenv').config();
// const OpenAI = require('openai');

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// exports.summarizeCaption = async (caption) => {
//     try {
//         if (!process.env.OPENAI_API_KEY) {
//             throw new Error('Missing OpenAI API key');
//         }

//         const response = await openai.chat.completions.create({
//             model: 'gpt-3.5-turbo',  // Change to 'gpt-4' if you have access
//             messages: [
//                 { role: 'system', content: 'Summarize the caption for a tweet (280 chars max).' },
//                 { role: 'user', content: caption }
//             ],
//             max_tokens: 50
//         });

//         console.log("OpenAI Response:", JSON.stringify(response, null, 2));

//         return response.choices[0]?.message?.content.trim() || 'No summary generated';
//     } catch (error) {
//         console.error("OpenAI API Error:", error.response?.data || error.message);
//         return null;
//     }
// };

const axios = require('axios');

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

exports.summarizeCaption = async (caption) => {
    try {
        // 1. Handle long inputs
        if (caption.length > 1000) {
            caption = caption.substring(0, 1000) + "... [truncated]";
        }

        // 2. Make API call
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/t5-small?wait_for_model=true',
            {
                inputs: `summarize: ${caption}`,
                parameters: {
                    max_length: 150, // Control summary length
                    do_sample: true  // Better for creative summaries
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000 // 10-second timeout
            }
        );

        // 3. Process response (T5 returns generated_text)
        const summary = response.data?.[0]?.generated_text || caption.slice(0, 280);
        return summary.trim();

    } catch (error) {
        console.error("Summarization Error:",
            error.response?.data ? JSON.stringify(error.response.data) : error.message
        );
        // Fallback: return first 280 chars if API fails
        return caption.slice(0, 280);
    }
};
