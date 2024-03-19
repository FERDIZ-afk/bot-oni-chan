module.exports = {
	name: "getcode",
	alias: ["gp"],
	desc: "Mengirim funtion berupa text",
	isOwner: true,
//	query: `Masukkan nama path file,\n example: .gp ./command/other/fitur.js`,
	use: "<name file>",
	async run({ m, fdz }, {  q }) {
	  if (!require("fs").existsSync(q)) return m.reply(`'${q}' tidak ditemukan!\n\n`)
    await m.reply(require("fs").readFileSync(q, 'utf8'))
	},
};