const { EmbedBuilder } = require('discord.js');
const axios = require('../services/axios.js');
const sendError = require('./error.js');

module.exports = async (inter, category) => {
	const count = inter.options.getInteger('count') || 1;
	const compressed = inter.options.getBoolean('compressed') || false;

	try {
		const { data } = await axios.get(`https://api.nekosia.cat/api/v1/images/${category}`, {
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
};