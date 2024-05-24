// commands/quiz.js
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "quiz",
    description: "Play a quiz",
    aliases: ["mcq"],
    role: "user",
    usePrefix: true,
    author: "Your Name",
};

const quizDataPath = path.join(__dirname, '..', 'json');

const getRandomQuestion = () => {
    const allFiles = fs.readdirSync(quizDataPath).filter(file => file.endsWith('.json'));

    if (allFiles.length === 0) {
        console.error('No quiz data found.');
        return null;
    }

    const randomCategory = allFiles[Math.floor(Math.random() * allFiles.length)];
    const filePath = path.join(quizDataPath, randomCategory);

    try {
        const data = fs.readJsonSync(filePath);
        return data[Math.floor(Math.random() * data.length)];
    } catch (error) {
        console.error(`Error reading quiz data from ${filePath}:`, error.message);
        return null;
    }
};

module.exports.run = async function ({ bot, chatId, userId }) {
    const questionData = getRandomQuestion();

    if (!questionData) {
        try {
            await bot.sendMessage(chatId, 'Failed to load a quiz question. Please try again later.');
        } catch (error) {
            console.error('Error sending message:', error.message);
        }
        return;
    }

    const options = [
        { text: 'A', callback_data: 'A' },
        { text: 'B', callback_data: 'B' },
        { text: 'C', callback_data: 'C' },
        { text: 'D', callback_data: 'D' },
    ];

    const inlineKeyboard = bot.inlineKeyboard([options]);

    try {
        const messageText = `${questionData.question}\n\n[A]. ${questionData.A}\n[B]. ${questionData.B}\n[C]. ${questionData.C}\n[D]. ${questionData.D}`;
        const message = await bot.sendMessage(chatId, messageText, { replyMarkup: inlineKeyboard });

        bot.on('callbackQuery', async (msg) => {
            try {
                // Check if the callback query has data and is from the same user
                if (!msg.data || msg.from.id !== userId) {
                    console.error('Callback query data is missing or not from the same user.');
                    return;
                }

                const option = msg.data;

                if (option === questionData.answer) {
                    await bot.sendMessage(chatId, 'Congratulations! Your answer is correct.');
                } else {
                    await bot.sendMessage(chatId, `Incorrect! The correct answer is ${questionData.answer}.`);
                }

                // Delete the question message
                await bot.deleteMessage(chatId, message.message_id);
            } catch (error) {
                console.error('Error handling user response:', error.message);
            }
        });
    } catch (error) {
        console.error('Error sending question:', error.message);
    }
};