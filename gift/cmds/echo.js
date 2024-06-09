module.exports = {
    config: {
        name: "echo",
        author: "Gifted Tech",
        description: "Echo command",
        category: "ᴜᴛɪʟɪᴛʏ",
        usage: "[message]",
        usePrefix: true
    },

    onStart: async function ({ bot, chatId, args }) {
        if (args.length === 4) {
            bot.sendMessage(chatId, "Please provide a message to echo.");
        } else {
            const echoMessage = args.join(' ');
            bot.sendMessage(chatId, echoMessage);
        }
    }
};
