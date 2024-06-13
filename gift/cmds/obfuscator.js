const JavaScriptObfuscator = require('javascript-obfuscator')

module.exports = {
  config: {
    name: "enc",
    author: "Gifted Tech",
    description: "Encrypts js code",
    category: "ᴛᴏᴏʟs",
    usage: ".enc (reply to the message you want to delete)",
    usePrefix: true
  },

  onStart: async function ({ bot, msg }) {
try {
  
let code = arg.join(' ')

  if (!arg[0]) { await bot.sendMessage('After the command, provide a valid JavaScript code for encryption');return}; 

  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: false,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1
  });

await bot.sendMessage(obfuscationResult.getObfuscatedCode());

} catch (error) {
      console.log('Error obfuscating:', error);
      await bot.sendMessage(msg.chat.id, 'An error occurred.');
    }
  }
};
