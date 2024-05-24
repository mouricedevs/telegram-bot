module.exports = {
    config: {
        name: "uid",
        author: "Samir Œ",
        description: "Retrieve user ID and username",
        category: "utility",
        usage: "uid",
        usePrefix: true,
        role: 1
    },
    onStart: async function ({ bot, chatId, userId, username, msg }) {
        let targetUserId, targetUsername;
        if (msg.reply_to_message) {
            targetUserId = msg.reply_to_message.from.id;
            targetUsername = msg.reply_to_message.from.username;
        } else {
            targetUserId = userId;
            targetUsername = username;
        }

        const userInfo = `User ID: ${targetUserId}\nUsername: @${targetUsername}`;
        bot.sendMessage(chatId, userInfo);
    }
};
