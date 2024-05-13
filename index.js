const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const fs = require('fs');

const bot = new TelegramBot(config.token, { polling: true });

const commands = [];

fs.readdirSync('./scripts/cmds').forEach((file) => {
    if (file.endsWith('.js')) {
        const command = require(`./scripts/cmds/${file}`);
        commands.push(command);
        registerCommand(bot, command);
    }
});

function registerCommand(bot, command) {
    bot.onText(new RegExp(`^${config.prefix}${command.config.name}\\b(.*)$`), (msg, match) => {
        const chatId = msg.chat.id;
        const args = match[1].trim().split(/\s+/);
        command.onStart({ bot, chatId, args });
    });
}

bot.onText(new RegExp(`^${config.prefix}help$`), (msg) => {
    let helpMessage = "𝙱𝚘𝚝 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜";
    const categories = {};

    commands.forEach((command) => {
        const category = command.config.category || "Uncategorized";
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(command.config.name);
    });

    Object.keys(categories).forEach((category) => {
        helpMessage += `\n╭──『 ${category} 』\n`;
        helpMessage += `✧${categories[category].join(' ✧')}\n`;
        helpMessage += "╰───────────◊\n";
    });

    bot.sendMessage(msg.chat.id, helpMessage);
});

bot.onText(new RegExp(`^${config.prefix}help (.+)$`), (msg, match) => {
    const commandName = match[1];
    const command = commands.find((cmd) => cmd.config.name === commandName);

    if (command) {
        const infoMessage = generateCommandInfoMessage(command);
        bot.sendMessage(msg.chat.id, infoMessage);
    } else {
        bot.sendMessage(msg.chat.id, `Command "${commandName}" not found.`);
    }
});

function generateCommandInfoMessage(command) {
    let infoMessage = `─── ${command.config.name.toUpperCase()} ────⭓\n`;
    infoMessage += `» Author: ${command.config.author}\n`;
      infoMessage += `» Description: ${command.config.description}\n`;
    if (command.config.usage) {
        infoMessage += `─── USAGE ────⭓\n`;
        infoMessage += `» ${command.config.usage}\n`;
    }

    return infoMessage;
}

bot.on('polling_error', (error) => {
    console.error(error);
});

bot.on('polling_started', () => {
    console.log('Bot polling started');
});

console.log('Bot is running...');

module.exports = bot;
