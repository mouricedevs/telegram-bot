const axios = require("axios");

module.exports = {
    config: {
        name: "gpt4",
        author: "Gifted Tech",
        description: "Get phone sized screenshot",
        category: "ᴀɪ",
        usage: "<question>",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const query = args.join(" ");

        if (!query) {
            return bot.sendMessage(chatId, `Please provide your query. Usage: .gpt4 [query]`);
        }

        const searchMessage = await bot.sendMessage(chatId, `🔍 Analysing Response: ${query}`);

        try {
            const response = await axios.get(`https://api.vihangayt.com/ai/chatgpt-4?q=${encodeURIComponent(query)}`);
            const { gifted } = response.data;

            await bot.sendMessage(chatId, `GIFTED CHAT GPT4:\n\n ${gifted}`);
            await bot.sendPhoto(chatId, image);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error communicating with GPT-4 APi.');
        }

        await bot.deleteMessage(chatId, searchMessage.message_id);
    }
};
