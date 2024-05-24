const config = require('../../config.json');
const axios = require('axios');

module.exports = {
    config: {
        name: "gta",
        author: "Samir Œ",
        description: "Convert an image to a GTA style",
        cooldown: 55,
        category: "utility",
        usage: "Reply to an image",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, msg }) {
        if (!msg.reply_to_message || !msg.reply_to_message.photo) {
            return bot.sendMessage(chatId, "Please reply to a photo.");
        }

        try {
            const fileId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;

            const fileDetails = await bot.getFile(fileId);
            const fileLink = `https://api.telegram.org/file/bot${config.token}/${fileDetails.file_path}`;

            const gtaUrl = `https://apis-samir.onrender.com/togta?url=${fileLink}`;
            bot.sendPhoto(chatId, gtaUrl);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, "An error occurred while processing the command.");
        }
    }
};
