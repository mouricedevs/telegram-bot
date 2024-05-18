const axios = require('axios');

module.exports = {
    config: {
        name: "gfx3",
        author: "Samir Œ",
        description: "Send an image ",
        category: "gfx",
        usage: "<prompt>",
        usePrefix: true
    },

    onStart: async function ({ bot, chatId, args }) {
        const prompt = args.join(' ');
         const prompt2 = args.join(' ');
       
        if (!prompt) {
            bot.sendMessage(chatId, "Please provide a prompt.");
            return;
        }

        try {
            const apiUrl = `https://apis-samir.onrender.com/gfx3?text1=${encodeURIComponent(prompt)}&text2=${encodeURIComponent(prompt2)}`;
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            const imageData = Buffer.from(response.data, 'binary');
            await bot.sendPhoto(chatId, imageData);
        } catch (error) {
            console.error('Error sending image:', error);
            bot.sendMessage(chatId, 'Sorry, an error occurred while sending the image.');
        }
    }
};
