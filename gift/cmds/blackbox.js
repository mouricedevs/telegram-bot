const axios = require('axios');

module.exports = {
    config: {
        name: "blackbox",
        author: "Gifted Tech",
        description: "Send a response",
        category: "ᴀɪ",
        usage: "blackbox your_query",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const gift = args.join(' ');
        if (!gift) {
            bot.sendMessage(chatId, "Please provide your query. Usage: .blackbox <your_text>");
            return;
        }

        try {
            const apiUrl = `https://api.maher-zubair.tech/ai/blackbox?q=${encodeURIComponent(gift)}`;
            const response = await axios.get(apiUrl);
            const giftech = response.data.result;

            bot.sendMessage(chatId, `𝗚𝗜𝗙𝗧𝗘𝗗-𝗠𝗗 𝗕𝗟𝗔𝗖𝗞𝗕𝗢𝗫 𝗔𝗜: \n\n${giftech}`);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, "An error occurred while processing the command.");
        }
    }
};
