let rules = [];

module.exports = {
    config: {
        name: "rules",
        author: "Samir Œ",
        description: "Manage group rules",
        category: "group",
        usage: "add <rule>, modify <index> | <new rule>, delete <index>",
        usePrefix: true,
        role: 1
    },

    onStart: async function ({ bot, chatId, args }) {
        const action = args.shift();
        const ruleIndex = parseInt(args.shift());

        switch(action) {
            case 'add':
                const newRule = args.join(' ');
                rules.push(newRule);
                bot.sendMessage(chatId, `Rule added: ${newRule}`);
                break;
            case 'modify':
                const newRuleText = args.slice(1).join(' ');
                if (ruleIndex >= 1 && ruleIndex <= rules.length) {
                    rules[ruleIndex - 1] = newRuleText;
                    bot.sendMessage(chatId, `Rule modified: ${newRuleText}`);
                } else {
                    bot.sendMessage(chatId, `Rule index ${ruleIndex} is invalid.`);
                }
                break;
            case 'delete':
                if (ruleIndex >= 1 && ruleIndex <= rules.length) {
                    const deletedRule = rules.splice(ruleIndex - 1, 1)[0];
                    bot.sendMessage(chatId, `Rule deleted: ${deletedRule}`);
                } else {
                    bot.sendMessage(chatId, `Rule index ${ruleIndex} is invalid.`);
                }
                break;
            default:
                displayRules(bot, chatId);
        }
    }
};

function displayRules(bot, chatId) {
    if (rules.length === 0) {
        bot.sendMessage(chatId, "No rules available.");
    } else {
        let rulesList = "Group Rules:\n";
        rules.forEach((rule, index) => {
            rulesList += `${index + 1}. ${rule}\n`;
        });
        bot.sendMessage(chatId, rulesList);
    }
}
