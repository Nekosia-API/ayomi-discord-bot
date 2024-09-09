const setActivity = require('../scripts/setActivity.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		setActivity(client.user);
		console.log(`Client » ${client.user.username} is ready!`);
	}
};