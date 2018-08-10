module.exports = {
	name: 'args-info',
	description: 'Information sur les arguments envoyés.',
	args: true,
	usage: '<argument_1> <argument_2>',
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Premier argument: ${args[0]}`);
	},
};
