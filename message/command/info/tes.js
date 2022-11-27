

module.exports = {
	name: "tes",
	alias: ["tesbot", "testing"],
	category: "info",
	desc: "Bot menjawab tes",
	isSpam: true,
	async run({ msg }) {
		await msg.reply(`work nih`);
	},
};
