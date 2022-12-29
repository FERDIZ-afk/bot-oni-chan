module.exports = {
	name: "group",
	alias: ["group open","group close"],
	category: "group",
	desc: `untuk membuka atau menutup grup`,
	use: "<open atau close>",
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	async run({ msg, fdz }, { q, args, command}) {
     try {
            if (args[0] === 'open') {
                await fdz.groupSettingUpdate(msg.chat, "not_announcement")
                await msg.reply(`Perintah diterima, berhasil buka Group`)
            } else if (args[0] === 'close') {
                await fdz.groupSettingUpdate(msg.chat, "announcement")
                await msg.reply(`Perintah diterima, berhasil tutup Group`)
            } else {
                await msg.reply(`Format salah, Silahkan ketik ${command} open/close`)
            }
        } catch (err) {
            await msg.reply('Ada masalah di server, silahkan lapor ke owner bot')
            console.log(err);
        }
	},
};
