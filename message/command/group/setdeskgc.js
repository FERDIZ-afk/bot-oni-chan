module.exports = {
	name: "setnamegc",
	alias: ["sdgc"],
	category: "group",
	desc: "To change desk group ",
	use: "<text>",
	query: "Masukkan teks",
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	async run({ msg, fdz }, { q }) {
		await fdz.groupUpdateDescription(msg.chat, q).then(async(res) => {
	  await msg.reply("Success change description group")
	}).catch((err) => msg.reply(require('util').format(err)))
	},
};
