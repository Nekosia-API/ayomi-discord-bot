require('dotenv').config();

const { Client, Events, Collection } = require('discord.js');
const { readdir } = require('node:fs/promises');
const { join } = require('node:path');

// Intents & commands
const client = new Client({ intents: [1, 2, 4, 256, 512, 32768 ] });
client.interactions = new Collection();
client.cooldowns = new Collection();

// Handlers
require('./handlers/event.js')(client, readdir);
require('./handlers/slash.js')(client, readdir, join);

// Shards error handler
client.on(Events.ShardError, (err, id) => console.error(`Shard${id} »`, err));
client.on(Events.ShardDisconnect, (event, id) => console.log(`Shard${id} » Shard disconnected for an unknown reason. Event: ${event}`));
client.on(Events.ShardReconnecting, id => console.log(`Shard${id} » Attempting to reconnect to the API...`));
client.on(Events.ShardResume, (id, events) => {
	require('./scripts/setActivity.js')(client.user);
	console.log(`Shard${id} » Shard has been successfully resumed. Replayed events: ${events}`);
});
client.on(Events.ShardReady, shard => console.log(`Shard${shard} » Shard has been successfully started`));

// Error handler
process.on('unhandledRejection', err => {
	console.error('ErrUNR »', err);
	process.exit(1);
});


// Run client
client.login(process.env.TOKEN);