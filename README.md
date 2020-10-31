# Discord SSH Bot
This is a simple bot for using shell commands within Discord.

> This bot does not use an actual SSH connection; it's named as such because it provides similar functionality to SSH, in that you can romotely execute commands on your computer from different devices and locations.

## Setup
_Only required for first run_
1. Install NodeJS if it isn't already
2. Create a Discord bot account (if you don't know how, [this guide][bot-creation-howto] explains the process quite well)
3. Fill in `config.json` with the correct information
4. Open a terminal in this project's root directory
5. Run `npm i` to install dependencies

## Usage
1. Open a terminal in this project's root directory
2. Run `node index.js`
3. Use any shell command in the channel specified in `config.json`

<!-- Link anchors -->

[bot-creation-howto]: https://discordjs.guide/preparations/setting-up-a-bot-application.html 'Setting up a bot application'
