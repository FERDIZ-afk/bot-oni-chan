const {
	delay
} = require('@adiwajshing/baileys')

module.exports = {
	name: "read",
	alias: ["readviewone","readpesan"],
	category: "other",
	desc: "Bot mereply/mengirim ulang pesan yang bersifat\nviewone",
	async run({ msg, fdz },{isviewOnce}) {
	  
	 try {
			if (!isviewOnce) return msg.reply('Reply pesan viewOnce')
			pel = `*User* : @${msg.quoted.sender.split("@")[0]} mengirim pesan viewOnce `
			fdz.sendMessage(msg.chat, { text: pel, mentions: [msg.quoted.sender] }, {quoted: msg })
			await delay(2000)
			msg.quoted.copyNForward(msg.chat, true, { readViewOnce: true,quoted: msg }).catch(_ => msg.reply('Mungkin dah pernah dibuka bot'))
	} catch (err) {
		console.log(err)
		msg.reply(require('util').format(err))
	}
	},
};
