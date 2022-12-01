module.exports = {
	name: "setppgc",
	alias: ["gantippgroup","setppgroup","setppgc","setppgrup"],
	category: "group",
	desc: "Menganti photo profil group",
	use: "<image file>",
	wait: true,
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, fdz }, { quoted, mime, command }) {
	if (!quoted) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	if (!/image/.test(mime)) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	if (/webp/.test(mime)) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	let media = await fdz.downloadAndSaveMediaMessage(quoted)
	await fdz.updateProfilePicture(msg.chat, media).then(() => msg.reply('Success update profile picture group')).catch(msg.reply)
	},
};