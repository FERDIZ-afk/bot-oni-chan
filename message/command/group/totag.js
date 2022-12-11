const {
	delay
} = require('@adiwajshing/baileys')

module.exports = {
	name: "totag",
	alias: ["totag"],
	category: "group",
	isAdmin: true,
	isGroup: true,
	wait: true,
	desc: "Buat ngasih informasi / bikin 1 gc kesel :v",
	use: "<text>",
	async run({ msg, fdz }, { quoted, groupMembers, command }) {
	if (!msg.quoted) return msg.reply(`Reply pesan Dengan Caption ${command}`)
	if (quoted.mtype == 'conversation') {
		fdz.sendMessage(msg.chat, {
			text: quoted.text,
			mentions: groupMembers.map(a => a.id),
			contextInfo: {
				forwardingScore: 5,
				isForwarded: true
			}
		}, {
			quoted: msg
		})
	} else {
		let _msg = JSON.parse(JSON.stringify(quoted.fakeObj.message))
		if (typeof _msg[quoted.mtype].contextInfo !== 'object') _msg[quoted.mtype].contextInfo = {}
		if (typeof _msg[quoted.mtype].contextInfo.mentionedJid !== 'array') _msg[quoted.mtype].contextInfo.mentionedJid = groupMembers.map(a => a.id)
		let _pesan = quoted.fakeObj
		_pesan.message = _msg
		await delay(500)
		fdz.copyNForward(msg.chat, _pesan, true)
	}
	},
};