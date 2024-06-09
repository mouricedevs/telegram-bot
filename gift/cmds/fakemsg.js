// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨



const axios = require('axios');
const fs = require('fs');
const path = require('path');


module.exports = {
    config: {
        name: "fakemsg",
        author: "Gifted Tech",
        description: "create fake telegram message ",
        category: "ᴜᴛɪʟɪᴛʏ",
        usage: "fakemsg [prompt]",
        usePrefix: true
    },

    onStart: async function({ bot, chatId, msg, args }) {
        const prompt = args.join(' ');

        try {
            const userId = msg.reply_to_message ? msg.reply_to_message.from.id : msg.from.id;
            const username = msg.reply_to_message ? msg.reply_to_message.from.first_name : msg.from.first_name;




            
            const photos = await bot.getUserProfilePhotos(userId);

            if (!photos || !photos.total_count) {
                return bot.sendMessage(chatId, "No profile photos found.");
            }

            const fileId = photos.photos[0][0].file_id;
            const fileLink = await bot.getFileLink(fileId);

            const telegraphUrl = `https://apis-samir.onrender.com/telegraph?url=${encodeURIComponent(fileLink)}&senderId=4679926`;

            const response = await axios.get(telegraphUrl);
            const link = response.data.result.link;

            const imageUrl = `https://apis-samir.onrender.com/q?text=${encodeURIComponent(prompt)}&avatar=${link}&username=${username}`;

            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imagePath = path.join(__dirname, 'image.png');

            fs.writeFile(imagePath, imageResponse.data, 'binary', async (err) => {
                if (err) throw err;

                await bot.sendSticker(chatId, imagePath, { caption: "Here is your image." });
                fs.unlinkSync(imagePath); 
            });
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while processing the command.');
        }
    }
};


// ©𝟮𝟬𝟮𝟰
// 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛
// 𝗧.𝗠𝗘/𝗚𝗜𝗙𝗧𝗘𝗗𝗠𝗗
// 𝗔𝗗𝗗𝗜𝗡𝗚 𝗠𝗢𝗥𝗘 𝗙𝗜𝗟𝗘𝗦 𝗦𝗢𝗢𝗡
// 𝟮𝟬𝟮𝟱 𝗜𝗦 𝗚𝗢𝗡𝗡𝗔 𝗕𝗘 𝗕𝗘𝗧𝗧𝗘𝗥
// 𝗖𝗔𝗡 𝗪𝗘 𝗖𝗢𝗟𝗟𝗔𝗕𝗢𝗥𝗔𝗧𝗘 𝗢𝗡 𝗔 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗪𝗜𝗧𝗛 𝗬𝗢𝗨
