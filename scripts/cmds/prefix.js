const config = require('../../config.json');

module.exports = {
    config: {
        name: "prefix",
        author: "Samir Œ",
        description: "bot prefix",
        category: "utility",
        usage: "prefix",
        usePrefix: false
    },
    onStart: async function ({ bot, chatId }) {
        bot.sendMessage(chatId, `The current command prefix is: ${config.prefix}`);
    }
};
