/**
   * Create By FERDIZ -AFK 
   * Contact Me on wa.me/6287877173955
   * Follow https://github.com/FERDIZ-afk
*/
const {
	delay
} = require('@adiwajshing/baileys')

module.exports = async (fdz, store, pesan) => {
  			try {
				var m = pesan[0]
				conn = fdz
				if (m.reaction.key.id.startsWith("BAE5") && m.reaction.key.id.length === 16) return;
				let mesg = await store.loadMessage(m.reaction.key.remoteJid, m.key.id, conn);
				let frem = m.reaction.key.remoteJid.endsWith("@g.us") ? m.reaction.key.participant : m.reaction.key.remoteJid;
				let frum = m.key.remoteJid.endsWith("@g.us") ? m.key.participant : m.key.remoteJid;
				await delay(2000)
				
				await fdz.sendMessage(
					m.reaction.key.remoteJid, {
						text: `*【﻿ DETECT REACTION MESSAGE 】*\n\n*_Tagged:_* @${(m.reaction.key.fromMe ? fdz.decodeJid(fdz.user.id) : fdz.decodeJid(frem)).split("@")[0]}\n*_To:_* ${frum ? `@${frum.split("@")[0]}` : `-`}\n*_Emoji:_* ${ m.reaction.text }`,
						withTag: true,
						mentions: [m.reaction.key.participant, m.key.participant]
					}, {
						quoted: mesg
					});
					
			} catch (err) {
				console.log(JSON.stringify("pesan react " + err, undefined, 2))
			}
}