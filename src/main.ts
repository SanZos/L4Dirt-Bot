import { Left4DirtBot } from './bot';
import { server } from './web/server';

server.listen(process.env.PORT || 8080);

export const bot = new Left4DirtBot();
bot.login();
