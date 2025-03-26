# Instagram to Twitter Bot (Node.js)

## 📌 Project Overview

This project is a **Node.js-based automation tool** that:

- Fetches the latest Instagram post (image + caption) from `bbcnews`.
- Summarizes the caption into a **tweet-friendly format** using OpenAI.
- Posts the tweet to **X.com (Twitter)** automatically.
- Follows the **MVC pattern** for scalability and maintainability.
- Implements **centralized error handling** and **response standardization**.

---

## 📂 Folder Structure

```
/instagram-twitter-bot
├── controllers
│   ├── instagramController.js
│   ├── twitterController.js
├── services
│   ├── instagramService.js
│   ├── twitterService.js
│   ├── aiService.js
├── middlewares
│   ├── errorHandler.js
├── utils
│   ├── responseConstants.js
├── routes
│   ├── instagramRoutes.js
│   ├── twitterRoutes.js
├── .env
├── package.json
├── server.js
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```sh
$ git clone https://github.com/your-repo/instagram-twitter-bot.git
$ cd instagram-twitter-bot
```

### 2️⃣ Install dependencies

```sh
$ npm install
```

### 3️⃣ Set up environment variables

Create a **.env** file and add the following:

```
OPENAI_API_KEY=your_openai_key
TWITTER_API_KEY=your_twitter_key
TWITTER_API_SECRET=your_twitter_secret
TWITTER_ACCESS_TOKEN=your_twitter_token
TWITTER_ACCESS_SECRET=your_twitter_secret
RAPIDAPI_KEY=your-rapidapi-key
RAPIDAPI_HOST=your-rapid-host
```

### 4️⃣ Start the server

```sh
$ node server.js
```

---

## 🛠 API Endpoints

### 📥 Fetch Instagram Post

- **Endpoint:** `GET /instagram/fetch`
- **Description:** Retrieves the latest Instagram post from `bbcnews`.
- **Response:**

```json
{
  "success": true,
  "data": {
    "imageUrl": "https://instagram.com/example.jpg",
    "caption": "Breaking News: ..."
  }
}
```

### 📝 Summarize & Post Tweet

- **Endpoint:** `POST /twitter/tweet`
- **Description:** Summarizes the Instagram caption and posts it to Twitter.
- **Response:**

```json
{
  "success": true,
  "tweet": {
    "id": "1234567890",
    "text": "Breaking News: Major event happening now! #News"
  }
}
```

---

## 🔧 Technologies Used

- **Node.js** - Backend framework
- **Express.js** - API handling
- **RapidAI** - Rapid API(library)
- **OpenAI API** - Caption summarization
- **Twitter API (twitter-api-v2)** - Tweet posting
- **Winston** - Logging
- **dotenv** - Environment variables

---

## 🎯 Features

✅ **Fetch Instagram Post** – Retrieves latest post from `bbcnews`
✅ **Summarize Caption** – Uses AI to generate tweet-friendly captions
✅ **Post Tweet** – Automatically posts the summary to X.com
✅ **Centralized Error Handling** – Ensures robust debugging
✅ **Modular MVC Structure** – Scalable and maintainable
✅ **Secure API Integration** – Uses environment variables for credentials

---

## 📌 Future Enhancements

🔹 Add **OAuth authentication** for secure API requests
🔹 Improve **web scraping** to support more Instagram pages
🔹 Enhance AI summarization using **fine-tuned models**
🔹 Implement **rate limiting** for API calls

---

## 🤝 Contributing

Feel free to contribute! Submit a PR or open an issue.

---

## 📜 License

MIT License © 2025. Happy coding! 🚀
