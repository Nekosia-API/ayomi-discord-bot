module.exports = (EmbedBuilder, inter, err) => {
	const embed = new EmbedBuilder()
		.setColor('#FF0048')
		.setAuthor({
			name: '❌ Something went wrong',
			iconURL: inter.commandName ? inter.user.displayAvatarURL() : inter.author.displayAvatarURL()
		})
		.setDescription('We sincerely apologize for the inconvenience. If this error persists, please contact the server administrator.');

	console.error('Client »', err);

	const replyOptions = { embeds: [embed] };

	if (inter.replied) {
		inter.followUp(replyOptions).catch(console.error);
	} else if (inter.deferred) {
		inter.editReply(replyOptions).catch(console.error);
	} else {
		inter.reply(replyOptions).catch(console.error);
	}
};