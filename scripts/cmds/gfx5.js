const axios = require('axios');

module.exports = {
    config: {
        name: "gfx5",
        author: "Samir Œ",
        description: "Send an image ",
        category: "gfx",
        usage: "<prompt>",
        usePrefix: true
    },

    onStart: async function ({ bot, chatId, args }) {
        const prompt = args.join(' ');
        if (!prompt) {
            bot.sendMessage(chatId, "Please provide a prompt.");
            return;
        }

        try {
            const apiUrl = `https://apis-samir.onrender.com/gfx5?name=${encodeURIComponent(prompt)}`;
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            const imageData = Buffer.from(response.data, 'binary');
            await bot.sendPhoto(chatId, imageData);
        } catch (error) {
            console.error('Error sending image:', error);
            bot.sendMessage(chatId, 'Sorry, an error occurred while sending the image.');
        }
    }
};
