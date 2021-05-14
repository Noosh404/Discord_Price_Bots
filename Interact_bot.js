// Require dependencies
const { Client } = require('discord.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const axios = require('axios'); 

// Load environment variables
dotenv.config();

// Create a bot instance
const bot = new Client();
const contract = `0x579F11C75Eb4e47F5290122e87CA411644aDCD97`;
const multiplier = 1000000;
// Log our bot in
bot.login(process.env.DISCORD_BOT_TOKEN);

// Log to console when bot is ready
bot.on('ready', () => {
  console.log(`${bot.user.username} is up and running!`);
  const Guilds = bot.guilds.cache.map(guild => guild.id); // Guilds bot belongs to
  console.log(Guilds);
});

// Reply to user messages
bot.on('message', async (message) => {
  // Do not reply if message was sent by bot
  if (message.author.bot) return;

//   Reply to !ping
//  if (message.content.startsWith('!ping')) {
//    return message.channel.send('I am working!');
//  }

  // Reply to !price
  if (message.content.startsWith('?price')) {
        const rawdata = await fetch(`https://api.pancakeswap.info/api/tokens/${contract}`).then(response => response.text()); // fetch raw data from api
        let data = JSON.parse(rawdata) // export raw data as json
       mprice = (data['data']['price'] * multiplier).toFixed(5); 
       mbnb = (data['data']['price_BNB'] * multiplier).toFixed(7);

       message.channel.send(`1 million: ${mprice} USD | ${mbnb} BNB`)
  }
  // Reply to !buy
  if (message.content.startsWith('?buy')) {
       const pancake = `https://exchange.pancakeswap.finance/#/swap?inputCurrency=${contract}`
       message.channel.send(`Pancakeswap: ${pancake}`);
  }

  // Reply to !chart
  if (message.content.startsWith('?chart')) {
     const chart = `https://charts.bogged.finance/?token=${contract}`
     message.channel.send(`BoggedFinance Chart: ${chart}`);
  }
  if (message.content.startsWith('?help')) {
  message.channel.send(`?price : Current prices\n?buy : Where to buy\n?chart : Chart of coin prices\n?help : help page`);
  }
});