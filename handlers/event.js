const path = require('node:path');

module.exports = async (client, readdir) => {
	try {
		const files = (await readdir('./events')).filter(f => f.endsWith('.js'));

		for (const file of files) {
			const event = require(path.join(__dirname, '../events', file));
			if (event.env === 'development') continue;

			const handler = event.once ? 'once' : 'on';
			client[handler](event.name, (...args) => event.execute(...args, client));
		}
	} catch (err) {
		console.error('Error loading events:', err);
	}
};