const {
	delay
} = require('@adiwajshing/baileys')
const fs = require("fs")

const { stickerInfo } = require('../../../config/settings')

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
	  
	  
	if (!quoted) return msg.reply(`Balas Video/Image Dengan Caption ${command}`)
	if (/webp/.test(mime)) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	anu = args.join(' ').split('|')
	satu = anu[0] !== '' ? anu[0] : stickerInfo.pack
	dua = typeof anu[1] !== 'undefined' ? anu[1] : stickerInfo.author

	if (/image/.test(mime)) {

		let media = await fdz.downloadAndSaveMediaMessage(quoted) //quoted.download()
		await delay(500)
		let encmedia = await fdz.sendImageAsSticker(msg.chat, media, msg, {
			packname: satu,
			author: dua
		})
		await fs.unlinkSync(encmedia)
	} else if (/video/.test(mime)) {

		if ((quoted.msg || quoted).seconds > 11) return msg.reply('Maksimal 10 detik!')
		let media = await fdz.downloadAndSaveMediaMessage(quoted)
		await delay(500)
		let encmedia = await fdz.sendVideoAsSticker(msg.chat, media, msg, {
			packname: satu,
			author: dua
		})
		await fs.unlinkSync(encmedia)
		
		//
	} else {
		return msg.reply(`Kirim Gambar/Video Dengan Caption ${command}\nDurasi Video 1-9 Detik`)
	}
	 
	}
};

