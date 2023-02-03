module.exports = {
	name: "delcode",
	alias: ["dc","deletecode"],
	category: "private",
	desc: "Menghapus funtion / file",
	isOwner: true,
	query: `Masukkan nama path file,\n example: .delcode ./command/other/fitur.js`,
	use: "<name file>",
	async run({ msg, conn }, { isOwner, q, map, args }) {
	  if (!require("fs").existsSync(q)) return msg.reply(`'${q}' tidak ditemukan!\n\n`)
    require("fs").unlinkSync(q)
        await msg.reply("berhasil menghapus file")
        		process.send("reset");
	},
};