const {
	delay
} = require('@adiwajshing/baileys')
const moment = require("moment-timezone")

module.exports = {
	name: "listgroup",
	alias: ["listgrup","listallgroup","listgc"],
	category: "info",
	desc: "Menampilkan jumlah dan info group\nyang saat ini di ikuti.",
	wait: true,
	async run({ msg, fdz },{}) {
	  try {
	let getGroups = await fdz.groupFetchAllParticipating()
	let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
	let anu = groups.map(v => v.id)
	let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
	for (let i of anu) {
		let metadata = await fdz.groupMetadata(i)
		teks += `⬡ *Nama :* ${metadata.subject}\n⬡ *Owner :* ${metadata.owner !== undefined ? "@"+metadata.owner.split("@")[0] : '-'}\n⬡ *ID :* ${metadata.id}\n⬡ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('Ddddd,D/MM/YYYY HH:mm:ss')}\n⬡ *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
	}

	msg.reply(teks)
	} catch (err) {
		console.log(err)
		msg.reply(require('util').format(err))
	}

	},
};