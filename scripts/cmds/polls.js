module.exports = {
    config: {
        name: "poll",
        author: "Samir Œ",
        description: "Create a poll with multiple options",
        category: "utility",
        usage: "poll <question> | <option1> | <option2> | ...",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const pollData = args.join(' ').split('|').map(option => option.trim());

        if (pollData.length < 3) {
            return bot.sendMessage(chatId, `Please provide a question and at least two options. Usage: ${global.config.prefix}poll <question> | <option1> | <option2> | ...`);
        }

        const question = pollData[0];
        const options = pollData.slice(1);

        try {
            const pollMessage = await bot.sendPoll(chatId, question, options);
            console.log("Poll created:", pollMessage);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while creating the poll.');
        }
    }
};
