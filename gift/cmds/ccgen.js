// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨



const axios = require("axios");

module.exports = {
    config: {
        name: "gen",
        author: "Gifted Tech",
        description: "Generates Heroku Credit Cards",
        category: "ᴜᴛɪʟɪᴛʏ",
        usage: "<bin_number>",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const query = args.join(" ");

        if (!query) {
            return bot.sendMessage(chatId, `Please provide a bin number. Usage: .gen [bin_number]`);
        }

        const searchMessage = await bot.sendMessage(chatId, `🔍 Generating Heroku CC from provided Bin: ${query}`);

        try {
            const response = await axios.get(`https://api.maher-zubair.tech/misc/bingen?query=${encodeURIComponent(query)}`);
            
            // Check if response and response.data are defined
            if (response && response.data && response.data.ccbin) {
                const ccbin = response.data.ccbin;
                await bot.sendMessage(chatId, `HERE WE GO: ${ccbin}`);
            } else {
                await bot.sendMessage(chatId, `Failed to retrieve credit card data. Please try again.`);
                console.error('[ERROR] Unexpected API response structure:', response.data);
            }
        } catch (error) {
            console.error('[ERROR]', error);
            await bot.sendMessage(chatId, 'An error occurred while generating cc');
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
