const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "file",
        author: "Samir Œ",
        description: "Send the command code as a file",
        category: "utility",
        usage: "file <command_name>",
        usePrefix: true,
        role: 0
    },
    onStart: async function ({ bot, chatId, args }) {
        if (args.length === 0) {
            return bot.sendMessage(chatId, "Usage: /file <command_name>");
        }

        const commandName = args[0];
        const filePath = path.join(__dirname, `${commandName}.js`);

        if (!fs.existsSync(filePath)) {
            return bot.sendMessage(chatId, `Command "${commandName}" not found.`);
        }

    const fileContent = fs.readFileSync(filePath, 'utf8');
        await bot.sendMessage(chatId,fileContent);
     bot.sendDocument(chatId, filePath, {}, {
            filename: `${commandName}.js`,
            contentType: 'text/javascript'
        });
    }
};
