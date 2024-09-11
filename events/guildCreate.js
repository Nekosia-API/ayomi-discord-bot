const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'guildCreate',
	async execute(server, client) {
		if (!server.available) return;

		const owner = await client.users.fetch(server.ownerId);
		owner.send({ embeds: [new EmbedBuilder()
			.setColor('#6EADD1')
			.setAuthor({ name: 'Thank you! 💗', iconURL: server.iconURL() })
			.addFields([
				{ name: '» Official website', value: '> https://nekosia.cat' },
				{ name: '» More info', value: '> [nekosia.cat/ayomi](https://nekosia.cat/ayomi)', inline: true },
				{ name: '» Commands', value: '> [nekosia.cat/ayomi/commands](https://nekosia.cat/ayomi/commands)', inline: true }
			])
			.setThumbnail(client.user.displayAvatarURL())]
		}).catch(err => console.log('NoelCL » Message for adding the bot was not delivered.', err.message));

		console.log(`NoelCL » Bot added to: '${server.name}' (${server.id}); Members: ${server.members.cache.size}; Owner: '${owner.tag}' (${owner.id})`);

		client.channels.cache.get(process.env.GUILD_CREATE_LOG).send(
			`\\✅ » Added to: **${server.name}** \`${server.id}\`; Users: **${server.members.cache.filter(m => !m.user.bot).size}**>**${server.members.cache.size}**; Owner: **${owner.tag}** \`${owner.id}\`; Servers: **${client.guilds.cache.size}**;`
		).catch(err => console.warn('GAdded » Message (guildCreate) did not reach the info server.', err.message));
	}
};