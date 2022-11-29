module.exports = {
	name: "getcode",
	alias: ["gp"],
	category: "private",
	desc: "Mengirim funtion berupa text",
	isOwner: true,
	query: `Masukkan nama path file,\n example: .gp ./command/other/fitur.js`,
	use: "<name file>",
	async run({ msg, conn }, { isOwner, q, map, args }) {
	  if (!require("fs").existsSync(q)) return msg.reply(`'${q}' tidak ditemukan!\n\n`)
    await msg.reply(require("fs").readFileSync(q, 'utf8'))
	  
	},
};