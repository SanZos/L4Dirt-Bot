import { Message } from "discord.js";
import { ICommands } from ".";

const kick: ICommands = {
    name: 'kick',
    description: 'Fais semblant de kicker le membre marqué.',
    guildOnly: true,
    cooldown: 5,
    execute(message: Message) {
        if (!message.mentions.users.size) {
            return message.reply('Vous devez désigner un utilisateur pour pouvoir le kicker!');
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`Vous avez voulu kick: ${taggedUser?.username}`);
    },
};
export default kick;