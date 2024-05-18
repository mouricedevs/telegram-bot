module.exports = {
  config: {
    name: "promote",
    author: "Claude",
    description: "Promote a member to an admin",
    category: "admin",
    usage: "/promote [username]",
    usePrefix: true
  },
  onStart: async function ({ bot, chatId, args, message }) {
    let userId;
    if (message && message.from) {
      userId = message.from.id;
    } else {
      bot.sendMessage(chatId, "This command can only be used in a group or supergroup.");
      return;
    }

    const adminCheck = await bot.getChatMember(chatId, userId);

    if (adminCheck.status !== "administrator" && adminCheck.status !== "creator") {
      bot.sendMessage(chatId, "You need to be an admin to use this command.");
      return;
    }

    if (!args[0]) {
      bot.sendMessage(chatId, "Please provide a username to promote.");
      return;
    }

    const username = args[0].replace("@", "");
    const userToPromote = message.reply_to_message
      ? message.reply_to_message.from
      : await bot.getChatMember(chatId, username);

    if (!userToPromote) {
      bot.sendMessage(chatId, "User not found in this chat.");
      return;
    }

    try {
      await bot.promoteChatMember(chatId, userToPromote.id, {
        can_change_info: true,
        can_delete_messages: true,
        can_invite_users: true,
        can_restrict_members: true,
        can_pin_messages: true,
        can_promote_members: false,
      });
      bot.sendMessage(chatId, `${userToPromote.first_name} has been promoted to admin.`);
    } catch (error) {
      bot.sendMessage(chatId, "Failed to promote user to admin.");
      console.error(error);
    }
  },
};