const axios = require("axios");

module.exports = {
    config: {
        name: "gpt",
        author: "Samir Œ",
        description: "Generate text using GPT API",
        category: "text",
        usage: "gpt <prompt>",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const prompt = args.join(" ");

        if (!prompt) {
            return bot.sendMessage(chatId, "Please provide a prompt. Usage: /gpt <prompt>");
        }

        try {
            const apiUrl = `https://apis-samir.onrender.com/gpt?content=${encodeURIComponent(prompt)}`;
            const response = await axios.get(apiUrl);
            const generatedText = response.data.message.content;

            bot.sendMessage(chatId, generatedText, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error("Error generating text:", error);
            bot.sendMessage(chatId, "An error occurred while generating text. Please try again later.");
        }
    }
};
