const { prefix } = require('../config.json');

module.exports = {
	name: 'muteall',
	description: 'Mute all people in voice channel of the command sender.',
	usage: `${prefix}muteall`,
	execute(message) {
		const members = message.guild.channels.cache
			.filter(channel => channel.type === 'voice' && channel.name === 'Salon Kiwi')
			.find(channel => channel.members.find(member => member.id === message.author.id)).members;
		members.forEach(member => {
			member.voice.setMute(true);
		});
		message.channel.send('Server muted');
	},
};
