const axios = require('axios');

module.exports = {
    config: {
        name: "gpt4",
        author: "Gifted Tech",
        description: "Send a link of the replied file",
        category: "ᴀɪ",
        usage: "sendgptrrsponse",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const gift = args.join(' ');
        if (!gift) {
            bot.sendMessage(chatId, "Please provide a prompt.");
            return;
        }

        try {
            const apiUrl = `https://api.maher-zubair.tech/ai/chatgpt4?q=${encodeURIComponent(gift)}`;
            const response = await axios.get(apiUrl);
            const gifted = response.data;

            bot.sendMessage(chatId, `GPT4 RESPONSE: ${gifted}`);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, "An error occurred while processing the command.");
        }
    }
};
