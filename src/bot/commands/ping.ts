import { Message } from "discord.js";
import { ICommands } from ".";

const ping: ICommands = {
    name: 'ping',
    description: 'Ping!',
    execute(message: Message) {
        message.channel.send('Pong.');
    },
};
export default ping;
