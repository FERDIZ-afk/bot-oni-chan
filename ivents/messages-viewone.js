/**
   * Create By FERDIZ -AFK 
   * Contact Me on wa.me/6287877173955
   * Follow https://github.com/FERDIZ-afk
*/
const {
	delay
} = require('@adiwajshing/baileys')

module.exports = async (fdz,m) => {
  			try {
		await fdz.sendMessage(
			m.remoteJid,
			{ text: `@${m.participant.split("@")[0]} Terdeteksi Mengirim view once...`, withTag: true },
			{ quoted: m.message }
		);
		await fdz.sendMessage(m.remoteJid, { forward: m.message }, { quoted: m.message });
					
			} catch (err) {
				console.log(JSON.stringify("pesan react " + err, undefined, 2))
			}
}