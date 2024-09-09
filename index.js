require('dotenv').config();
const { Client, Events, Collection } = require('discord.js');

// Initialize client with intents and collections
const client = new Client({ intents: [1, 2, 4, 256, 512, 32768] });
client.interactions = new Collection();
client.cooldowns = new Collection();

// Load handlers
['./handlers/event.js', './handlers/slash.js'].forEach(handler => require(handler)(client));

// Register shard events
const shardEvents = {
	[Events.ShardError]: (err, id) => console.error(`Shard${id} »`, err),
	[Events.ShardDisconnect]: (event, id) => console.log(`Shard${id} » Disconnected! Event:`, event),
	[Events.ShardReconnecting]: id => console.log(`Shard${id} » Reconnecting...`),
	[Events.ShardResume]: (id, replayedEvents) => {
		require('./scripts/setActivity.js')(client.user);
		console.log(`Shard${id} » Resumed. Replayed events:`, replayedEvents);
	},
	[Events.ShardReady]: shard => console.log(`Shard${shard} » Ready and running`)
};

Object.entries(shardEvents).forEach(([event, handler]) => client.on(event, handler));

// Global error handling
process.on('unhandledRejection', error => {
	console.error('Unhandled rejection:', error);
	process.exit(1);
});

// Start the client
client.login(process.env.TOKEN).catch(console.error);