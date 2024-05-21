module.exports = {
    config: {
        name: "shell",
        author: "Samir Œ",
        description: "Access the shell (admin only)",
        category: "utility",
        usage: "shell <command>",
        usePrefix: true,
        role: 2
    },
    onStart: async function ({ bot, chatId, userId, args }) {
       
        const command = args.join(' ');

        if (!command) {
            return bot.sendMessage(chatId, `Please provide a command. Usage: /shell <command>`);
        }

        try {
            const { exec } = require('child_process');
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    bot.sendMessage(chatId, 'An error occurred while executing the command.');
                    return;
                }
                if (stderr) {
                    console.error(`Command stderr: ${stderr}`);
                    bot.sendMessage(chatId, `Error: ${stderr}`);
                    return;
                }
                console.log(`Command output: ${stdout}`);
                bot.sendMessage(chatId, `Output: ${stdout}`);
            });
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while processing the command.');
        }
    }
};
