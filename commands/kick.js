module.exports = {
	name: 'kick',
	description: 'Fais semblant de kicker le membre marqué.',
	guildOnly: true,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('Vous devez désigner un utilisateur pour pouvoir le kicker!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`Vous avez voulu kick: ${taggedUser.username}`);
	},
};
