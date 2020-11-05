import fs from 'fs';
import path from 'path';

export let serverConfig: IServerConfig = ((): IServerConfig => {
    let _configuration: IServerConfig;
    console.log(path.resolve(__dirname, '../../'));
    if (fs.existsSync(path.resolve(__dirname, '../../config.json'))) {
        _configuration = require(path.resolve(__dirname, '../../config.json')).server;
    } else {
        _configuration = {
            port: 8080,
        };
        if (process.env.L4DB_HTTP_PORT) {
            _configuration.port = Number.parseInt(process.env.L4DB_HTTP_PORT);
        }
    }
    return _configuration;
})()

interface IServerConfig {
    port: number
}