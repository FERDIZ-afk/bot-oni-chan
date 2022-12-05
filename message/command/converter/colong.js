const {
	delay
} = require('@adiwajshing/baileys')
const fs = require("fs")

const { stickerInfo } = require('../../../config/settings')

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
	],
	category: "converter",
	desc: "Custom your sticker info pack and author",
	use: "<tag sticker>",
	isQuoted: true,
	wait: true,
	async run({ msg, fdz }, { quoted, args, mime, command }) {
	  
	if (!quoted) return msg.reply('Reply pesan nya')
	if (!/webp/.test(mime)) return msg.reply(`Reply to a sticker`)
	try {
	anu = args.join(' ').split('|')
	satu = anu[0] !== '' ? anu[0] : stickerInfo.pack
	dua = typeof anu[1] !== 'undefined' ? anu[1] : stickerInfo.author
	let media = await fdz.downloadAndSaveMediaMessage(quoted)
	await delay(500)
	fdz.sendSticker(msg.chat, media, {
		quoted: msg,
		author: dua,
		pack: satu
	})
} catch (err) {
				msg.reply(require('util').format(err))
			}
	}
};

