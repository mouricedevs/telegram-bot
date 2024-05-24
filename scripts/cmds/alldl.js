const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

module.exports = {
    config: {
        name: "alldl",
        author: "Samir Œ",
        description: "Downloads video from provided link and sends it to the chat",
        category: "utility",
        usage: "/alldownloader <url>",
        usePrefix: true
    },

    onStart: async function ({ bot, chatId, args }) {
        if (args.length === 0) {
            return bot.sendMessage(chatId, "Please provide a URL. Usage: /alldl <url>");
        }

        const link = args.join(" ");
        const apiUrl = `https://noobs-api2.onrender.com/dipto/alldl?url=${encodeURIComponent(link)}`;

        try {
            const response = await axios.get(apiUrl);
            const videoUrl = response.data.result; // Assuming the API returns a direct link to the video file.

            if (videoUrl) {
                const videoStream = (await axios({
                    url: videoUrl,
                    method: 'GET',
                    responseType: 'stream'
                })).data;

                const filename = path.basename(new URL(videoUrl).pathname);
                const tempPath = path.join(__dirname, `/cache/${filename}`);
                
                const writer = fs.createWriteStream(tempPath);

                videoStream.pipe(writer);

                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });

                // Send the video file
                await bot.sendVideo(chatId, tempPath);
                fs.unlinkSync(tempPath); // Clean up after sending
            } else {
                bot.sendMessage(chatId, "Failed to download video. No video link found.");
            }
        } catch (error) {
            console.error("Error in alldownloader command:", error);
            bot.sendMessage(chatId, `Failed to download the video: ${error.message}`);
        }
    }
};
