let {
		webp2mp4File
	} = require('../../../lib/uploader')
const {
	getRandom
} = require("../../../lib/function.js")
const fs = require('fs-extra')
const {
	delay
} = require('@adiwajshing/baileys')


module.exports = {
	name: "tomp4",
	alias: ["tovid","tovidgif"],
	category: "converter",
	desc: "Convert a sticker gif to video gif",
	wait: true,
	async run({ msg, fdz }, { quoted, mime, command, isQuotedSticker }) {
	  try {
  if ( !msg.quoted) return msg.reply(`Reply sticker image dengan caption *${command}*`)
  if (!isQuotedSticker) return msg.reply(`Reply sticker image dengan caption *${command}*`)
  if (!/webp/.test(mime)) return msg.reply(`Reply sticker image dengan caption *${command}*`)
	if (!msg.quoted.isAnimated) return msg.reply(`Reply sticker gif nya dengan caption *${command}*\nyang kamu reply itu adalah stiker image.`)
	hmm = await './tmp/tomp4-' + getRandom('')
	let media = await fdz.downloadAndSaveMediaMessage(quoted, hmm)
	let webpToMp4 = await webp2mp4File(media)
			fs.unlinkSync(media)
	await fdz.sendMessage(msg.chat, {
		video: {
			url: webpToMp4.result,
			caption: 'Convert Webp To Video'
		}
	}, {
		quoted: msg
	})

} catch (err) {
				msg.reply(require('util').format(err))
			}
	},
};
