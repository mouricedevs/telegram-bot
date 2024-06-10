// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨


const os = require('os');
const process = require('process');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "feature",
        author: "Gifted Tech",
        description: "Display bot cmds",
        category: "ᴜᴛɪʟɪᴛʏ",
        usage: ".feature",
        usePrefix: true
    },

    onStart: async function({ bot, chatId }) {
        try {
            const jsFileCount = countJSFiles();

            const statsMessage = `
            📊 𝗚𝗶𝗳𝘁𝗲𝗱-𝗠𝗱 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀: 📊
           
            📂 Gifted-Md Has a Total of: ${jsFileCount} Commands
            `;

            bot.sendMessage(chatId, statsMessage);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while fetching the features.');
        }
    }
};


function countJSFiles() {
    const cmdDir = __dirname;
    const files = fs.readdirSync(cmdDir);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    return jsFiles.length;
}


// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨
