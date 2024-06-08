const axios = require('axios');
const G4F = require('g5f');

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

    const gptA = async(client, m, text) => {

if (!text) return m.reply("Provide text...");




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

export default gptA;
