require('dotenv').config();

const { Client, Events, Collection } = require('discord.js');
const { readdir } = require('node:fs/promises');

// Initialize client with intents and collections
const client = new Client({ intents: [1, 2, 4, 256, 512, 32768] });
client.interactions = new Collection();
client.cooldowns = new Collection();

// Load handlers
require('./handlers/event.js')(client, readdir);
require('./handlers/slash.js')(client, readdir);

// Shard event handlers
const shardEvents = {
	[Events.ShardError]: (error, id) => console.error(`Shard${id} » Error:`, error),
	[Events.ShardDisconnect]: (event, id) => console.log(`Shard${id} » Disconnected! Event:`, event),
	[Events.ShardReconnecting]: id => console.log(`Shard${id} » Reconnecting...`),
	[Events.ShardResume]: (id, replayedEvents) => {
		require('./scripts/setActivity.js')(client.user);
		console.log(`Shard${id} » Resumed. Replayed events:`, replayedEvents);
	},
	[Events.ShardReady]: shard => console.log(`Shard${shard} » Ready and running`)
};

// Register shard events
Object.entries(shardEvents).forEach(([event, handler]) => client.on(event, handler));

// Global error handling
process.on('unhandledRejection', (error) => {
	console.error('Unhandled rejection:', error);
	process.exit(1);
});

// Start the client
client.login(process.env.TOKEN).catch(console.error);