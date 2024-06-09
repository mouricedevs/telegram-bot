
const GiftedTgBot = require('node-telegram-bot-api');
const config = require('./gift/cmds/config.json');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const axios = require('axios');
const chatGroupsFile = path.join(__dirname, './gift/cmds/grpchats.json');

const messageCountFile = path.join(__dirname, './gift/cmds/msgscount.json');


if (!fs.existsSync(messageCountFile)) {
    fs.writeFileSync(messageCountFile, JSON.stringify({}), 'utf8');
}

if (!fs.existsSync(chatGroupsFile)) {
    fs.writeFileSync(chatGroupsFile, JSON.stringify([]), 'utf8');
}


let chatGroups = JSON.parse(fs.readFileSync(chatGroupsFile, 'utf8'));



const gift = new GiftedTgBot(config.token, { polling: true });

const giftech = [];
let adminOnlyMode = false;

const cooldowns = new Map(); 

async function fetchGbanList() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/mouricedevs/Gban/main/Gban.json');
        gbanList = response.data.map(user => user.ID);
    } catch (error) {
        logger('Error fetching gban list:', error);
    }
}


fetchGbanList();
cron.schedule('*/1 * * * *', fetchGbanList);

fs.readdirSync('./gift/cmds').forEach((file) => {
    if (file.endsWith('.js')) {
        try {
            const gifted = require(`./gift/cmds/${file}`);
            if (typeof gifted.config.role === 'undefined') {
                gifted.config.role = 0; 
            }
            if (typeof gifted.config.cooldown === 'undefined') {
                gifted.config.cooldown = 0; 
            }
            giftech.push({ ...gifted, config: { ...gifted.config, name: gifted.config.name.toLowerCase() } });

            registerCommand(gift, gifted);
        } catch (error) {
            console.error(`Error loading command from file ${file}: ${error}`);
        }
    }
});

function registerCommand(gift, gifted) {
    const prefixPattern = gifted.config.usePrefix ? `^${config.prefix}${gifted.config.name}\\b(.*)$` : `^${gifted.config.name}\\b(.*)$`;
    bot.onText(new RegExp(prefixPattern, 'i'), (msg, match) => {
        executeCommand(gift, gifted, msg, match);
    });
}

gift.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const userId = callbackQuery.from.id;
    const data = JSON.parse(callbackQuery.data);
    const giftedTech = data.gifted; 

    const gifted = giftech.find(cmd => cmd.config.name === giftedTech);
    if (gifted && gifted.onReply) {
        gifted.onReply(gift, chatId, userId, data);
    }
});


function handleInvalidCommand(bot) {
    const prefixPattern = `^${config.prefix}(\\S*)`;
    gift.onText(new RegExp(prefixPattern, 'i'), (msg, match) => {
        const inputCommand = match[1].toLowerCase();
        const isValidCommand = giftech.some(cmd => cmd.config.name === inputCommand);
        
        if (!isValidCommand) {
            gift.sendMessage(msg.chat.id, `Hi, I am Gifted-Md Telegram UserBot.\nType ${config.prefix}menu to see all available commands. \n\nRegards, \nGifted Tech, \n(Owner& Developer)`);
        }
    });
}


async function isUserAdmin(gift, chatId, userId) {
    try {
        const chatAdministrators = await gift.getChatAdministrators(chatId);
        return chatAdministrators.some(admin => admin.user.id === userId);
    } catch (error) {
        return false;
    }
}




async function executeCommand(gift, gifted, msg, match) {
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
            return gift.sendMessage(chatId, "You are globally banned and cannot use commands.");
        }

        const isAdmin = await isUserAdmin(gift, chatId, userId);
        const isBotAdmin = userId === config.owner_id;



        if (adminOnlyMode && !isBotAdmin) {
            return gift.sendMessage(chatId, "Sorry, only the bot admin can use commands right now.");
        }


        if (command.config.role === 2 && !isBotAdmin) {
            return gift.sendMessage(chatId, "Sorry, only the bot admin can use this command.");
        }


        if (command.config.role === 1 && !isBotAdmin && !isAdmin) {
            return gift.sendMessage(chatId, "This command is only available to groups admins");
        }

        const cooldownKey = `${gifted.config.name}-${userId}`;
        const now = Date.now();
        if (cooldowns.has(cooldownKey)) {
            const lastUsed = cooldowns.get(cooldownKey);
            const cooldownAmount = gifted.config.cooldown * 1000;
            if (now < lastUsed + cooldownAmount) {
                const timeLeft = Math.ceil((lastUsed + cooldownAmount - now) / 1000);
                return gift.sendMessage(chatId, `Please wait ${timeLeft} more seconds before using the ${gifted.config.name} command again.`);
            }
        }

        cooldowns.set(cooldownKey, now);

        gifted.onStart({ gift, chatId, args, userId, username, firstName, lastName, messageReply, messageReply_username, messageReply_id, msg, match });
    } catch (error) {
        console.error(`Error executing command ${gifted.config.name}: ${error}`);
        gift.sendMessage(msg.chat.id, 'An error occurred while executing the command.');
    }
}


gift.on('message', (msg) => {
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

gift.on('new_chat_members', (msg) => {
    if (!config.greetNewMembers || !config.greetNewMembers.enabled) return;

    const chatId = msg.chat.id;
    const newMembers = msg.new_chat_members;
    const gifUrl = config.greetNewMembers.gifUrl;

    newMembers.forEach(member => {
        const firstName = member.first_name;
        const lastName = member.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim();

        const welcomeMessage = `Welcome, ${fullName}! We're glad to have you here.`;

        gift.sendAnimation(chatId, gifUrl)
            .then(() => {
                gift.sendMessage(chatId, welcomeMessage);
            })
            .catch(error => {
            logger("Error sending GIF:", error);
                gift.sendMessage(chatId, welcomeMessage);
            });
    });
});

gift.on('new_chat_members', (msg) => {
    const chatId = msg.chat.id;
    if (!chatGroups.includes(chatId)) {
        chatGroups.push(chatId);
        fs.writeFileSync(chatGroupsFile, JSON.stringify(chatGroups, null, 2));
    }
});

gift.on('left_chat_member', (msg) => {
    const chatId = msg.chat.id;
    if (chatGroups.includes(chatId)) {
        chatGroups = chatGroups.filter(id => id !== chatId);
        fs.writeFileSync(chatGroupsFile, JSON.stringify(chatGroups, null, 2));
    }
});

gift.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (!chatGroups.includes(chatId)) {
        chatGroups.push(chatId);
        fs.writeFileSync(chatGroupsFile, JSON.stringify(chatGroups, null, 2));
    }
});

gift.on('polling_error', (error) => {
    logger('Polling error:', error);
});

gift.on('polling_started', () => {
    logger('Bot polling started');
});

handleInvalidCommand(gift);

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
𝗚𝗜𝗙𝗧𝗘𝗗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 𝟭.𝟬.𝟬
𝗠𝗨𝗟𝗧𝗜-𝗗𝗘𝗩𝗜𝗖𝗘 
𝗧𝗘𝗟𝗘𝗚𝗥𝗔𝗠 𝗨𝗦𝗘𝗥 𝗕𝗢𝗧 
`;

    logger(botName);
    logger('[ Gifted-Md is Active and Online]');



const GIFTED_TECH = 'mouricedevs';
const TELEGRAM_BOT = 'telegram-bot';

const GIFTED_UPDATE = path.join(__dirname, './gift/version.txt');

let lastGiftCommit = null;

function loadLastGiftCommit() {
    if (fs.existsSync(GIFTED_UPDATE)) {
        lastGiftCommit = fs.readFileSync(GIFTED_UPDATE, 'utf8').trim();
    } else {
               lastGiftCommit = '123456789';
        fs.writeFileSync(GIFTED_UPDATE, lastGiftCommit);
        logger('[ Version file not found. ]\n\n [ Created version.txt ]');
    }
}

async function checkLatestGiftCommit() {
    try {
        const response = await axios.get(`https://api.github.com/repos/${GIFTED_TECH}/${TELEGRAM_BOT}/commits`);
        const latestGiftedCommit = response.data[0];
        if (latestGiftedCommit.sha !== lastGiftCommit) {
            const previousGiftCommit = lastGiftCommit;
            const newGiftCommit = latestGiftedCommit.sha;
            logger(`\n [ New Update detected ]\n\n [ Current bot version: ${previousGiftCommit} ]\n\n [ New version: ${newGiftCommit} ]\n\n [ Update message: ${latestGiftedCommit.commit.message} by ${latestGiftedCommit.commit.author.name} ]`);
        } else {

        }
    } catch (error) {
        logger('Error checking latest update contact https://t.me/giftedmd', error);
    }
}

loadLastGiftCommit();
cron.schedule('* * * * *', checkLatestGiftCommit);


module.exports = gift;

