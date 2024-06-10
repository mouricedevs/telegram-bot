// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨


module.exports = {
  config: {
    name: "setgpp",
    author: "Gifted Tech",
    description: "Set a custom photo for the group",
    category: "ɢʀᴏᴜᴘ",
    usage: ".setgpp [photo]",
    usePrefix: true
  },
  onStart: async function ({ bot, chatId, msg }) {
    let userId;
    if (msg && msg.from) {
      userId = msg.from.id;
    } else {
      bot.sendMessage(chatId, "This command can only be used in a group or supergroup.");
      return;
    }

    const adminCheck = await bot.getChatMember(chatId, userId);

    if (adminCheck.status !== "administrator" && adminCheck.status !== "creator") {
      bot.sendMessage(chatId, "You need to be an admin to use this command.");
      return;
    }

    if (!msg || !msg.reply_to_message || !msg.reply_to_message.photo) {
      bot.sendMessage(chatId, "Please reply to a photo with this command to set it as the group photo.");
      return;
    }

    const photoFileId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;

    try {
      await bot.setChatPhoto(chatId, photoFileId);
      bot.sendMessage(chatId, "Group photo has been updated successfully.");
    } catch (error) {
      bot.sendMessage(chatId, "Failed to set the group photo.");
      console.error(error);
    }
  },
};


// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨
