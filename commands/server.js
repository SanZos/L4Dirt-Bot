module.exports = {
	name: 'server',
	description: 'Affiche les infos du servers.',
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};
