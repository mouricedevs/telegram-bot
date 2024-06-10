const axios = require('axios');

module.exports = {
    config: {
        name: "gemini",
        author: "Gifted Tech",
        description: "Send a response",
        category: "ᴀɪ",
        usage: ".gemini",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const gift = args.join(' ');
        if (!gift) {
            bot.sendMessage(chatId, "Please provide your query. Usage: .gemini <your_text>");
            return;
        }

        try {
            const apiUrl = `https://api.vihangayt.com/ai/gemini?q=${encodeURIComponent(gift)}`;
            const response = await axios.get(apiUrl);
            const giftech = response.data.result;

            bot.sendMessage(chatId, `𝗚𝗜𝗙𝗧𝗘𝗗-𝗠𝗗 𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜: \n\n${giftech}`);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, "An error occurred while processing the command.");
        }
    }
};
