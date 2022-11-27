module.exports = {
	name: "save",
	alias: ["sf"],
	category: "private",
	desc: "Menyimpan / menambah file",
	query: "Masukkan nama path file,\n example: .sf ./command/other/fitur.js",
	use: "<name file>",
	async run({ msg, conn }, { isOwner, q, map, args }) {
	  if (!q) return msg.reply("Masukkan nama path file,\n example: .sf ./command/other/fitur.js")
	  if (!isOwner) return msg.reply("kamu bukan owner")
		await require("fs").writeFileSync(q, msg.quoted.text);
		await msg.reply(`Saved successfully, and is restarting`);
		process.send("reset");
	},
};