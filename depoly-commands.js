require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

const commands = readdirSync(join(__dirname, 'commands'))
	.flatMap(folder => readdirSync(join(__dirname, 'commands', folder))
		.filter(file => file.endsWith('.js'))
		.map(file => {
			const command = require(join(__dirname, 'commands', folder, file));
			if (command?.data?.toJSON && command.execute) {
				return command.data.toJSON();
			} else {
				console.warn(`SlashC » Invalid command: ${file}`);
				return null;
			}
		})
	)
	.filter(Boolean);

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application slash commands...');

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands }
		);

		console.log(`Successfully reloaded ${data.length} slash commands!`);
	} catch (err) {
		console.error('An error occurred while reloading slash commands:', err);
	}
})();