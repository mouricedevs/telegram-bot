const fs = require('fs');
const path = require('path');
const messageCountFile = path.join(__dirname, '../../messageCount.json');


if (!fs.existsSync(messageCountFile)) {
    fs.writeFileSync(messageCountFile, JSON.stringify({}));
}

module.exports = {
    config: {
        name: "count",
        author: "Samir Œ",
        description: "Count user messages in the chat",
        category: "utility",
        usage: "count [all]",
        usePrefix: true
    },

    onStart: async function({ bot, chatId, msg, args }) {
        const userId = msg.from.id;
        const firstName = msg.from.first_name;


        const data = fs.readFileSync(messageCountFile, 'utf8');
        const messageCount = JSON.parse(data);

        if (!messageCount[chatId]) {
            return bot.sendMessage(chatId, "No message data available for this chat.");
        }

        const chatMessageCounts = messageCount[chatId];

        if (args[0] === 'all') {
        
            const userMessageCounts = await Promise.all(
                Object.entries(chatMessageCounts).map(async ([userId, count]) => {
                    const user = await bot.getChatMember(chatId, userId);
                    const username = user.user.username || `${user.user.first_name} ${user.user.last_name || ''}`;
                    return { userId, count, username };
                })
            );

            
            userMessageCounts.sort((a, b) => b.count - a.count);

            let response = "Number of messages of members:\n";
            userMessageCounts.forEach((user, index) => {
                response += `${index + 1}/ ${user.username}: ${user.count}\n`;
            });

            return bot.sendMessage(chatId, response);
        } else {
        
            const userMessageCount = chatMessageCounts[userId] || 0;

        
            const userMessageCounts = Object.entries(chatMessageCounts).map(([userId, count]) => ({ userId, count }));
            userMessageCounts.sort((a, b) => b.count - a.count);
            const userRank = userMessageCounts.findIndex(user => user.userId == userId) + 1;

            return bot.sendMessage(chatId, `You are ranked ${userRank} and have sent ${userMessageCount} messages in this group.`);
        }
    }
};
