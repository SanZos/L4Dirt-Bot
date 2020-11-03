module.exports = {
	name: 'prune',
	roles: '@admin',
	aliases: ['efface'],
	description: 'Efface les derniers messages, jusqu\'au 99 messages précédents.',
	execute(message, args) {
        if (message.member.roles.highest.id !== message.guild.roles.highest.id) return;

		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Cela ne semble pas être un nombre valide.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('Vous devez entrer un nombre entre 1 et 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Une erreur est survenue lors de la suppression des messages!');
		});
	},
};
