const {
	delay
} = require('@adiwajshing/baileys')

module.exports = {
	name: "listadmin",
	alias: ["siapaadminnya","admingc","listadmin"],
	category: "group",
	desc: "Menampilkan jumlah dan tag user admin",
	wait: true,
	isGroup: true,
	async run({ msg, fdz },{groupMetadata,groupAdmins,groupMembers}) {
	let numberAdmin = [];
	var teks = `*List admin of group*\n*${groupMetadata.subject}*\n*Total* : ${groupAdmins.length}\n\n`;
	for (let adm of groupMembers) {
		if (adm.admin !== null) {
			numberAdmin.push(adm.id);
			teks += `*[${numberAdmin.length}]* @${adm.id.split("@")[0]}\n`;
		}
	}
	await delay(500)
	await fdz.sendMessage(msg.chat, {
		text: teks,
		mentions: numberAdmin
	}, {
		quoted: msg
	})
	},
};