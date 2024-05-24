const fs = require('fs');
const path = require('path');
const chatGroupsFile = path.join(__dirname, '../../chatGroups.json');

if (!fs.existsSync(chatGroupsFile)) {
    fs.writeFileSync(chatGroupsFile, JSON.stringify([]), 'utf8');
}

let chatGroups = JSON.parse(fs.readFileSync(chatGroupsFile, 'utf8'));

module.exports = {
    config: {
        name: "notify",
        author: "Samir Œ",
        description: "Send a notification to all chat groups",
        category: "admin",
        usage: "/notify <message>",
        usePrefix: true
    },

    onStart: async function ({ bot, chatId, args }) {
        const message = args.join(' ');

        if (!message) {
            return bot.sendMessage(chatId, "Please provide a message to send. Usage: /notify <message>");
        }

        if (chatGroups.length === 0) {
            return bot.sendMessage(chatId, "No chat groups found to send the message.");
        }

        for (const groupId of chatGroups) {
            try {
                await bot.sendMessage(groupId, message);
            } catch (error) {
                console.error(`Error sending message to group ${groupId}:`, error);
            }
        }

        bot.sendMessage(chatId, "Notification sent to all chat groups.");
    }
};
