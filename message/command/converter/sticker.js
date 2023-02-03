const {
	delay
} = require('@adiwajshing/baileys')
const fs = require("fs")

const { stickerInfo } = require('../../../config/settings')
const {
	getRandom
} = require("../../../lib/function.js")

module.exports = {
	name: "sticker",
	alias: [
		"s",
		"stick",
		"stik",
		"stiker",
		"stickerwm",
		"stickergif",
		"stikergif",
		"gifstiker",
		"gifsticker",
	],
	category: "converter",
	desc: "Create a sticker from image or video",
	wait: true,
	async run({ msg, fdz }, { quoted, args, mime, command }) {
	  
	if (!quoted) return msg.reply(`Kirim/Reply Video/Image Dengan Caption ${command}`)
	if (/webp/.test(mime)) return msg.reply(`ini kan stiker kak coba,\nKirim Image Dengan Caption ${command}`)
	anu = args.join(' ').split('|')
	satu = anu[0] !== '' ? anu[0] : stickerInfo.pack
	dua = typeof anu[1] !== 'undefined' ? anu[1] : stickerInfo.author

	if (/image/.test(mime)) {

  	hmm = await './tmp/simage-' + getRandom('.png')
  	let media = await fdz.downloadAndSaveMediaMessage(quoted, hmm)
	
		await delay(500)
		
		let encmedia = await fdz.sendImageAsSticker(msg.chat, media, msg, {
			packname: satu,
			author: dua
		})

		await fs.unlinkSync(media)
	} else if (/video/.test(mime)) {

		if ((quoted.msg || quoted).seconds > 11) return msg.reply('Maksimal 10 detik!')
  	hmm = await './tmp/sgif-' + getRandom('.mp4')
  	let media = await fdz.downloadAndSaveMediaMessage(quoted, hmm)
		await delay(500)
		let encmedia = await fdz.sendVideoAsSticker(msg.chat, media, msg, {
			packname: satu,
			author: dua
		})
		
		await fs.unlinkSync(media)
		
		//
	} else {
		return msg.reply(`Kirim Gambar/Video Dengan Caption ${command}\nDurasi Video 1-9 Detik`)
	}
	 
	}
};

