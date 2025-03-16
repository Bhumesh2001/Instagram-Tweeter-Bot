const { TwitterApi } = require('twitter-api-v2');

exports.postTweet = async (text) => {
    try {
        const client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET,
        });

        return await client.v2.tweet(text);
    } catch (error) {
        winston.error('Error posting tweet:', error);
        return null;
    }
};
