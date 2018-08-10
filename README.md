# L4Dirt-Bot

## Index

1. [Requirements](##-Requirements)
2. [Installation](##-Installation)
3. [Fonctions](##-Fonctions)
4. [TODO](##-TODO)
5. [Utilisation](##-Utilisation)
6. [Parsing des commandes](##-Parsing-des-commandes)

## Requirements

- discord.js
- NodeJS 8+
- Un token discord bot
- Une clé openweather

## Installation

Commencer par un `npm install` pour telecharger les modules du package.json.
Puis créer un fichier config.json en respectant le format de config.dummy.json.

**Attention à ne pas commit les tokens discord, et clés api**, n'oubliea pas que le dépot git est public.

## Fonctions

- [x] Connexion
  - [x] Récupération du token depuis un fichier externe
  - [x] Connexion
  - [x] Changement d'avatar
  - [x] Ping
- [x] Météo
  - [x] Récupération de la clé api depuis un fichier externe
  - [x] Accès a l'api OpenWeather

## TODO

- Vérification des autorisations de l'appelant (sur les commandes nécéssitant d'être admin)
- Persistance de donnée ? (->Calendrier avec événements par exemple?)

## Utilisation

Pour lancer le bot `npm run dev`, ou `node main.js`.

## Parsing des commandes

Récupération du tableau du config.json:

```json
"prefix": ["!", "?"],
```

Dans le main.js:

```javascript
for (const item of prefix) {
    if (message.content.startsWith(item)) {
        isACommand = true;
        usedPrefix = item;
    }
}
```