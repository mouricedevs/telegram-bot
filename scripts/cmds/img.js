const axios = require('axios');

module.exports = {
    config: {
        name: "sendimage",
        author: "Samir Œ",
        description: "Send an image",
        category: "image",
        usage: "",
    },

    onStart: async function ({ bot, chatId }) {
        const imageUrl = 'https://telegra.ph/file/3266222440a6d7410c035.jpg';
        try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageData = Buffer.from(response.data, 'binary');
            await bot.sendPhoto(chatId, imageData);
        } catch (error) {
            console.error('Error sending image:', error);
            bot.sendMessage(chatId, 'Sorry, an error occurred while sending the image.');
        }
    }
};
