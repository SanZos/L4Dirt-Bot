"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Left4DirtBot = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const commands_1 = __importDefault(require("./commands"));
const bot_1 = require("../config/bot");
class Left4DirtBot {
    constructor() {
        this.botInstace = new discord_js_1.default.Client();
        this.cooldownQueue = new Map();
        this.commands = this.injectCommands();
        this.registerEvents();
    }
    login() {
        this.botInstace.login(bot_1.botConfig.token);
    }
    injectCommands() {
        return Object.values(commands_1.default);
    }
    registerEvents() {
        this.botInstace.on('ready', () => this.onReady());
        this.botInstace.on('message', (message) => this.onMessage(message));
    }
    onMessage(message) {
        var _a, _b, _c;
        console.log(`[${message.createdAt.toLocaleTimeString()}]${message.guild ? ' - ' + message.guild.name : ''}${message.channel.type !== 'dm' ? ' - ' + message.channel.name : ''} - ${message.author.username}: ${message.content} `);
        if (message.author.bot)
            return;
        let isACommand = false;
        let usedPrefix = "";
        for (const item of bot_1.botConfig.prefix) {
            if (message.content.startsWith(item)) {
                isACommand = true;
                usedPrefix = item;
            }
        }
        if (!isACommand)
            return;
        const args = message.content.slice(usedPrefix.length).split(/ +/);
        const cmdAsked = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (!cmdAsked)
            return;
        const cmdFound = this.commands.find(cmd => cmd.name === cmdAsked || cmd.aliases && cmd.aliases.includes(cmdAsked));
        if (!cmdFound)
            return;
        if (cmdFound.guildOnly && message.channel.type !== 'text') {
            return message.reply('Je ne peux pas executer cette commande dans un canal privé!');
        }
        if (cmdFound.argsRequired && args.length === 0) {
            let reply = `${message.author}, vous n'avez fournis aucun argument!`;
            if (cmdFound.usage) {
                reply += `\nExemple d'utilisation: \`${usedPrefix}${cmdFound.name} ${cmdFound.usage ? cmdFound.usage : bot_1.botConfig.prefix[0] + cmdFound.name}\``;
            }
            return message.channel.send(reply);
        }
        const now = Date.now();
        const cooldownAmount = (cmdFound.cooldown || bot_1.botConfig.globalCooldown) * 1000;
        if (this.cooldownQueue.has(message.author.id)) {
            const cmdLastUsedTimestamp = (_b = this.cooldownQueue.get(message.author.id)) === null || _b === void 0 ? void 0 : _b.get(cmdFound.name);
            if (cmdLastUsedTimestamp) {
                const expirationDate = cmdLastUsedTimestamp + cooldownAmount;
                if (now < expirationDate) {
                    const timeLeft = (expirationDate - now) / 1000;
                    return message.reply(`Attendez ${timeLeft.toFixed(1)} seconde(s) avant de réutiliser la commande: \`${cmdFound.name}\`.`);
                }
            }
            this.cooldownQueue.set(message.author.id, (_c = this.cooldownQueue.get(message.author.id)) === null || _c === void 0 ? void 0 : _c.set(cmdFound.name, now));
        }
        else {
            this.cooldownQueue.set(message.author.id, new Map().set(cmdFound.name, now));
        }
        setTimeout(() => { var _a; return (_a = this.cooldownQueue.get(message.author.id)) === null || _a === void 0 ? void 0 : _a.delete(cmdFound.name); }, cooldownAmount);
        try {
            cmdFound.execute(message, args);
        }
        catch (error) {
            console.error(error);
            message.reply('Erreur dans l\'éxécution de la command!');
        }
    }
    ;
    onReady() {
        var _a, _b;
        console.log(`${(_a = this.botInstace.user) === null || _a === void 0 ? void 0 : _a.username} est en ligne`);
        return (_b = this.botInstace.user) === null || _b === void 0 ? void 0 : _b.setActivity(`Alive. Type ${bot_1.botConfig.prefix[0]}help for further info.`);
    }
    setAvatar() {
        var _a;
        return (_a = this.botInstace.user) === null || _a === void 0 ? void 0 : _a.setAvatar('./img/avatar.png').then(() => console.log('Avatar mis en place avec succès')).catch(console.error);
    }
}
exports.Left4DirtBot = Left4DirtBot;
