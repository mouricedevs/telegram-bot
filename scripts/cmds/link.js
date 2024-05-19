const config = require('../../config.json');
const axios = require('axios');

module.exports = {
    config: {
        name: "link",
        author: "Samir Œ",
        description: "Send a link to the replied file",
        category: "utility",
        usage: "sendfilelink",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, msg }) {
        if (!msg.reply_to_message || !(msg.reply_to_message.audio || msg.reply_to_message.video || msg.reply_to_message.photo)) {
            return bot.sendMessage(chatId, "Please reply to an audio, video, or photo message to send its file link.");
        }

        try {
            const fileId = msg.reply_to_message.audio ? msg.reply_to_message.audio.file_id : 
                            msg.reply_to_message.video ? msg.reply_to_message.video.file_id : 
                            msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;

            const fileDetails = await bot.getFile(fileId);
            const fileLink = `https://api.telegram.org/file/bot${config.token}/${fileDetails.file_path}`;
            const telegraphUrl = `https://apis-samir.onrender.com/telegraph?url=${encodeURIComponent(fileLink)}&senderId=4679926`;

            const response = await axios.get(telegraphUrl);
            const link = response.data.result.link;

            bot.sendMessage(chatId, `File Link: ${link}`);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, "An error occurred while processing the command.");
        }
    }
};
