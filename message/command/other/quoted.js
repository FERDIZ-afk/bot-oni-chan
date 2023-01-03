const {
	delay
} = require('@adiwajshing/baileys')

module.exports = {
	name: "q",
	alias: ["quoted", "quotedreply"],
	category: "other",
	desc: "Bot mengambil/memforward ulang pesan,\nyang berada di reply chat.",
	async run({ msg, fdz },{args,quoted}) {
	if (!msg.quoted) return msg.reply('Reply Pesannya!!')
	try {
		if (!msg.quoted) return msg.reply('Reply Pesannya!!')
		let wokwol = await fdz.serializeM(await msg.getQuotedObj())
		if (!wokwol.quoted) return msg.reply('Pesan Yang anda reply tidak mengandung reply')
		await wokwol.quoted.copyNForward(msg.chat, true)
	} catch (err) {
		console.log(err)
		msg.reply(require('util').format(err))
	}
	},
};
