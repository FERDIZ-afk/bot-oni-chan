const fetch = require('node-fetch')

module.exports = {
	name: "cersex",
	alias: ["randomcersex", "18cersex"],
	category: "nsfw",
	wait: true,
//	disable: true,
	async run({ msg, fdz },{prefix}) {
	try {
		let a = Math.floor(Math.random() * 49)
		let res = await fetch(`https://oni-chan.my.id/api/adults/cersex/view?page=${a}&apikey=istighfar`)
		let json = await res.json()
		let res2 = await fetch(`https://oni-chan.my.id/api/adults/cersex/rawcerpen?link=${json.result[Math.floor(Math.random()*json.result.length)].url}&apikey=istighfar`)
		let json2 = await res2.json()
		json2 = json2.result
		await fdz.sendMessage(msg.chat, { image: { url: json2.thumbnail }, caption: `*${json2.title}*\n${(json2.date.length > 30 || !json2.text) ? `\n${json2.date}` : `_${json2.date}_\n\n${json2.text}`}` }, { quoted: msg })
	} catch (e) {
		console.log(e)
		msg.reply(`Terjadi kesalahan, coba lagi nanti.`)
}
	},
};
