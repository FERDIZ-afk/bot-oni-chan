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
	if (/webp/.test(mime)) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	let media = await fdz.downloadAndSaveMediaMessage(quoted)
	await fdz.updateProfilePicture(botNumber, media).then(() => msg.reply('Success update profile picture bot')).catch(msg.reply)
	},
};