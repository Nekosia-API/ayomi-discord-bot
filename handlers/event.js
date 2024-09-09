const { join } = require('node:path');
const { readdir } = require('node:fs/promises');

module.exports = async (client) => {
	try {
		const eventFiles = (await readdir(join(__dirname, '..', 'events'))).filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {
			const event = require(join(__dirname, '..', 'events', file));

			if (event.env === 'development') continue;

			const handler = event.once ? 'once' : 'on';
			client[handler](event.name, (...args) => event.execute(...args, client));
		}
	} catch (err) {
		console.error('Error loading events:', err);
	}
};
