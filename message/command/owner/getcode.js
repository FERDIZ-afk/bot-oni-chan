module.exports = {
	name: "getcode",
	alias: ["gp"],
	category: "private",
	desc: "Mengirim funtion command berupa text",
	query: "Masukkan nama path file,\n example: .sf ./command/other/fitur.js",
	use: "<name file>",
	async run({ msg, conn }, { isOwner, q, map, args }) {
	  if (!q) return msg.reply("Masukkan nama path file,\n example: .gp ./command/other/fitur.js")
	  if (!isOwner) return msg.reply("kamu bukan owner")
	  
	  if (!require("fs").existsSync(q)) return msg.reply(`'${q}' tidak ditemukan!\n\n`)
    await msg.reply(require("fs").readFileSync(q, 'utf8'))
	  
	},
};