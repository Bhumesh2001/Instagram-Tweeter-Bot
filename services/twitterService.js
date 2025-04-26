const Twitter = require("twitter-lite");
require("dotenv").config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});

exports.postTweet = async (text) => {
    try {
        const response = await client.post("statuses/update", { status: text });
        console.log("✅ Tweet posted:", response.text);
        return response;
    } catch (error) {
        console.error("❌ Error posting tweet:", error);
        return null;
    }
};