const axios = require('axios');

module.exports = {
    config: {
        name: "niji",
        author: "Samir Œ",
        description: "Send an image using the XL API",
        category: "image",
        usage: "<prompt> | <resolution>",
        usePrefix: true,
        role: 0
    },

    onStart: async function ({ bot, chatId, args }) {
        const input = args.join(' ');
        const [prompt, resolution = '1:1'] = input.split('|').map(s => s.trim());

        if (!prompt) {
            bot.sendMessage(chatId, "Please provide a prompt.");
            return;
        }

        try {
            const apiUrl = `https://apis-samir.onrender.com/niji?prompt=${encodeURIComponent(prompt)}&resolution=${encodeURIComponent(resolution)}`;
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            const imageData = Buffer.from(response.data, 'binary');
            await bot.sendPhoto(chatId, imageData);
        } catch (error) {
            console.error('Error sending image:', error);
            bot.sendMessage(chatId, 'Sorry, an error occurred while sending the image.');
        }
    }
};
