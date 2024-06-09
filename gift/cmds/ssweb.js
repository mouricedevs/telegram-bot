const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); 

module.exports = {
    config: {
        name: "ssweb",
        author: "Gifted Tecg",
        description: "Take a screenshot of a webpage or Google search results",
        category: "ᴛᴏᴏʟs",
        usage: ".ssweb <url>\n or\n/screenshot -g <text>",
        usePrefix: true
    },

    onStart: async function({ bot, chatId, args, msg }) {
        const p = '/'; 

        if (args.length === 0) {
            bot.sendMessage(chatId, `Invalid input⚠️\nPlease use:\n${p}ssweb <url> \nor\n${p}ssweb  <link>.`);
            return;
        }

        let url;
        if (args[0] === '-g') {
            if (args.length < 2) {
                bot.sendMessage(chatId, `Invalid text input after -g tag⚠️\nPlease use:\n${p}ssweb  YourLink`);
                return;
            }
            const query = args.slice(1).join('+');
            url = `https://www.google.com/search?q=${query}&tbm=isch`;
        } else {
            url = args[0];
            if (!url.match(/^https?:\/\/.+$/)) {
                url = `https://${url}`;
            }
        }

        const apiURL = `https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/${url}`;

        try {
            const res = await fetch(apiURL);
            if (!res.ok) {
                bot.sendMessage(chatId, `Invalid input⚠️\nPlease use:\n${p}ssweb <url> \nor\n${p}ssweb  <link>.`);
                return;
            }

            bot.sendPhoto(chatId, apiURL, { caption: "Here is the screenshot." });
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while processing the command.');
        }
    }
};
