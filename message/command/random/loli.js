module.exports = {
	name: "loli",
	alias: ["randomloli", "lolianime"],
	category: "random",
	isSpam: true,
	async run({ msg, fdz },{prefix}) {
		await msg.reply("wait");
		const buttons = [{ buttonId: prefix+"loli", buttonText: { displayText: "Get Again" }, type: 1 }];
		const buttonMessage = {
			image: { url: (await rzky.image.loli()).url },
			caption: "Pedo🫵",
			buttons: buttons,
			headerType: 4,
		};

		await fdz.sendMessage(msg.chat, buttonMessage);
	},
};
