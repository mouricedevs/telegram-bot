module.exports = {
  config: {
    name: "unsend",
    author: "Samir Œ",
    description: "Deletes a message that the bot posted in reply to.",
    category: "Utility",
    usage: "/unsend (reply to the message you want to delete)",
    usePrefix: true
  },
  onStart: async function ({ bot, msg }) {
    try {
      if (msg.reply_to_message) {
        const chatId = msg.chat.id;
        const messageIDToDelete = msg.reply_to_message.message_id;
        await bot.deleteMessage(chatId, messageIDToDelete);
      } else {
        await bot.sendMessage(msg.chat.id, "Please reply to the message you want to delete.");
      }
    } catch (error) {
      console.log('Error deleting message:', error);
      await bot.sendMessage(msg.chat.id, 'An error occurred while trying to delete the message.');
    }
  }
};