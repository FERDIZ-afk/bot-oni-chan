module.exports = {
	name: "setnamegc",
	alias: ["sngc"],
	category: "group",
	desc: "To change name group ",
	use: "<text>",
	query: "Masukkan teks",
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	async run({ msg, fdz }, { q }) {
		await fdz.groupUpdateSubject(msg.chat, q).then(async(res) => {
	  await msg.reply("Success change name group")
	}).catch((err) => msg.reply(require('util').format(err)))
	},
};
