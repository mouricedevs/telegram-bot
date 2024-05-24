const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: 'help',
    description: 'Show available commands',
    usage: '/help [command_name]',
    author: 'Samir OE',
    category: 'Utility',
    role: 0,
    cooldown: 0,
    usePrefix: true
  },
  onStart: async function ({ msg, bot, match }) {
    try {
      const commandsDir = path.join(__dirname, '.');
      const files = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

      const categories = {};
      const commands = {};
      const categorizedCommands = {};

      for (const file of files) {
        const command = require(path.join(commandsDir, file));
        const category = command.config.category || 'Uncategorized';

        if (!categories[category]) {
          categories[category] = [];
          categorizedCommands[category] = [];
        }

        categories[category].push(command.config.name);
        commands[command.config.name] = command.config;
        categorizedCommands[category].push(command.config.name);
      }

      if (match && match[1] && match[1].trim()) {
        const commandName = match[1].trim().toLowerCase();
        const commandConfig = commands[commandName];

        if (commandConfig) {
          let commandInfo = `─── NAME ────⭓\n\n» ${commandConfig.name}\n\n─── INFO ────⭓\n\n» Description: ${commandConfig.description || 'Do not have'}\n» Role: ${commandConfig.role}\n» Author: ${commandConfig.author || 'Unknown'}\n» Cooldown: ${commandConfig.cooldown}\n» Use Prefix: ${commandConfig.usePrefix}\n\n─── USAGE ────⭓\n\n» ${commandConfig.usage || `/${commandConfig.name}`}\n\n───────⭔`;
          await bot.sendMessage(msg.chat.id, commandInfo, { parse_mode: 'markdown' });
        } else {
          await bot.sendMessage(msg.chat.id, `Command '${commandName}' not found.`);
        }
      } else {
        let helpMessage = '';

        for (const category in categorizedCommands) {
          helpMessage += `╭──『 ${category} 』\n`;
          helpMessage += `✧${categorizedCommands[category].join(' ✧')}\n`;
          helpMessage += "╰───────────◊\n";
        }

        await bot.sendMessage(msg.chat.id, helpMessage, { parse_mode: 'markdown' });
      }
    } catch (error) {
      console.error('Error generating help message:', error);
      await bot.sendMessage(msg.chat.id, 'An error occurred while generating the help message.');
    }
  }
};
