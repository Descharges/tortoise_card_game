require('dotenv').config()
const discord = require('discord.js');

function randInt(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

const commandsArr = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'tortoise',
        description: 'Displays a random tortoise'
    }
];

commands = new discord.Collection();

for (command of commandsArr) {
    console.log(command);
    commands.set(command.name, command);
}

const rest = new discord.REST({ version: '10' }).setToken(process.env.TOKEN);
const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });

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
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'tortoise') {
        await interaction.reply({ content: "Here you go !", files: [`./tortoises_data/tortoises_png/${randInt(0,217)}.png`]});
    }
})
client.login(process.env.TOKEN);