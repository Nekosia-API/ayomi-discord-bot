const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('../../services/axios.js');
const sendError = require('../../scripts/error.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('neko')
		.setDescription('Summon a random catgirl image to brighten your day ;3')
		.addIntegerOption(option =>
			option.setName('count')
				.setDescription('How many adorable nekos would you like? (1 to 5)')
				.setMinValue(1)
				.setMaxValue(5))
		.addBooleanOption(option =>
			option.setName('compressed')
				.setDescription('Want the nekos in a lighter, quicker-to-load version? (default: false)')),

	execute: async (client, inter) => {
		const count = inter.options.getInteger('count') || 1;
		const compressed = inter.options.getBoolean('compressed') || false;

		try {
			const { data } = await axios.get('https://api.nekosia.cat/api/v1/images/catgirl', {
				params: { session: 'id', id: inter.user.id, count }
			});

			const images = data.images || [data];
			const embeds = images.map(({ image, colors, attribution }) => {
				const embed = new EmbedBuilder()
					.setImage(image[compressed ? 'compressed' : 'original'].url)
					.setColor(colors.main);

				if (count > 1 && attribution?.copyright) embed.setFooter({ text: attribution.copyright });
				return embed;
			});

			const content = count === 1
				? `https://nekosia.cat/booru/tags/${images[0].category}/${images[0].id}`
				: null;

			await inter.reply({ content, embeds });
		} catch (err) {
			sendError(EmbedBuilder, inter, err);
		}
	}
};
