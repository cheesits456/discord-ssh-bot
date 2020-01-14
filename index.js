const { exec } = require('child_process');
const fs = require("fs");
const Discord = require("discord.js");

let client = new Discord.Client();
client.config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const options = {
	split: {
		char: "\n",
		prepend: "```",
		append: "```"
	}
}

client.on("message", msg => {
	if (msg.channel.id === client.config.channel && msg.author.id === client.config.owner) exec(msg.content, (err, stdout, stderr) => {
		if (err) console.error(err);
		if (stdout) msg.channel.send("```\n" + Discord.escapeMarkdown(stdout, true) + "```", options);
		if (stderr) msg.channel.send("```\n" + Discord.escapeMarkdown(stderr, true) + "```", options);
	});
});

client.on("ready", () => console.log(`Logged in as ${client.user.tag}`));

client.login(client.config.token);
