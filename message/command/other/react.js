const {
	delay
} = require('@adiwajshing/baileys')

module.exports = {
	name: "react",
	category: "other",
	desc: "Bot memberikan reaksi pesan berupa emoji.",
	async run({ msg, fdz },{args,quoted}) {
	  
	 try {
		anu = args.join(' ').split('|')
		satu = anu[0] !== '' ? anu[0] : "💖"
		const reactionMessage = {
			react: {
				text: satu,
				key: {
					remoteJid: msg.chat,
					fromMe: false,
					id: quoted.id
				}
			}
		}
		await delay(500)
		const sendMsg = await fdz.sendMessage(msg.chat, reactionMessage)
	} catch (err) {
		console.log(err)
		msg.reply(require('util').format(err))
	}
	},
};
