const setActivity = require('../scripts/setActivity.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		setActivity(client.user);
		console.log(`Client » ${client.user.username} is ready!`);

		if (process.env.NODE_ENV === 'development') return;
		try {
			process.send('ready');
		} catch (err) {
			console.warn('Failed to send ready signal to PM2.', err.message);
		}
	},
};