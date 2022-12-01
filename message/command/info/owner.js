module.exports = {
	name: "owner",
	alias: ["pemilik"],
	category: "info",
	async run({ msg, fdz }, { q, map, args }) {

let vcard = `BEGIN:VCARD\n` // metadata of the contact card
		+
		`VERSION:3.0\n` +
		'N:;FERDI Z-AFK.;;;' +
		'FN:FERDI Z-AFK.\n' // full name
		+
		`ORG:OWNER FERDI Z-AFK;\n` // the organization of the contact
		+
		`item1.TEL;type=CELL;type=VOICE;waid=6287877173955:+62 878-7717-3955\n` // WhatsApp ID + phone number
		+
		`item1.X-ABLabel:© FERDI Z-AFK\n` +
		`item2.EMAIL;type=INTERNET:ferdizakyla@gmail.com\n` +
		`item2.X-ABLabel:Email-owner\n` +
		`item3.URL:https://github.com/FERDIZ-afk/\n` +
		`item3.X-ABLabel:Github\n` +
		`item4.URL:https://ferdiz-my.id/\n` +
		`item4.X-ABLabel:Rest-api\n` +
		`item5.URL:https://oni-chan.my.id/\n` +
		`item5.X-ABLabel:Profil-github\n` +
		`item6.ADR:;;Region;;;;\n` +
		`item6.X-ABLabel:Negara-Indonesia\n` +
		`item7.ADR:;;city;;;;\n` +
		`item7.X-ABLabel:Kota-PACITAN\n` +
		`item8.X-ABLabel:© WhatsApp Inc.\n`
		// kalau bukan WhatsApp bisnis yang di bawah ini hapus aja ya
		+
		`END:VCARD`

	fdz.sendMessage(msg.chat, {
		contacts: {
			displayName: `FERDI Z-AFK`,
			contacts: [{
				vcard
			}]
		}
	}, {
		quoted: msg
	})

	},
};
