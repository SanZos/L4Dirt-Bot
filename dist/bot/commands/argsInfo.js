"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsInfo = void 0;
exports.argsInfo = {
    name: 'argsInfo',
    description: '<TEST> Information sur les arguments envoyés.',
    argsRequired: true,
    usage: '<argument_1> <argument_2>',
    execute(message, args) {
        console.log(args);
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Premier argument: ${args[0]}`);
    },
};
exports.default = exports.argsInfo;
