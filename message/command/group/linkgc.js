module.exports = {
	name: "linkgc",
	alias: ['linkgroup', 'linkgc', 'linkgrup'],
	category: "group",
	desc: `Untuk mengambil link grup`,
	isGroup: true,
	isBotAdmin: true,
	async run({ msg, fdz }, { q, args, command}) {
        try {
            const code = await fdz.groupInviteCode(msg.chat);
        //    console.log(code);
            await msg.reply(`Link Group : https://chat.whatsapp.com/${code}`);
        } catch (err) {
            await msg.reply('Ada masalah di server, silahkan lapor ke owner bot')
            console.log(err);
        }
	},
};
