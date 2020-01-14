# Discord SSH Bot
This is a simple bot for using shell commands within Discord.

This bot does not use an actual SSH connection. It's named like this because it acts in a similar way to SSH, in that you can use a shell on your computer from a remote location.

## Setup
_Only required for first run_
- Install NodeJS if it isn't already
- Fill in `config.json` with the correct information. If you don't know what something in that file means, you shouldn't be using this bot.
- Open a terminal in this directory
- Run `npm i` to install dependencies

## Usage
- Open a terminal in this directory
- Run `node index.js`
- Use any shell command in the channel specified in `config.json`
