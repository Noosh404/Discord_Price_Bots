// Require dependencies
const { Client } = require('discord.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Load environment variables
dotenv.config();

// Create a bot instance
const bot = new Client();
const contract = `0x579F11C75Eb4e47F5290122e87CA411644aDCD97`;
const multiplier = 1000000;
// Log our bot in
bot.login(process.env.DISCORD_BOT_TOKEN_PRICE);

// Log to console when bot is ready
bot.on('ready', () => {
  console.log(`${bot.user.username} is up and running!`);
  const Guilds = bot.guilds.cache.map(guild => guild.id); // Guild bot belongs to
  console.log(Guilds);

});
bot.on('message', async (message) => {
if (message.content.startsWith('!start')) {
  try {
    while (true) {
      setInterval(updateNickname(message.guild, message.data), 30000); 
    }
}catch (err){}
}
});
// change nickname for a single guild
async function updateNickname(guild, coin) {
  const testdata = await fetch(`https://api.pancakeswap.info/api/tokens/${pancake}`).then(response => response.text()); // get data as raw
  let realdata = JSON.parse(testdata) // convert data to json
  mprice = (realdata['data']['price'] * multiplier).toFixed(5);
  return guild.me.setNickname(`$${mprice}`);
}