// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨


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

      const giftedkenya = {};
      const tekgifted = {};
      const iamgifted = {};

      for (const file of Giftedam) {
        const giftedcode = require(gift.join(amGifted, file));
        const giftechke = giftedcode.config.category || 'categorized';

        if (!giftedkenya[giftechke]) {
          giftedkenya[giftechke] = [];
          iamgifted[giftechke] = [];
        }

        giftedkenya[giftechke].push(giftedcode.config.name);
        tekgifted[giftedcode.config.name] = giftedcode.config;
        iamgifted[giftechke].push(giftedcode.config.name);
      }

      if (match && match[1] && match[1].trim()) {
        const giftedTech = match[1].trim().toLowerCase();
        const techGifted = tekgifted[giftedTech];

        if (techGifted) {
          let giftedDevs = `─── NAME ────⭓\n\n» ${techGifted.name}\n\n─── INFO ────⭓\n\n» Description: ${techGifted.description || 'Do not have'}\n» Role: ${techGifted.role}\n» Author: ${techGifted.author || 'Unknown'}\n» Cooldown: ${techGifted.cooldown}\n» Use Prefix: ${techGifted.usePrefix}\n\n─── USAGE ────⭓\n\n» ${techGifted.usage || `/${techGifted.name}`}\n\n───────⭔`;
          await bot.sendMessage(msg.chat.id, `${giftedDevs}`);
        } else {
          await bot.sendMessage(msg.chat.id, `Command '${giftedTech}' not found.`);
        }
      } else {
        let devGifted = '╭══ **〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙** ═⊷ \n┃❍ ᴜsᴇʀ: •••\n┃❍ **ᴏᴡɴᴇʀ:** Gifted Tech \n┃❍ **ᴄᴏᴍᴍᴀɴᴅs:** 40 \n┃❍ **ᴠᴇʀsɪᴏɴ:** 1.0.0 \n╰════════════════⊷ \n\n **𝑮𝒊𝒇𝒕𝒆𝒅-𝑴𝒅 𝑪𝒐𝒎𝒎𝒂𝒏𝒅𝒔:** \n\n';

        for (const giftechke in iamgifted) {
          devGifted += `╭─── **『 ${giftechke} 』** \n`;
          devGifted += `✧ .${iamgifted[giftechke].join(' ✧ .')}\n`;
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


// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨
