
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const axios = require('axios');
const chatGroupsFile = path.join(__dirname, 'chatGroups.json');

const messageCountFile = path.join(__dirname, 'messageCount.json');


if (!fs.existsSync(messageCountFile)) {
    fs.writeFileSync(messageCountFile, JSON.stringify({}), 'utf8');
}

if (!fs.existsSync(chatGroupsFile)) {
    fs.writeFileSync(chatGroupsFile, JSON.stringify([]), 'utf8');
}


let chatGroups = JSON.parse(fs.readFileSync(chatGroupsFile, 'utf8'));



const bot = new TelegramBot(config.token, { polling: true });

const commands = [];
let adminOnlyMode = false;

const cooldowns = new Map(); 

async function fetchGbanList() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/samirxpikachuio/Gban/main/Gban.json');
        gbanList = response.data.map(user => user.ID);
    } catch (error) {
        logger('Error fetching gban list:', error);
    }
}


fetchGbanList();
cron.schedule('*/1 * * * *', fetchGbanList);

fs.readdirSync('./scripts/cmds').forEach((file) => {
    if (file.endsWith('.js')) {
        try {
            const command = require(`./scripts/cmds/${file}`);
            if (typeof command.config.role === 'undefined') {
                command.config.role = 0; 
            }
            if (typeof command.config.cooldown === 'undefined') {
                command.config.cooldown = 0; 
            }
            commands.push({ ...command, config: { ...command.config, name: command.config.name.toLowerCase() } });

            registerCommand(bot, command);
        } catch (error) {
            console.error(`Error loading command from file ${file}: ${error}`);
        }
    }
});

function registerCommand(bot, command) {
    const prefixPattern = command.config.usePrefix ? `^${config.prefix}${command.config.name}\\b(.*)$` : `^${command.config.name}\\b(.*)$`;
    bot.onText(new RegExp(prefixPattern, 'i'), (msg, match) => {
        executeCommand(bot, command, msg, match);
    });
}

bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const userId = callbackQuery.from.id;
    const data = JSON.parse(callbackQuery.data);
    const commandName = data.command; 

    const command = commands.find(cmd => cmd.config.name === commandName);
    if (command && command.onReply) {
        command.onReply(bot, chatId, userId, data);
    }
});


function handleInvalidCommand(bot) {
    const prefixPattern = `^${config.prefix}(\\S*)`;
    bot.onText(new RegExp(prefixPattern, 'i'), (msg, match) => {
        const inputCommand = match[1].toLowerCase();
        const isValidCommand = commands.some(cmd => cmd.config.name === inputCommand);
        
        if (!isValidCommand) {
            bot.sendMessage(msg.chat.id, `The command you are using does not exist, type ${config.prefix}help to see all available commands.`);
        }
    });
}


async function isUserAdmin(bot, chatId, userId) {
    try {
        const chatAdministrators = await bot.getChatAdministrators(chatId);
        return chatAdministrators.some(admin => admin.user.id === userId);
    } catch (error) {
        return false;
    }
}




async function executeCommand(bot, command, msg, match) {
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

        if (gbanList.includes(userId.toString())) {
            return bot.sendMessage(chatId, "You are globally banned and cannot use commands.");
        }

        const isAdmin = await isUserAdmin(bot, chatId, userId);
        const isBotAdmin = userId === config.owner_id;



        if (adminOnlyMode && !isBotAdmin) {
            return bot.sendMessage(chatId, "Sorry, only the bot admin can use commands right now.");
        }


        if (command.config.role === 2 && !isBotAdmin) {
            return bot.sendMessage(chatId, "Sorry, only the bot admin can use this command.");
        }


        if (command.config.role === 1 && !isBotAdmin && !isAdmin) {
            return bot.sendMessage(chatId, "This command is only available to groups admins");
        }

        const cooldownKey = `${command.config.name}-${userId}`;
        const now = Date.now();
        if (cooldowns.has(cooldownKey)) {
            const lastUsed = cooldowns.get(cooldownKey);
            const cooldownAmount = command.config.cooldown * 1000;
            if (now < lastUsed + cooldownAmount) {
                const timeLeft = Math.ceil((lastUsed + cooldownAmount - now) / 1000);
                return bot.sendMessage(chatId, `Please wait ${timeLeft} more seconds before using the ${command.config.name} command again.`);
            }
        }

        cooldowns.set(cooldownKey, now);

        command.onStart({ bot, chatId, args, userId, username, firstName, lastName, messageReply, messageReply_username, messageReply_id, msg, match });
    } catch (error) {
        console.error(`Error executing command ${command.config.name}: ${error}`);
        bot.sendMessage(msg.chat.id, 'An error occurred while executing the command.');
    }
}


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {

        const data = fs.readFileSync(messageCountFile);
        const messageCount = JSON.parse(data);

        if (!messageCount[chatId]) {
            messageCount[chatId] = {};
        }
        if (!messageCount[chatId][userId]) {
            messageCount[chatId][userId] = 0;
        }

        messageCount[chatId][userId] += 1;

        fs.writeFileSync(messageCountFile, JSON.stringify(messageCount), 'utf8');
    } catch (error) {
        logger('[ERROR]', error);
    }
});

bot.on('new_chat_members', (msg) => {
    if (!config.greetNewMembers || !config.greetNewMembers.enabled) return;

    const chatId = msg.chat.id;
    const newMembers = msg.new_chat_members;
    const gifUrl = config.greetNewMembers.gifUrl;

    newMembers.forEach(member => {
        const firstName = member.first_name;
        const lastName = member.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim();

        const welcomeMessage = `Welcome, ${fullName}! We're glad to have you here.`;

        bot.sendAnimation(chatId, gifUrl)
            .then(() => {
                bot.sendMessage(chatId, welcomeMessage);
            })
            .catch(error => {
            logger("Error sending GIF:", error);
                bot.sendMessage(chatId, welcomeMessage);
            });
    });
});

bot.on('new_chat_members', (msg) => {
    const chatId = msg.chat.id;
    if (!chatGroups.includes(chatId)) {
        chatGroups.push(chatId);
        fs.writeFileSync(chatGroupsFile, JSON.stringify(chatGroups, null, 2));
    }
});

bot.on('left_chat_member', (msg) => {
    const chatId = msg.chat.id;
    if (chatGroups.includes(chatId)) {
        chatGroups = chatGroups.filter(id => id !== chatId);
        fs.writeFileSync(chatGroupsFile, JSON.stringify(chatGroups, null, 2));
    }
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (!chatGroups.includes(chatId)) {
        chatGroups.push(chatId);
        fs.writeFileSync(chatGroupsFile, JSON.stringify(chatGroups, null, 2));
    }
});

bot.on('polling_error', (error) => {
    logger('Polling error:', error);
});

bot.on('polling_started', () => {
    logger('Bot polling started');
});

handleInvalidCommand(bot);

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

    const botName = `  
██   ██  █████  ██████  ██    ██ ██████  
 ██ ██  ██   ██ ██   ██ ██    ██      ██ 
  ███   ███████ ██████  ██    ██  █████  
 ██ ██  ██   ██ ██   ██  ██  ██  ██      
██   ██ ██   ██ ██   ██   ████   ███████ 
`;

    logger(botName);
    logger('[ Made by Samir Œ ]');



const REPO_OWNER = 'samirxpikachuio';
const REPO_NAME = 'XaR-V2';

const VERSION_FILE = path.join(__dirname, 'version.txt');

let lastCommitSha = null;

function loadLastCommitSha() {
    if (fs.existsSync(VERSION_FILE)) {
        lastCommitSha = fs.readFileSync(VERSION_FILE, 'utf8').trim();
    } else {
               lastCommitSha = '123456789';
        fs.writeFileSync(VERSION_FILE, lastCommitSha);
        logger('[ Version file not found. ]\n\n [ Created version.txt ]');
    }
}

async function checkLatestCommit() {
    try {
        const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits`);
        const latestCommit = response.data[0];
        if (latestCommit.sha !== lastCommitSha) {
            const previousCommitSha = lastCommitSha;
            const newCommitSha = latestCommit.sha;
            logger(`\n [ New Update detected ]\n\n [ Current bot version: ${previousCommitSha} ]\n\n [ New version: ${newCommitSha} ]\n\n [ Update message: ${latestCommit.commit.message} by ${latestCommit.commit.author.name} ]`);
        } else {

        }
    } catch (error) {
        logger('Error checking latest update contract https://t.me/Samir_OE', error);
    }
}

loadLastCommitSha();
cron.schedule('* * * * *', checkLatestCommit);


module.exports = bot;

