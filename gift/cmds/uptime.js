const os = require('os');
const process = require('process');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "uptime",
        author: "Gifted Tech",
        description: "Display bot uptime",
        category: "ᴛᴏᴏʟs",
        usage: "stats",
        usePrefix: true
    },

    onStart: async function({ bot, chatId }) {
        try {
            const uptime = process.uptime(); 
            const uptimeString = formatUptime(uptime);
            const cpuUsage = os.loadavg();
            const cpuUsageString = cpuUsage.map(avg => avg.toFixed(2)).join(', ');

            const statsMessage = `
            🕒 𝗚𝗶𝗳𝘁𝗲𝗱-𝗠𝗱 𝗥𝘂𝗻𝗻𝗶𝗻𝗴 𝗙𝗼𝗿: ${uptimeString}
            `;

            bot.sendMessage(chatId, statsMessage);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while fetching the stats.');
        }
    }
};


function formatUptime(uptime) {
    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
