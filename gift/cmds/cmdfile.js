// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨



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


// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨
