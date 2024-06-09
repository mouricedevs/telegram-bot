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
            const giftech = response.data;
            const giftke = `
            **GPT4 RESPONSE:** ${giftech}
            `.trim();

            await bot.sendMessage(chatId, giftke, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error('Error fetching gpt4 response data:', error);
            bot.sendMessage(chatId, '⚠️ Sorry, an error occurred while fetching the weather data.');
        }
    }
};
