const {
	delay
} = require('@adiwajshing/baileys')
const fs = require("fs")
const {
	getRandom
} = require("../../../lib/function.js")

module.exports = {
	name: "setppgc",
	alias: ["gantippgroup","setppgroup","setppgc","setppgrup"],
	category: "group",
	desc: "Menganti photo profil group",
	use: "<image file>",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	wait: true,
	async run({ msg, fdz }, { quoted, mime, command }) {
	if (!quoted) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	if (!/image/.test(mime)) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	if (/webp/.test(mime)) return msg.reply(`ini kan stiker kak coba,\nKirim Image Dengan Caption ${command}`)
  	hmm = await './tmp/setppgc-' + getRandom('.png')
  	let media = await fdz.downloadAndSaveMediaMessage(quoted, hmm)
	await fdz.updateProfilePicture(msg.chat, media).then(() => msg.reply('Success update profile picture group')).catch(msg.reply)
			await delay(5000)
					await fs.unlinkSync(media)
	},
};