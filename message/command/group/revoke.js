const {
	delay
} = require('@adiwajshing/baileys')

module.exports = {
	name: "revoke",
	alias: ["resetlink","resetlinkgc","resetlinkgroup"],
	category: "group",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	wait: true,
//	desc: "Buat ngasih informasi / bikin 1 gc kesel :v",
//	use: "<text>",
	async run({ msg, fdz }, {}) {
	try {
		const code = await fdz.groupRevokeInvite(msg.chat)
		/*
		await fdz.sendMessage(msg.chat, {
			text: `New Group Link: https://chat.whatsapp.com/${code}`
		}, {
			quoted: msg
		})
		*/
	} catch (err) {
		console.log(err)
		msg.reply(require('util').format(err))
	}
	},
};