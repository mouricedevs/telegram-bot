module.exports = {
    config: {
        name: "getpp",
        author: "Gifted Tech",
        description: "Send the profile picture of a user",
        category: "ᴜᴛɪʟɪᴛʏ",
        usage: "getpp [username|user_id] (optional, or reply to a user message)",
        usePrefix: true,
        role: 0
    },
    onStart: async function ({ bot, chatId, msg, args }) {
        let giftedId = msg.from.id;

        if (msg.reply_to_message) {
            giftedId = msg.reply_to_message.from.id;
        } else if (args.length > 0) {
            giftedId = args[0];
        }

        try {
            const photos = await bot.getUserProfilePhotos(giftedId);
            if (photos.total_count === 0) {
                return bot.sendMessage(chatId, "This user has no profile pictures.");
            }

            const giftekId = photos.photos[0][0].file_id;
            await bot.sendPhoto(chatId, giftekId);
        } catch (error) {
       
        const photos = await bot.getUserProfilePhotos(msg.from.id);
      
        const giftechId = photos.photos[0][0].file_id;
        await bot.sendPhoto(chatId, giftechId);  }
    }
};
