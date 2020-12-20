const { spawn } = require("child_process");
const fs = require("fs");
const Discord = require("discord.js");

let client = new Discord.Client();
client.config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const msgOpts = {
	code: "js",
	split: { char: "\n" },
};
const fmt = {
	bold: "\x1b[1m",
	green: "\x1b[32m",
	reset: "\x1b[0m",
};

async function exec(input, options) {
	if (options?.terminal)
		await (await client.config.channel.fetchWebhooks()).first().send(input, {
			username: client.config.channel.guild.members.cache.get(client.config.owner.id)?.nickname || client.config.owner.username,
			avatarURL: client.config.owner.displayAvatarURL({ format: "png" }),
		});
	let output = "";
	let args = input.split(" ");
	let command = args.shift();
	let cmd = spawn(command, args, {
		shell: true,
		env: { COLUMNS: 128 },
	});
	cmd.stdout.on("data", data => {
		process.stdout.write(data);
		output += data;
	});
	cmd.stderr.on("data", data => {
		process.stderr.write(data);
		output += data;
	});
	cmd.on("exit", () => {
		process.stdout.write(`\n${fmt.bold}${fmt.green}>${fmt.reset} `);
		if (output) client.config.channel.send(Discord.Util.cleanCodeBlockContent(output, true), msgOpts);
	});
}

client.on("message", msg => {
	if (msg.channel === client.config.channel && msg.author === client.config.owner) {
		console.log(msg.content);
		exec(msg.content);
	}
});

client.on("ready", async () => {
	client.config.channel = client.channels.cache.get(client.config.channel);
	if (!client.config.channel) {
		console.error("Invalid channel ID set for 'channel' in config.json");
		process.exit();
	}

	client.config.owner = await client.users.fetch(client.config.owner);
	if (!client.config.owner) {
		console.error("Invalid user ID set for 'owner' in config.json");
		process.exit();
	}

	if (!client.config.channel.guild.me.permissionsIn(client.config.channel).has("VIEW_CHANNEL")) {
		console.error("Missing required permission 'Read Messages' for channel specified in config.json");
		process.exit();
	}

	if (!client.config.channel.guild.me.permissionsIn(client.config.channel).has("SEND_MESSAGES")) {
		console.error("Missing required permission 'Send Messages' for channel specified in config.json");
		process.exit();
	}

	if (!client.config.channel.guild.me.permissionsIn(client.config.channel).has("MANAGE_WEBHOOKS")) {
		console.error("Missing required permission 'Manage Webhooks' for channel specified in config.json");
		process.exit();
	}

	if (!(await client.config.channel.fetchWebhooks()).size)
		await client.config.channel.createWebhook(client.config.owner.tag, { avatar: client.config.owner.displayAvatarURL({ format: "png" }) });

	process.stdout.write(`Logged in as ${client.user.tag}\n\n${fmt.bold}${fmt.green}>${fmt.reset} `);
});

process.stdin.on("data", data => exec(data.toString(), { terminal: true }));

client.login(client.config.token).catch(() => {
	console.error("Invalid bot token provided in config.json");
	process.exit();
});
