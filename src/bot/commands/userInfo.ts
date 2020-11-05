import { Message } from "discord.js";
import { ICommands } from ".";

const userInfo: ICommands = {
    name: 'user-info',
    description: 'Affiche vos informations.',
    execute(message: Message) {
        message.channel.send(`Votre username: ${message.author.username}\nVotre ID: ${message.author.id}`);
    },
};
export default userInfo;