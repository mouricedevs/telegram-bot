
    const fs = require("fs-extra");
    const ytdl = require("ytdl-core");
    const yts = require("yt-search");
    const path = require("path");


module.exports = {
  config: {
    name: "sing",
    author: "Samir Œ",
    description: "Search and download music from YouTube",
    category: "song",
    usage: "song [title]",
    usePrefix: true,
    role: 0

  },
  onStart: async ({ bot, chatId, args }) => {

    const search = args.join(" ");

    try {
      if (!search) {
        return bot.sendMessage(chatId, `Please provide a search query. Usage: /sing song name`);
      }

      bot.sendMessage(chatId, `🔍 Searching for song: ${search}`);

      const searchResults = await yts(search);
      if (!searchResults.videos.length) {
        return bot.sendMessage(chatId, "No music found for your query.");
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;

      const stream = ytdl(musicUrl, { filter: "audioonly" });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading music: ${info.videoDetails.title}`);
      });

      const fileName = `${music.title}.mp3`;
      const filePath = path.join(__dirname, "cache", fileName);

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('end', () => {
        
        const stats = fs.statSync(filePath);
        if (stats.size > 226214400) {
          fs.unlinkSync(filePath);
          return bot.sendMessage(chatId, '❌ The file could not be sent because it is larger than 205MB.');
        }

        bot.sendAudio(chatId, fs.createReadStream(filePath), { caption: `${music.title}` });
      });

    } catch (error) {
      console.error('[ERROR]', error);
      bot.sendMessage(chatId, 'An error occurred while processing the command.');
    }
  }
}; 