
module.exports = {
    config: {
        name: "eval",
        author: "Samir Œ",
        description: "Execute JavaScript code (admin only)",
        category: "development",
        usage: "eval <code>",
        usePrefix: true,
        role: 2


    },
    onStart: async function ({ bot, chatId, userId, args, msg, adminId }) {

        const code = args.join(' ');

        if (!code) {
            return bot.sendMessage(chatId, `Please provide some code to execute. Usage: /eval <code>`);
        }

        try {
            let result = await eval(code);
            if (typeof result !== 'string') {
                result = require('util').inspect(result);
            }


 bot.sendMessage(adminId, `Result: ${result}`);


        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, `Error: ${error.message}`);
        }
    }
};
