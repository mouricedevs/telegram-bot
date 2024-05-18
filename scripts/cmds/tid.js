module.exports = {
    config: {
        name: "tid",
        author: "Samir Œ",
        description: "Get information about the group",
        category: "info",
        usage: "groupinfo",
        usePrefix: true,
        role: 0 
    },
    onStart: async function ({ bot, chatId }) {
        try {
            const chat = await bot.getChat(chatId);

            let infoMessage = `─── GROUP INFO ────⭓\n`;
            infoMessage += `» Title: ${chat.title}\n`;
            infoMessage += `» Type: ${chat.type}\n`;
            infoMessage += `» ID: ${chat.id}\n`;
            if (chat.description) {
                infoMessage += `» Description: ${chat.description}\n`;
            }
            if (chat.invite_link) {
                infoMessage += `» Invite Link: ${chat.invite_link}\n`;
            }

            bot.sendMessage(chatId, infoMessage);
        } catch (error) {
            console.error('Error retrieving group information:', error);
            bot.sendMessage(chatId, 'An error occurred while retrieving the group information.');
        }
    }
};
