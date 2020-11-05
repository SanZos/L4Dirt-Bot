"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const _1 = __importStar(require("."));
const bot_1 = require("../../config/bot");
exports.help = {
    name: 'help',
    aliases: ['commands'],
    description: 'Liste toute les commandes, ou les infos spécifiques à une commande.',
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        if (!args.length) {
            data.push('Voilà une liste de toutes les commandes:');
            data.push(Object.values(_1.default).map(command => command.name).join(', '));
            data.push(`\nVous pouvez envoyer \`${bot_1.botConfig.prefix}help [command name]\` pour avoir des infos sur une commande spécifique.`);
        }
        else {
            if (!_1.getAliasesWithCommandsName().has(args[0])) {
                return message.reply('Ce n\'est pas une commande valide!');
            }
            const command = Object.values(_1.default).find(command => command.name === _1.getAliasesWithCommandsName().get(args[0]));
            if (!command)
                return;
            data.push(`**Name:** ${command.name}`);
            if (command.roles)
                data.push(`**Roles:** ${command.roles.join(', ')}`);
            if (command.description)
                data.push(`**Description:** ${command.description}`);
            if (command.aliases)
                data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.usage)
                data.push(`**Utilisation:** ${bot_1.botConfig.prefix}${command.name} ${command.usage}`);
            let _cd = command.cooldown !== undefined ? command.cooldown : bot_1.botConfig.globalCooldown;
            data.push(`**Cooldown:** ${_cd} seconde(s)`);
        }
        message.author.send(data, { split: true })
            .then(() => {
            if (message.channel.type !== 'dm') {
                message.channel.send(`${message.author.username}, je vous ai envoyé un message privé avec toutes les commandes.`);
            }
        })
            .catch(() => message.reply('Il semble que je ne puisse pas vous envoyer de message privé'));
    },
};
exports.default = exports.help;
