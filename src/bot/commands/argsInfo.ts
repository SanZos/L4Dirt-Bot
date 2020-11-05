import { Message } from "discord.js";
import { ICommands } from '.';

export const argsInfo: ICommands = {
    name: 'argsInfo',
    description: '<TEST> Information sur les arguments envoyés.',
    argsRequired: true,
    usage: '<argument_1> <argument_2>',
    execute(message: Message, args: any) {
        console.log(args);
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

        message.channel.send(`Premier argument: ${args[0]}`);
    },
};
export default argsInfo;
