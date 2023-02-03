const {
	delay,
	WA_DEFAULT_EPHEMERAL
} = require('@adiwajshing/baileys')

module.exports = {
	name: "ps",
	alias: ["ephemeral","pesansementara"],
	category: "group",
	desc: `untuk mengubah waktu penghapusan pesan di group`,
	use: "<time ephemeral>",
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	async run({ msg, fdz }, { q, args, command}) {
     try {
	if (!q) return msg.reply(`Kirim perintah : ${command} waktu\n\n*List Waktu Pesan Siaran*\n90h = 90hari\n7h = 7hari\n24j = 24jam\n\n*Untuk mematikan ketik :* ${command} off`)
	if (args[0].toLowerCase() === '90h') {
		fdz.sendMessage(msg.chat, {
			disappearingMessagesInChat: 1 * 2160 * 60 * 60
		})
		await delay(500)
		msg.reply("sukses set pesan sementara ke 90h")
	} else if (args[0].toLowerCase() === '7h') {
		fdz.sendMessage(msg.chat, // this is 1 week in seconds -- how long you want messages to appear for
			{
				disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL
			})
		await delay(500)
		msg.reply("sukses set pesan sementara ke 7h")
	} else if (args[0].toLowerCase() === '24j') {
		fdz.sendMessage(msg.chat, {
			disappearingMessagesInChat: 1 * 24 * 60 * 60
		})
		await delay(500)
		msg.reply("sukses set pesan sementara ke 24j")
	} else if (args[0].toLowerCase() === 'off') {
		fdz.sendMessage(msg.chat, {
			disappearingMessagesInChat: false
		})
		await delay(500)
		msg.reply("sukses menonaktifkan pesan sementara")
	}
        } catch (err) {
            await msg.reply('Ada masalah di server, silahkan lapor ke owner bot')
            console.log(err);
        }
	},
};
