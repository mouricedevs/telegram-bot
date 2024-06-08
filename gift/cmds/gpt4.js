const axios = require('axios');
const G4F = require('g4f');

module.exports = {
    config: {
        name: "gpt4",
        author: "Gifted Tech",
        description: "Search response using GPT4",
        category: "ᴀɪ",
        usage: "q",
        usePrefix: true,
        role: 0
    },

    onStart: async function ({ bot, chatId, args }) {
        const query = args.join(" ");

        if (!query) {
            return bot.sendMessage(chatId, `Please provide your query. Usage: .gpt4 [some_text]`);
	}



const GPT = new G4F(); 

const messages = [
	{ role: "system", content: "You're an AI.."},
	{ role: "user", content: text}
];


GPT.chatCompletion(messages)
  .then(result => {
    console.log(result);
    m.reply(result);
  });





}

