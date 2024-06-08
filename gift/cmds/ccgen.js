const axios = require("axios");

module.exports = {
    config: {
        name: "gen",
        author: "Gifted Tech",
        description: "Generates Heroku Credit Cards",
        category: "ᴜᴛɪʟɪᴛʏ",
        usage: "<bin_number>",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const query = args.join(" ");

        if (!query) {
            return bot.sendMessage(chatId, `Please provide a bin number. Usage: .gen [bin_number]`);
        }

        const searchMessage = await bot.sendMessage(chatId, `🔍 Generating Heroku CC from Bin: ${query}`);

        try {
            const response = await axios.get(`https://api.maher-zubair.tech/misc/bingen?query=${encodeURIComponent(query)}`);
            const { ccbin } = response.data;

            await bot.sendMessage(chatId, `HERE WE GO: ${ccbin}`);
            await bot.sendPhoto(chatId, image);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while generating cc');
        }

        await bot.deleteMessage(chatId, searchMessage.message_id);
    }
};
