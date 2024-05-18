module.exports = {
    config: {
        name: "pfp",
        author: "Samir Œ",
        description: "Send the profile picture of a user",
        category: "utility",
        usage: "pfp [username|user_id] (optional, or reply to a user message)",
        usePrefix: true,
        role: 0
    },
    onStart: async function ({ bot, chatId, msg, args }) {
        let targetUserId = msg.from.id;

        if (msg.reply_to_message) {
            targetUserId = msg.reply_to_message.from.id;
        } else if (args.length > 0) {
            targetUserId = args[0];
        }

        try {
            const photos = await bot.getUserProfilePhotos(targetUserId);
            if (photos.total_count === 0) {
                return bot.sendMessage(chatId, "This user has no profile pictures.");
            }

            const fileId = photos.photos[0][0].file_id;
            await bot.sendPhoto(chatId, fileId);
        } catch (error) {
       
        const photos = await bot.getUserProfilePhotos(msg.from.id);
      
        const fileId = photos.photos[0][0].file_id;
        await bot.sendPhoto(chatId, fileId);  }
    }
};
