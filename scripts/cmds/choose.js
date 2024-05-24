module.exports = {
    config: {
        name: 'choose',
        description: 'Choose between true and false',
        usage: '/choose is this fruit?',

        category: "example",
        role: 0, // 0 = everyone 1 = group admin 2 = bot admin 
        cooldown: 0, // 0 second cooldown before executing again 
        usePrefix: true // true = you have to use prefix (/ * # @ ) to cmd false = you don't have to use prefix 
    },
    onStart: async function ({ bot, chatId, args }) {
        const question = args.join(' ');
        const inlineKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'True', callback_data: JSON.stringify({ command: 'choose', choice: 'true' }) }],
                    [{ text: 'False', callback_data: JSON.stringify({ command: 'choose', choice: 'false' }) }]
                ]
            }
        };

        await bot.sendMessage(chatId, `Question: ${question}`, inlineKeyboard);
    },
    onReply: async function (bot, chatId, userId, data) {
        const choice = data.choice;

        if (choice === 'true') {
            await bot.sendMessage(chatId, 'You chose: Yes');
        } else if (choice === 'false') {
            await bot.sendMessage(chatId, 'You chose: No');
        }
    }
};
