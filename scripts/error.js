module.exports = (EmbedBuilder, inter, err) => {
	console.error('Client »', err);

	const embed = new EmbedBuilder()
		.setColor('#FF0048')
		.setAuthor({
			name: '❌ Something went wrong',
			iconURL: inter.commandName ? inter.user.displayAvatarURL() : inter.author.displayAvatarURL()
		})
		.setDescription('We sincerely apologize for the inconvenience. If this error persists, please contact the server administrator.');

	const handleReply = method => inter[method]({ embeds: [embed] }).catch(console.error);
	if (inter.replied) {
		handleReply('followUp');
	} else if (inter.deferred) {
		handleReply('editReply');
	} else {
		handleReply('reply');
	}
};