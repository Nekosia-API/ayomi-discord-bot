const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows all available bot commands with details.'),
	execute: async (client, inter) => {
		const embed = new EmbedBuilder()
			.setAuthor({ name: `List of available commands for the ${client.user.username} bot`, iconURL: client.user.displayAvatarURL() })
			.setColor('#00FFAA')
			.setFooter({ text: 'Thank you for using the bot. Have a wonderful day!', iconURL: inter.guild.iconURL() })
			.setTimestamp();

		const fields = client.interactions
			.filter(({ data }) => data.name !== 'help')
			.map(({ data }) => ({
				name: `/${data.name}`,
				value: data.description || 'Description not provided.'
			}));

		embed.addFields(fields);

		await inter.reply({ embeds: [embed] });
	}
};
