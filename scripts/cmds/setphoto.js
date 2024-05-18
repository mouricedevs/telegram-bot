module.exports = {
  config: {
    name: "setphoto",
    author: "Samir Œ",
    description: "Set a custom photo for the group",
    category: "admin",
    usage: "/setphoto [photo]",
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