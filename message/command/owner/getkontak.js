module.exports = {
	name: "getkontak",
	alias: ["gp"],
//	desc: "Mengirim funtion berupa text",
	isOwner: true,
//	query: `Masukkan nama path file,\n example: .gp ./command/other/fitur.js`,
//	use: "<name file>",
	async run({ m, fdz }, {  q }) {
    await m.reply(JSON.stringify([
...m.quoted.message.contactsArrayMessage.contacts.map(a => { 
let v = a.vcard.split("type=Ponsel:+")[1]?.split("\n")[0].replace(/[+ -]/g, "") || a.vcard.split("waid=")[1]?.split(":")[0] || a.vcard.split("type=Rumah:+")[1]?.split("\n")[0].replace(/[+ -]/g, "") || a.vcard.split("TEL:+")[1]?.split("\n")[0].replace(/[+ -]/g, "")
if(!v) return;
return v + "@s.whatsapp.net";
}).filter(a => a)
], null, 2))
	},
};
