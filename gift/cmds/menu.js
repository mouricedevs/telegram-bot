const giftek = require('fs');
const gift = require('path');

module.exports = {
  config: {
    name: 'menu',
    description: 'Show available commands',
    usage: '.menu [command_name]',
    author: 'Gifted Tech',
    category: 'ᴜᴛɪʟɪᴛʏ',
    role: 0,
    cooldown: 0,
    usePrefix: true
  },
  onStart: async function ({ msg, bot, match }) {
    try {
      const amGifted = gift.join(__dirname, '.');
      const Giftedam = giftek.readdirSync(amGifted).filter(file => file.endsWith('.js'));

      const categories = {};
      const commands = {};
      const categorizedCommands = {};

      for (const file of Giftedam) {
        const command = require(gift.join(amGifted, file));
        const giftechke = command.config.category || 'categorized';

        if (!categories[giftechke]) {
          categories[giftechke] = [];
          categorizedCommands[giftechke] = [];
        }

        categories[giftechke].push(command.config.name);
        commands[command.config.name] = command.config;
        categorizedCommands[giftechke].push(command.config.name);
      }

      if (match && match[1] && match[1].trim()) {
        const giftedTech = match[1].trim().toLowerCase();
        const techGifted = commands[giftedTech];

        if (techGifted) {
          let giftedDevs = `─── NAME ────⭓\n\n» ${techGifted.name}\n\n─── INFO ────⭓\n\n» Description: ${techGifted.description || 'Do not have'}\n» Role: ${techGifted.role}\n» Author: ${techGifted.author || 'Unknown'}\n» Cooldown: ${techGifted.cooldown}\n» Use Prefix: ${techGifted.usePrefix}\n\n─── USAGE ────⭓\n\n» ${techGifted.usage || `/${techGifted.name}`}\n\n───────⭔`;
          await bot.sendMessage(msg.chat.id, giftedDevs, { parse_mode: 'markdown' });
        } else {
          await bot.sendMessage(msg.chat.id, `Command '${giftedTech}' not found.`);
        }
      } else {
        let devGifted = '╭══ **〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙** ═⊷ \n┃ \n┃❍ **ᴏᴡɴᴇʀ:** Gifted Tech \n┃❍ **ᴄᴏᴍᴍᴀɴᴅs:** 40 \n┃❍ **ᴠᴇʀsɪᴏɴ:** 1.0.0 \n╰════════════════⊷ \n\n **𝑮𝒊𝒇𝒕𝒆𝒅-𝑴𝒅 𝑪𝒐𝒎𝒎𝒂𝒏𝒅𝒔:** \n\n';

        for (const category in categorizedCommands) {
          devGifted += `╭─── **『 ${giftechke} 』** \n`;
          devGifted += `✧ .${categorizedCommands[giftechke].join(' ✧ .')}\n`;
          devGifted += "╰─────────────────◊\n\n";
        }
        await bot.sendMessage(msg.chat.id, devGifted, { parse_mode: 'markdown' });
      }
    } catch (error) {
      console.error('Error generating menu message:', error);
      await bot.sendMessage(msg.chat.id, 'An error occurred while generating the menu message.');
    }
  }
};
