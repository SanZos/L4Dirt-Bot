module.exports = {
    name: 'meteo',
    usage: '[command name] <Ville> <CodePays>',
    description: 'Donne la météo courante',
    cooldown: 5,
    execute(message, args) {
        const http = require('http');
        const config = require('../config.json');
        const weatherApiKey = process.env.DISCORD_WEATHER_KEY ? process.env.DISCORD_WEATHER_KEY : config.weatherApiKey;
        const apiKeyUrl = '&appid=' + weatherApiKey;

        // api.openweathermap.org/data/2.5/weather?q={city name},{country code}
        const apiURlCity = 'http://api.openweathermap.org/data/2.5/weather?q=';
        // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}
        const apiURlZip = 'http://api.openweathermap.org/data/2.5/weather?zip=';

        let url = "";

        if (args.length == 1) {
            url = apiURlCity + args[0] + ",fr" + apiKeyUrl + "&units=metric";
        } else if (args.length == 2) {
            url = apiURlCity + args[0] + "," + args[1] + apiKeyUrl + "&units=metric";
        } else {
            message.channel.send(`Erreur dans la commande.`);
            return;
        }

        function isValide(jsonResp) {
            if (jsonResp.cod
                && jsonResp.cod == 200
                && jsonResp.name) {
                return true;
            }
            return false;
        }

        function timeConverter(UNIX_timestamp) {
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

        const mydata = http.get(url, function (res) {
            let body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                let meteoResponse = JSON.parse(body);
                // message.channel.send(`La météo de ${meteoResponse.name} indique une température de ${meteoResponse.main.temp}°C.`)

                console.log(meteoResponse);
                const Discord = require('discord.js');
                let richResponse = new Discord.RichEmbed();

                if (isValide(meteoResponse)) {
                    richResponse.setTitle(meteoResponse.name);
                    if (meteoResponse.dt) {
                        let dateMeteo = timeConverter(meteoResponse.dt);
                        richResponse.setDescription("Date de la mesure: " + dateMeteo);
                    }
                    if (meteoResponse.main.temp)
                        richResponse.addField('Température', meteoResponse.main.temp + '°C', true);
                    if (meteoResponse.main.temp_max)
                        richResponse.addField('Temp Minimun', meteoResponse.main.temp_min + '°C', true);
                    if (meteoResponse.main.temp_min)
                        richResponse.addField('Temp Max', meteoResponse.main.temp_max + '°C', true);
                    if (meteoResponse.wind.speed)
                        richResponse.addField('Vent', meteoResponse.wind.speed + 'km/h, ' + meteoResponse.wind.deg + '°')
                    if (meteoResponse.clouds.all)
                        richResponse.addField('Vent', meteoResponse.clouds.all + '%')
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
        });

        mydata.on('error', function () {
            message.channel.send('Une erreur est survenue dans la requète à la météo.');
        });
    },
};
