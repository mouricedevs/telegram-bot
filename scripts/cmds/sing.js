const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const path = require("path");
const ID3Writer = require('node-id3');

module.exports = {
  config: {
    name: "sing",
    author: "Samir Œ",
    description: "Search and download music from YouTube",
    category: "Song",
    usage: "music [title]",
  },
  onStart: async ({ bot, chatId, args }) => {
    const searchTerm = args.join(" ");

    if (!searchTerm) {
      return bot.sendMessage(chatId, `Please provide a search query. Usage: ${global.config.prefix}music [title]`);
    }

    const searchMessage = await bot.sendMessage(chatId, `🔍 Searching for music: ${searchTerm}`);

    try {
      const searchResults = await yts(searchTerm);
      if (!searchResults.videos.length) {
        return bot.sendMessage(chatId, "No music found for your query.");
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;
      const fileName = `${music.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;
      const filePath = path.join(__dirname, "cache", fileName);

      if (fs.existsSync(filePath)) {
        console.log('[CACHE]', `File already downloaded. Using cached version: ${fileName}`);
        bot.sendAudio(chatId, fs.createReadStream(filePath), { caption: `${music.title}` });
      } else {
        const stream = ytdl(musicUrl, { filter: "audioonly" });

        const fileWriteStream = fs.createWriteStream(filePath);
        stream.pipe(fileWriteStream);

        stream.on('end', async () => {
          fileWriteStream.end();

          const tags = {
            title: music.title,
            artist: music.author.name,
         
          };

        
          fileWriteStream.on('finish', () => {
            ID3Writer.update(tags, filePath);
            const stats = fs.statSync(filePath);
            if (stats.size > 26214400) {
              fs.unlinkSync(filePath);
              return bot.sendMessage(chatId, '❌ The file could not be sent because it is larger than 25MB.');
            }

   bot.sendAudio(chatId, fs.createReadStream(filePath), { caption: `${music.title}` });
          });
        });
      }
    } catch (error) {
      console.error('[ERROR]', error);
      bot.sendMessage(chatId, 'An error occurred while processing the command.');
    }
   await bot.deleteMessage(chatId, searchMessage.message_id);       
  }
};
