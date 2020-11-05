import http from "http";

import { Message, MessageEmbed } from "discord.js";
import { ICommands } from ".";
import { botConfig } from '../../config/bot';

const meteo: ICommands = {
    name: 'meteo',
    usage: `${botConfig.prefix[0]}meteo <Ville>`,
    description: 'Donne la météo courante dans la ville en argument (limité à la France pour le moment)',
    cooldown: 5,
    execute(message: Message, args: any) {
        const apiKeyUrl = '&appid=' + botConfig.weatherApiKey;

        // api.openweathermap.org/data/2.5/weather?q={city name},{country code}
        const apiURlCity = 'http://api.openweathermap.org/data/2.5/weather?q=';
        // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}
        // const apiURlZip = 'http://api.openweathermap.org/data/2.5/weather?zip=';

        let url = "";
        if (args.length > 0) {
            url = `${apiURlCity}${encodeURIComponent(args.join(' '))},fr${apiKeyUrl}&units=metric`;
        } else {
            message.channel.send(`Erreur dans la commande.`);
            return;
        }

        function isValide(jsonResp: { cod: number, name: string }) {
            if (jsonResp.cod
                && jsonResp.cod == 200
                && jsonResp.name) {
                return true;
            }
            return false;
        }

        function timeConverter(UNIX_timestamp: number) {
            let dateConvert = new Date(UNIX_timestamp * 1000);
            let months = ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let year = dateConvert.getFullYear();
            let month = months[dateConvert.getMonth()];
            let date = dateConvert.getDate();
            let hour = dateConvert.getHours();
            let min = dateConvert.getMinutes();
            let sec = dateConvert.getSeconds();
            let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
        }

        http.get(url, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                let meteoResponse = JSON.parse(body);
                let richResponse = new MessageEmbed();

                if (isValide(meteoResponse)) {
                    richResponse.setTitle(meteoResponse.name);
                    if (meteoResponse.dt)
                        richResponse.setDescription("Date de la mesure: " + timeConverter(meteoResponse.dt));
                    if (meteoResponse.main.temp)
                        richResponse.addField('Température', meteoResponse.main.temp + '°C', true);
                    if (meteoResponse.main.temp_max)
                        richResponse.addField('Temp Minimun', meteoResponse.main.temp_min + '°C', true);
                    if (meteoResponse.main.temp_min)
                        richResponse.addField('Temp Max', meteoResponse.main.temp_max + '°C', true);
                    if (meteoResponse.wind.speed)
                        richResponse.addField('Vent', meteoResponse.wind.speed + 'km/h, ' + meteoResponse.wind.deg + '°')
                    if (meteoResponse.clouds.all)
                        richResponse.addField('Nuages', meteoResponse.clouds.all + '%')
                    if (meteoResponse.humidity)
                        richResponse.addField('Humidité', meteoResponse.humidity + '%')
                    if (meteoResponse.pressure)
                        richResponse.addField('Pression', meteoResponse.pressure + 'hPa')
                    message.channel.send(richResponse);
                } else if (meteoResponse.cod && meteoResponse.cod != 200 && meteoResponse.message) {
                    message.channel.send('Une erreur est survenue dans la requète à la météo.' + "\n" + `Code erreur : ${meteoResponse.cod}, message : ${meteoResponse.message}`);
                } else {
                    message.channel.send('Une erreur inconnue est survenue dans la requète à la météo.');
                }
            });
        }).on('error', () => {
            message.channel.send('Une erreur est survenue dans la requète à la météo.');
        });
    },
};
export default meteo;
