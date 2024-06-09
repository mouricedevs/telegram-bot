const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "file",
        author: "Gifted",
        description: "Send the command code as a file",
        category: "ᴜᴛɪʟɪᴛʏ",
        usage: "file <command_name>",
        usePrefix: true,
        role: 0
    },
    onStart: async function ({ bot, chatId, args }) {
        if (args.length === 0) {
            return bot.sendMessage(chatId, "Usage: .file <command_name> This will send the cmd as a file");
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
