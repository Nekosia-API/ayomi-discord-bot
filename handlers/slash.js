const { join } = require('node:path');
const { readdir } = require('node:fs/promises');
const COMMANDS_PATH = join(__dirname, '..', 'commands');

module.exports = async client => {
	try {
		const commandCategories = await readdir(COMMANDS_PATH);

		for (const category of commandCategories) {
			const categoryPath = join(COMMANDS_PATH, category);
			const commandFiles = (await readdir(categoryPath)).filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const command = require(join(categoryPath, file));

				if (command?.data?.name && typeof command.execute === 'function') {
					client.interactions.set(command.data.name, command);
				} else {
					console.error(`SlashH » Invalid command in ${join(categoryPath, file)}: missing "data" or "execute".`);
				}
			}
		}
	} catch (err) {
		console.error('SlashH » Error reading command files:', err);
	}
};