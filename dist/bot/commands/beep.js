"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beep = void 0;
exports.beep = {
    name: 'beep',
    description: 'Beep!',
    execute(message) {
        message.channel.send('Boop.');
    },
};
exports.default = exports.beep;
