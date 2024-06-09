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
            bot.sendMessage(chatId, "Please provide your query. Usage: .gpt4 <your_text>");
            return;
        }

        try {
            const apiUrl = `https://api.maher-zubair.tech/ai/chatgpt4?q=${encodeURIComponent(gift)}`;
            const response = await axios.get(apiUrl);
            const giftech = response.data.result;

            bot.sendMessage(chatId, `**GPT4 RESPONSE:** \n\n ${giftech}`);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, "An error occurred while processing the command.");
        }
    }
};
