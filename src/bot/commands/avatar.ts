import { Message } from "discord.js";
import { ICommands } from ".";

export const avatar: ICommands = {
    name: 'avatar',
    aliases: ['icon', 'icone'],
    description: 'Récupère l\'URL de l\'utilisateur marqué, ou votre propre avatar..',
    execute(message: Message) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Votre avatar: ${message.author.displayAvatarURL}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `Avatar de ${user.username}: ${user.displayAvatarURL}`;
        });

        message.channel.send(avatarList);
    },
};
export default avatar;
