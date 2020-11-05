import { Message } from "discord.js";
import { ICommands } from ".";

const server: ICommands = {
    name: 'server',
    description: 'Affiche les infos du servers.',
    execute(message: Message) {
        if (message.guild) {
            message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
        } else {
            message.channel.send(`Information inconnue sur ce canal...`);
        }
    },
};
export default server;