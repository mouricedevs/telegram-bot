const axios = require('axios');

module.exports = {
    config: {
        name: "gpt4",
        author: "Gifted Tech",
        description: "Fetch and display gpt4 response",
        category: "ᴀɪ",
        usage: "gpt4 <prompt>",
        usePrefix: true,
        role: 0
    },

    onStart: async function ({ bot, chatId, args }) {
        const city = args.join(' ');

        if (!prompt) {
            bot.sendMessage(chatId, "Please provide your query.");
            return;
        }

        try {
            const apiUrl = `https://api.vihangayt.com/ai/chatgpt-4?q=${encodeURIComponent(prompt)}`;
            const response = await axios.get(apiUrl);
            const gptData = response.data;

            const message = ` **GIFTED GPT4:** ${gptData}`.trim();

            await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error('Error fetching api data:', error);
            bot.sendMessage(chatId, '⚠️ Sorry, an error occurred while fetching gpt4 api response data.');
        }
    }
};
