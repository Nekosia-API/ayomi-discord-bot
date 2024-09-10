const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows all available bot commands with details.'),
	execute: async (client, inter) => {
		const embed1 = new EmbedBuilder()
			.setAuthor({ name: `List of available commands for the ${client.user.username} bot`, iconURL: client.user.displayAvatarURL() })
			.setColor('#00FFAA')
			.setDescription('Please see https://nekosia.cat/ayomi/commands.');

		const embed2 = new EmbedBuilder()
			.setColor('#111f25')
			.addFields([
				{ name: '🌍  Official Website', value: '[nekosia.cat](https://nekosia.cat)', inline: true },
				{ name: '📝  Documentation', value: '[Documentation](https://nekosia.cat/documentation?page=introduction)', inline: true },
				{ name: '😺  Status Page', value: '[status.nekosia.cat](https://status.nekosia.cat)', inline: true },
				{ name: '💗  Add This Bot', value: 'Want to add this bot to your server? Click [here](https://nekosia.cat/ayomi).' },
				{ name: '🔢  Are You a Developer?', value: 'If so, check out the [Nekosia API documentation](https://nekosia.cat/documentation?page=introduction). This API provides a variety of random anime images. Add some anime magic to your projects today!' },
				{ name: '😻  Cutest Anime Booru', value: 'Visit our [Anime Booru](https://nekosia.cat/booru) for adorable images! Join our community to rate, comment, and browse through images. You can also submit requests to update image information. Once reviewed, your changes will be reflected in API responses. We greatly appreciate your contributions, as our API relies on accurate image tagging.' }
			])
			.setFooter({ text: 'Copyright © 2024 by Nekosia API. All Rights Reserved.', iconURL: client.user.displayAvatarURL() });

		await inter.reply({ embeds: [embed1, embed2] });
	}
};