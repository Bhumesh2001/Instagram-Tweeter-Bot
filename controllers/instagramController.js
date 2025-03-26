const instagramService = require('../services/instagramService');
const responseConstants = require('../utils/responseConstants');

exports.fetchLatestPost = async (req, res, next) => {
    try {
        const post = await instagramService.fetchInstagramPost();
        if (post) res.json({ ...responseConstants.SUCCESS, data: post });
        else throw new Error(responseConstants.ERROR_FETCH_POST.message);
    } catch (error) {
        next(error);
    }
};
