require('dotenv').config()
const discord = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new discord.REST().setToken(process.env.TOKEN);
const client = new discord.Client({intents: [discord.GatewayIntentBits.Guilds]});

(async () => {
    try {
      console.log('Updating / applications...');
      await rest.put(discord.Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
      console.log('Updated !');
    } catch (error) {
      console.error(error);
    }
})();

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
})
client.login(process.env.TOKEN);