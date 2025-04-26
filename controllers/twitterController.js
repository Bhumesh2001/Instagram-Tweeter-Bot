const twitterService = require('../services/twitterService');
const aiService = require('../services/aiService');
const instagramService = require('../services/instagramService');
const responseConstants = require('../utils/responseConstants');

exports.postTweet = async (req, res, next) => {
    try {
        const post = await instagramService.fetchInstagramPost();
        if (!post) throw new Error(responseConstants.ERROR_FETCH_POST.message);

        const tweetText = await aiService.summarizeCaption(post.caption);
        if (!tweetText) throw new Error(responseConstants.ERROR_SUMMARIZATION.message);

        const tweet = await twitterService.postTweet(tweetText);
        if (tweet) res.json({ ...responseConstants.SUCCESS, data: tweet });
        else throw new Error(responseConstants.ERROR_TWEET.message);
    } catch (error) {
        next(error);
    }
};
