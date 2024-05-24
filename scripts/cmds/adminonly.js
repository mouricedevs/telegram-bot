const config = require('../../config.json');


module.exports = {
    config: {
        name: "adminonly",
        author: "Samir Œ",
        description: "Toggle admin-only mode",
        category: "admin",
        usage: "adminonly <on|off>",
        usePrefix: true,
        role: 2
    },
    onStart: async function ({ bot, chatId, msg, args }) {
        const fromId = msg.from.id;

        if (fromId !== config.owner_id) {
            return bot.sendMessage(chatId, "Only the bot owner can toggle admin-only mode.");
        }

        const mode = args[0];
        if (mode !== 'on' && mode !== 'off') {
            return bot.sendMessage(chatId, "Usage: /adminonly <on|off>");
        }

        adminOnlyMode = mode === 'on';
        bot.sendMessage(chatId, `Admin-only mode is now ${mode}.`);
    }
};
