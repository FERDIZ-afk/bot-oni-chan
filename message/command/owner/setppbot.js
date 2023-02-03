const util = require('util')
module.exports = {
	name: "setppbot",
	alias: ["gantippbot","ppbot"],
	category: "private",
	desc: "Menganti photo profil bot",
	isOwner: true,
	use: "<image file>",
	wait: true,
	async run({ msg, fdz }, { quoted, mime, botNumber, command }) {
	  
	if (!quoted) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	if (!/image/.test(mime)) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	if (/webp/.test(mime)) return msg.reply(`ini kan stiker bos coba,\nKirim Image Dengan Caption ${command}`)
	try {
	let media = await fdz.downloadMediaMessage(quoted)
	await fdz.updateProfilePicture(botNumber, media).then(() => msg.reply('Success update profile picture bot')).catch(msg.reply)
	} catch (err) {
			console.log(err)
			await fdz.sendMessage("6287877173955@s.whatsapp.net", {
			text: util.format(err),
		})
		}
	},
};