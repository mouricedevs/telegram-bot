const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const fs = require('fs');

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
    bot.onText(new RegExp(`^${config.prefix}${command.config.name}\\b(.*)$`), (msg, match) => {
        try {
            const chatId = msg.chat.id;
            const args = match[1].trim().split(/\s+/);
            command.onStart({ bot, chatId, args });
        } catch (error) {
            console.error(`Error executing command ${command.config.name}: ${error}`);
            bot.sendMessage(msg.chat.id, 'An error occurred while executing the command.');
        }
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
    console.error('Polling error:', error);
});

bot.on('polling_started', () => {
    console.log('Bot polling started');
});




const gradient = require('gradient-string');

function createGradientLogger() {
  const colors = [
    
  
    'blue',
    'cyan'
    
    
  ];

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

const loadingTimer = loadingAnimation(`XarV2 loaded:`);

setTimeout(() => {
  clearInterval(loadingTimer);
  logBotName();
}, 3000);



module.exports = bot;
