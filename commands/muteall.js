const config = require("../main").config;

module.exports = {
	name: 'muteall',
	roles: '@admin',
	description: 'Mute all people in voice channel of the command sender.',
	usage: `${config.prefix}muteall`,
	execute(message) {
		if (message.member.roles.highest.id !== message.guild.roles.highest.id) return;

		const members = message.guild.channels.cache
			.filter(channel => channel.type === 'voice' && channel.name === 'Salon Kiwi')
			.find(channel => channel.members.find(member => member.id === message.author.id)).members;
		members.forEach(member => {
			member.voice.setMute(true);
		});
		message.channel.send('Server muted');
	},
};
