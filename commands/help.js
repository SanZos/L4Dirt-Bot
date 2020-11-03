const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	aliases: ['commands'],
	description: 'Liste toute les commandes, ou les infos spécifiques à une commande.',
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;
		const data = [];

		if (!args.length) {
			data.push('Voilà une liste de toutes les commandes:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nVous pouvez envoyer \`${prefix}help [command name]\` pour avoir des infos sur une commande spécifique.`);
		}
		else {
			if (!commands.has(args[0])) {
				return message.reply('Ce n\'est pas une commande valide!');
			}

			const command = commands.get(args[0]);

			data.push(`**Name:** ${command.name}`);

			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.usage) data.push(`**Utilisation:** ${prefix}${command.name} ${command.usage}`);

			data.push(`**Cooldown:** ${command.cooldown || 3} seconde(s)`);
		}

		message.author.send(data, { split: true }).then(() => {
			if (message.channel.type !== 'dm') {
				message.channel.send(`${message.author.username}, je vous ai envoyé un message privé avec toutes les commandes.`);
			}
		})
			.catch(() => message.reply('Il semble que je ne puisse pas vous envoyer de message privé'));
	},
};