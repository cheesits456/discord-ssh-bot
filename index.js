const { exec } = require('child_process');
const fs = require("fs");
const Discord = require("discord.js");

let client = new Discord.Client();
client.config = JSON.parse(fs.readFileSync("config.json", "utf8"));

client.on("message", msg => {
	if (msg.channel.id === client.config.channel && msg.author.id === client.config.owner) exec(msg.content, (err, stdout, stderr) => {
		if (err) return console.error(err);
		if (stdout) msg.channel.send("```" + stdout + "```");
		if (stderr) msg.channel.send("```" + stderr + "```");
	});
});

client.login(client.config.token);
