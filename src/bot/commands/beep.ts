import { Message } from "discord.js";
import { ICommands } from ".";

export const beep: ICommands = {
    name: 'beep',
    description: 'Beep!',
    execute(message: Message) {
        message.channel.send('Boop.');
    },
};
export default beep;
