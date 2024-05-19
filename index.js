const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');

const bot = new TelegramBot(config.token, { polling: true });

const commands = [];

fs.readdirSync('./scripts/cmds').forEach((file) => {
    if (file.endsWith('.js')) {
        try {
            const command = require(`./scripts/cmds/${file}`);
            commands.push(command);
            registerCommand(bot, command);
        } catch (error) {
            console.error(`Error loading command from file ${file}: ${error}`);
        }
    }
});

function registerCommand(bot, command) {
    const prefixPattern = command.config.usePrefix ? `^${config.prefix}${command.config.name}\\b(.*)$` : `^${command.config.name}\\b(.*)$`;
    bot.onText(new RegExp(prefixPattern), (msg, match) => {
        executeCommand(bot, command, msg, match);
    });
}

function executeCommand(bot, command, msg, match) {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const username = msg.from.username;
        const firstName = msg.from.first_name;
        const lastName = msg.from.last_name || '';
        const args = match[1].trim().split(/\s+/);

        const messageReply = msg.reply_to_message;
        const messageReply_username = messageReply ? messageReply.from.username : null;
        const messageReply_id = messageReply ? messageReply.from.id : null;

        command.onStart({ bot, chatId, args, userId, username, firstName, lastName, messageReply, messageReply_username, messageReply_id , msg });
    } catch (error) {
        console.error(`Error executing command ${command.config.name}: ${error}`);
        bot.sendMessage(msg.chat.id, 'An error occurred while executing the command.');
    }
}

bot.onText(new RegExp(`^${config.prefix}help$`), (msg) => {
    let helpMessage = "";
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
    const commandName = match[1].trim();
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
    console.error('Polling error:', error);
});

bot.on('polling_started', () => {
    console.log('Bot polling started');
});

const gradient = require('gradient-string');

function createGradientLogger() {
    const colors = ['blue', 'cyan'];
    return (message) => {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color1 = colors[colorIndex];
        const color2 = colors[(colorIndex + 1) % colors.length];
        const gradientMessage = gradient(color1, color2)(message);
        console.log(gradientMessage);
    };
}

const logger = createGradientLogger();

function loadingAnimation(message) {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let frameIndex = 0;
    let timer;
    let percentage = 0;

    function animate() {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        logger(`\n[ ${frames[frameIndex]} ${message} ${percentage}% ]`);
        frameIndex = (frameIndex + 1) % frames.length;
        percentage += 10;
        if (percentage > 100) {
            percentage = 100;
        }
    }

    timer = setInterval(animate, 250);
    return timer;
}

function logBotName() {
    const botName = `  
██   ██  █████  ██████  ██    ██ ██████  
 ██ ██  ██   ██ ██   ██ ██    ██      ██ 
  ███   ███████ ██████  ██    ██  █████  
 ██ ██  ██   ██ ██   ██  ██  ██  ██      
██   ██ ██   ██ ██   ██   ████   ███████ 
`;

    logger(botName);
    logger('[ Made by Samir Œ ]');
}

const loadingTimer = loadingAnimation('XarV2 loaded:');

setTimeout(() => {
    clearInterval(loadingTimer);
    logBotName();
}, 3000);

const GITHUB_ACCESS_TOKEN = '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';
const REPO_OWNER = 'samirxpikachuio';
const REPO_NAME = 'XaR-V2';

let lastCommitSha = null;

async function checkLatestCommit() {
    try {
        const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits`, {
            headers: {
                'Authorization': `token ${GITHUB_ACCESS_TOKEN}`
            }
        });
        const latestCommit = response.data[0];
        if (latestCommit.sha !== lastCommitSha) {
            lastCommitSha = latestCommit.sha;
            console.log(`New commit detected: ${latestCommit.commit.message} by ${latestCommit.commit.author.name}`);
        }
    } catch (error) {
        console.error('Error checking latest commit:', error);
    }
}

cron.schedule('* * * * *', checkLatestCommit);

module.exports = bot;
                         
