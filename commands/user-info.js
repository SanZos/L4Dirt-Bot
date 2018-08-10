module.exports = {
	name: 'user-info',
	description: 'Affiche vos informations.',
	execute(message) {
		message.channel.send(`Votre username: ${message.author.username}\nVotre ID: ${message.author.id}`);
	},
};
