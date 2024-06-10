const axios = require('axios');

module.exports = {
    config: {
        name: "tiktstalk",
        author: "Gifted Tech",
        description: "Sends Users information",
        category: "sᴛᴀʟᴋᴇʀ",
        usage: ".tiktstalk",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const gift = args.join(' ');
        if (!gift) {
            bot.sendMessage(chatId, "Please provide your query. Usage: .tiktstalk <your_text>");
            return;
        }

        try {
            const apiUrl = `https://api.vihangayt.com/stalker/tiktok?q=${encodeURIComponent(gift)}`;
            const response = await axios.get(apiUrl);
            const giftech = response.data.result;

            bot.sendMessage(chatId, `𝗚𝗜𝗙𝗧𝗘𝗗-𝗠𝗗 𝗧𝗜𝗞𝗧𝗢𝗞 𝗦𝗧𝗔𝗟𝗞𝗘𝗥: \n\n${giftech}`);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, "An error occurred while processing the command.");
        }
    }
};
