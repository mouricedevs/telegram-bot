// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨



module.exports = {
    config: {
        name: 'choose',
        description: 'Choose between true and false',
        author: 'Gifted Tech',
        usage: '.choose is this fruit?',

        category: "ғᴜɴ",
        role: 0, // 0 = everyone 1 = group admin 2 = bot admin 
        cooldown: 0, // 0 second cooldown before executing again 
        usePrefix: true // true = you have to use prefix (/ * # @ ) to cmd false = you don't have to use prefix 
    },
    onStart: async function ({ bot, chatId, args }) {
        const gifted = args.join(' ');
        const inlineKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'True', callback_data: JSON.stringify({ command: 'choose', choice: 'true' }) }],
                    [{ text: 'False', callback_data: JSON.stringify({ command: 'choose', choice: 'false' }) }]
                ]
            }
        };

        await bot.sendMessage(chatId, `Question: ${gifted}`, inlineKeyboard);
    },
    onReply: async function (bot, chatId, userId, data) {
        const gift = data.choice;

        if (gift === 'true') {
            await bot.sendMessage(chatId, 'You chose: Yes');
        } else if (gift === 'false') {
            await bot.sendMessage(chatId, 'You chose: No');
        }
    }
};


// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨
