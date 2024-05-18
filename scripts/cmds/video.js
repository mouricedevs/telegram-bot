const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const path = require("path");
const ID3Writer = require('node-id3');

module.exports = {
  config: {
    name: "video",
    author: "Samir Œ",
    description: "Search and download video from YouTube",
    category: "video",
    usage: "video [title]",
    usePrefix: true
  },
  onStart: async ({ bot, chatId, args }) => {
    const searchTerm = args.join(" ");

    if (!searchTerm) {
      return bot.sendMessage(chatId, `Please provide a search query. Usage: /video [title]`);
    }

    const searchMessage = await bot.sendMessage(chatId, `🔍 Searching for video: ${searchTerm}`);

    try {
      const searchResults = await yts(searchTerm);
      if (!searchResults.videos.length) {
        return bot.sendMessage(chatId, "No video found for your query.");
      }

      const video = searchResults.videos[0];
      const videoUrl = video.url;
      const fileName = `${video.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
      const filePath = path.join(__dirname, "cache", fileName);

      if (fs.existsSync(filePath)) {
        console.log('[CACHE]', `File already downloaded. Using cached version: ${fileName}`);
        bot.sendVideo(chatId, fs.createReadStream(filePath), { caption: `${video.title}` });
      } else {
        const fileWriteStream = fs.createWriteStream(filePath);
        ytdl(videoUrl, { filter: 'audioandvideo' })
          .on('error', (err) => {
            console.error('Error downloading video:', err);
            bot.sendMessage(chatId, 'An error occurred while downloading the video.');
          })
          .pipe(fileWriteStream);

        fileWriteStream.on('finish', async () => {
          fileWriteStream.end();

          const stats = fs.statSync(filePath);
          if (stats.size > 100000000) { 
            fs.unlinkSync(filePath);
            return bot.sendMessage(chatId, '❌ The file could not be sent because it is larger than 55MB.');
          }

          bot.sendVideo(chatId, fs.createReadStream(filePath), { caption: `${video.title}` });
        });
      }
    } catch (error) {
      console.error('[ERROR]', error);
      bot.sendMessage(chatId, 'An error occurred while processing the command.');
    }
    await bot.deleteMessage(chatId, searchMessage.message_id);
  }
};
