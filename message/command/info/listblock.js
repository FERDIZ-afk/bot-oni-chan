const {
	delay
} = require('@adiwajshing/baileys')

module.exports = {
	name: "listblock",
	alias: ["siapa aja yang diblock","lihat block",""],
	category: "info",
	desc: "Menampilkan jumlah kontak dan tag user yang di block",
	wait: true,
	async run({ msg, fdz },{}) {
	 try {
	var lisblocked = await fdz.fetchBlocklist()
	tekses = '*This is list of blocked number* :\n'
	for (let block of lisblocked) {
		tekses += `*~>* @${block.split('@')[0]}\n`
	}
	tekses += `*Total* : ${lisblocked.length}`
	//	console.log(tekses)
	await delay(500)
	await fdz.sendMessage(msg.chat, {
		text: tekses,
		mentions: lisblocked
	}, {
		quoted: msg
	})
	 } catch (err) {
		console.log(err)
		msg.reply(require('util').format(err))
	}
	},
};