import { Message } from "discord.js";
import { ICommands } from ".";

const muteall: ICommands = {
    name: 'muteall',
    roles: ['@admin'],
    description: 'Mute all people in voice channel of the command sender.',
    execute(message: Message) {
        if (!message.member || !message.guild) return;
        if (message.member?.roles.highest.id !== message.guild?.roles.highest.id) return;
        message.guild.channels.cache
            .filter(channel => channel.type === 'voice')
            .map(channel => channel.members.find(member => member.id === message.author.id))
            .forEach(member => {
                member?.voice.setSelfMute(true);
            });
        message.channel.send('Server muted');
    },
};
export default muteall;