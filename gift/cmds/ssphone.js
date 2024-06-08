const axios = require("axios");

module.exports = {
    config: {
        name: "ss",
        author: "Gifted Tech",
        description: "Get phone sized screenshot",
        category: "ᴜᴛɪʟɪᴛʏ",
        usage: "<url_link>",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const query = args.join(" ");

        if (!query) {
            return bot.sendMessage(chatId, `Please provide a url to screenshot. Usage: .ss [url_link]`);
        }

        const searchMessage = await bot.sendMessage(chatId, `🔍 Capturing Screenshot: ${query}`);

        try {
            const response = await axios.get(`https://api.maher-zubair.tech/misc/ssphone?url=${encodeURIComponent(query)}`);
            const { screenshot } = response.data;

            await bot.sendMessage(chatId, `HERE WE GO: ${screenshot}`);
            await bot.sendPhoto(chatId, image);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while capturing screenshot.');
        }

        await bot.deleteMessage(chatId, searchMessage.message_id);
    }
};
