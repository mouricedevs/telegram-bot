// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨


const axios = require("axios");

module.exports = {
    config: {
        name: "lyrics",
        author: "Gifted Tech",
        description: "Get lyrics of a song",
        category: "sᴇᴀʀᴄʜ",
        usage: "<song_name>",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const query = args.join(" ");

        if (!query) {
            return bot.sendMessage(chatId, `Please provide a song name. Usage: .lyrics [song_name]`);
        }

        const searchMessage = await bot.sendMessage(chatId, `🔍 Searching for lyrics: ${query}`);

        try {
            const response = await axios.get(`https://apis-samir.onrender.com/lyrics?query=${encodeURIComponent(query)}`);
            const { title, artist, lyrics, image } = response.data;

            await bot.sendMessage(chatId, `𝗚𝗘𝗡𝗘𝗧𝗔𝗧𝗘𝗗 𝗕𝗬 𝗚𝗜𝗙𝗧𝗘𝗗-𝗠𝗗:\n\n ${lyrics}\n\nSong Name: ${title}\n\nWriter: ${artist}`);
            await bot.sendPhoto(chatId, image);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while fetching the lyrics.');
        }

        await bot.deleteMessage(chatId, searchMessage.message_id);
    }
};



// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨
