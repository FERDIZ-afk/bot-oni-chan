const {exec,spawn} = require("child_process")
const fs = require('fs-extra')
const {
	delay
} = require('@adiwajshing/baileys')
const {
	getRandom
} = require("../../../lib/function.js")

module.exports = {
	name: "toimg",
	category: "converter",
	desc: "Convert a sticker to image",
	wait: true,
	async run({ msg, fdz }, { quoted, mime, command, isQuotedSticker }) {
	if (!isQuotedSticker) return msg.reply(`Reply sticker image dengan caption *${command}*`)
	if (!/webp/.test(mime)) return msg.reply(`Reply to a sticker`)
	try {
	hmm = await './tmp/toimg-' + getRandom('')
	let media = await fdz.downloadAndSaveMediaMessage(quoted, hmm)
	let ran = await './tmp/toimgfinish-' +getRandom('.png')
	await delay(500)
	exec(`ffmpeg -i ${media} ${ran}`, (err) => {
		fs.unlinkSync(media)
		if (err) return msg.reply(require('util').format(err))
		let buffer = fs.readFileSync(ran)
		fdz.sendMessage(msg.chat, {
			image: buffer,
			caption: "nih dah jadi"
		}, {
			quoted: msg
		})
	})
		await delay(6000)
		//		fs.unlinkSync(ran)
//fs.unlinkSync(media)
} catch (err) {
				msg.reply(require('util').format(err))
			}

	},
};
