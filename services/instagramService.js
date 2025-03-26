require('dotenv').config();
const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://instagram-data1.p.rapidapi.com/user/posts',
    params: { username: 'bbcnews' },
    headers: {
        'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': `${process.env.RAPIDAPI_HOST}`
    }
};

exports.fetchInstagramPost = async () => {
    try {
        const response = await axios.request(options);
        let postData = [];
        for (let item of response.data.items) {
            let captionText = item.caption?.text
                ? item.caption.text
                    .replace(/[\n\\]+/g, ' ')  // Remove \n and \ 
                    .replace(/\"/g, '')  // Remove \" double quotes
                    .replace(/\s+/g, ' ')  // Remove extra spaces
                    .trim()
                : 'No caption available';
            let imageUrl = item.display_uri || 'No image available';
            postData.push({ caption: captionText, postUrl: imageUrl });
            break;
        }
        // fs.writeFileSync('instagram_posts.json', JSON.stringify(postData, null, 4));
        // console.log('Data saved successfully...!');
        return postData[0];

    } catch (error) {
        console.error(error);
    };
};