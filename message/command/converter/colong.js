const {
	delay
} = require('@adiwajshing/baileys')
const fs = require("fs")

const { stickerInfo } = require('../../../config/settings')

const {
	getRandom
} = require("../../../lib/function.js")

module.exports = {
	name: "colong",
	alias: [
		"wm",
		"colongstick",
		"wmstik",
		"colongstiker",
		"wmsticker",
		"wmstickergif",
		"wmstikergif",
		"wmgifstiker",
		"wmgifsticker",
		'take', 'editsticker'
	],
	category: "converter",
	desc: "Custom your sticker info pack and author",
	use: "<tag sticker>",
	wait: true,
	async run({ msg, fdz }, { quoted, args, mime, command }) {
	  
	if (!msg.quoted) return msg.reply('Reply pesan nya')
	if (!/webp/.test(mime)) return msg.reply(`Reply to a sticker`)
	try {
	anu = args.join(' ').split('|')
	satu = anu[0] !== '' ? anu[0] : stickerInfo.pack
	dua = typeof anu[1] !== 'undefined' ? anu[1] : stickerInfo.author
	hmm = await './tmp/toimg-' + getRandom('.webp')
	let media = await fdz.downloadAndSaveMediaMessage(quoted, hmm)
	await delay(500)
	fdz.sendSticker(msg.chat, media, {
		quoted: msg,
		author: dua,
		pack: satu
	})
			await delay(3000)
await fs.unlinkSync(media)
} catch (err) {
				msg.reply(require('util').format(err))
			}
	}
};

