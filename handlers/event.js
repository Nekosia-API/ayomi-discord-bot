module.exports = async (client, readdir) => {
	console.log('Events » Loading events...');

	try {
		const files = await readdir('./events');
		const filteredFiles = files.filter(f => f.endsWith('.js'));

		for (const file of filteredFiles) {
			const event = require(`../events/${file}`);
			if (event.env === 'development') continue;

			const eventName = event.once ? 'once' : 'on';
			client[eventName](event.name, (...args) => event.execute(...args, client));
		}
	} catch (err) {
		console.error('Events »', err);
	}
};