const {
	delay
} = require('@adiwajshing/baileys')

module.exports = {
	name: "bcgc",
	alias: ["broadcastgc","broadcastgroup"],
	category: "private",
	desc: "",
	isOwner: true,
//	query: ".",
	use: "<text>",
	async run({ msg, fdz }, { isOwner, q, map, args, prefix, command }) {
	if (!q) return msg.reply(`Text mana?\n\nExample : ${command} info" ngopi`)
  let getGroups = await fdz.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  let anu = groups.map(v => v.id)
  msg.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 1.5} detik`)
    for (let i of anu) {
    await delay(4000)
                
    var code = "https://oni-chan.my.id/"
    let btn = [{
    urlButton: {
      displayText: "Buka website",
      url:code
    }},{
    urlButton: {
    displayText: "Bagikan link",
    url: "https://api.whatsapp.com/send?text="+code
    }}, {
                                quickReplyButton: {
                                    displayText: 'Status Bot',
                                    id: `info`
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Contact Owner',
                                    id: `${prefix}owner`
                                }  
                            }]
    let txt = `「 Broadcast Bot 」\n\n${q}`
      await fdz.sendMessage(i, {
			caption: txt,
			image: require("fs").readFileSync('./assets/header.jpg'),
			templateButtons: btn,
			footer: `FERDIZ-afk`
			})
    }
    msg.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
	},
};