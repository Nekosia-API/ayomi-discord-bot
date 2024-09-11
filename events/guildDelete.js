module.exports = {
	name: 'guildDelete',
	async execute(server, client) {
		if (!server.available) return;

		const owner = await client.users.fetch(server.ownerId);

		console.log(`NoelCL » Bot removed from: '${server.name}' (${server.id}); Members: ${server.members.cache.size}; Owner: '${owner.tag}' (${owner.id})`);

		client.channels.cache.get(process.env.GUILD_DELETE_LOG).send(
			`\\❎️ » Kicked from: **${server.name}** \`${server.id}\`; Users: **${server.members.cache.filter(m => !m.user.bot).size}**>**${server.members.cache.size}**; Owner: **${owner.tag}** \`${owner.id}\`; Servers: **${client.guilds.cache.size}**;`
		).catch(err => console.warn('GKicked » Message (guildDelete) did not reach the info server.', err.message));
	}
};