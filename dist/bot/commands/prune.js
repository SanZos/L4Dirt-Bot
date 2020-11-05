"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prune = {
    name: 'prune',
    roles: ['@admin'],
    aliases: ['efface'],
    description: 'Efface les derniers messages, jusqu\'au 99 messages précédents.',
    execute(message, args) {
        var _a, _b;
        if (!message.member || !message.guild)
            return;
        if (((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.highest.id) !== ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.roles.highest.id))
            return;
        const amount = parseInt(args[0]) + 1;
        if (isNaN(amount)) {
            return message.reply('Cela ne semble pas être un nombre valide.');
        }
        else if (amount <= 1 || amount > 100) {
            return message.reply('Vous devez entrer un nombre entre 1 et 99.');
        }
        if (message.channel.type === 'news' || message.channel.type === 'text') {
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('Une erreur est survenue lors de la suppression des messages !');
            });
        }
        else {
            message.channel.send('La suppression des messages est impossible en message privé !');
        }
    },
};
exports.default = prune;
