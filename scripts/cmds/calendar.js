const Calendar = require('telegram-inline-calendar');

module.exports = {
    config: {
        name: "calendar",
        author: "Samir Œ",
        description: "Display an interactive calendar",
        category: "utility",
        usage: "/calendar",
        usePrefix: true
    },

    onStart: async function({ bot, chatId, msg }) {
        const calendar = new Calendar(bot, {
            date_format: 'DD-MM-YYYY',
            language: 'en'
        });

        calendar.startNavCalendar(msg);

        bot.on("callback_query", (query) => {
            if (query.message.message_id == calendar.chats.get(query.message.chat.id)) {
                const res = calendar.clickButtonCalendar(query);
                if (res !== -1) {
                    bot.sendMessage(query.message.chat.id, "You selected: " + res);
                }
            }
        });
    }
};
