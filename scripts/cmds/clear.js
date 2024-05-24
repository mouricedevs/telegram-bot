const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "cache",
        author: "Samir Œ",
        description: "Delete all files inside the caches folder",
        category: "admin",
        usage: "/clearcache",
        usePrefix: true
    },

    onStart: async function({ bot, chatId, msg }) {
       
        const cacheFolderPath = path.join(__dirname, 'cache');

        fs.readdir(cacheFolderPath, (err, files) => {
            if (err) {
                console.error(err);
                return bot.sendMessage(chatId, "An error occurred while reading the cache directory.");
            }

            files.forEach(file => {
                const filePath = path.join(cacheFolderPath, file);
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error(err);
                        bot.sendMessage(chatId, `Failed to delete file: ${file}`);
                    }
                });
            });

            bot.sendMessage(chatId, "All files in the cache folder have been deleted.");
        });
    }
};