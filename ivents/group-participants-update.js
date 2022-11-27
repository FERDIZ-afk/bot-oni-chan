/**
   * Create By FERDIZ -AFK 
   * Contact Me on wa.me/6287877173955
   * Follow https://github.com/FERDIZ-afk
*/
const {
	delay
} = require('@adiwajshing/baileys')

module.exports = async (send, code) => {
	console.log(code)
	if (!code.participants.includes(send.user.jid)) {
		///       if (code.participants.length > 2) return
		try {

			let participants = code.participants
			for (let num of participants) {
				// Get Profile Picture User

				if (code.action == 'add') {
					let metadata = await send.groupMetadata(code.id) || ''
					send.sendMessage(code.id, {
						mentions: [num],
						text: `Halo @${num.split("@")[0]} Selamat Datang di Grup *${metadata.subject}*`
					})
				} else if (code.action == 'remove') {
					if (num === send.user.jid) return
					send.sendMessage(code.id, {
						mentions: [num],
						text: `Sayonara @${num.split("@")[0]}`
					})
				} else if (code.action == 'promote') {
					let metadata = await send.groupMetadata(code.id) || ''
					send.sendMessage(code.id, {
						mentions: [num],
						text: `@${num.split('@')[0]} Promote From ${metadata.subject}`
					})
				} else if (code.action == 'demote') {
					let metadata = await send.groupMetadata(code.id) || ''
					send.sendMessage(code.id, {
						mentions: [num],
						text: `@${num.split('@')[0]} Demote From ${metadata.subject}`
					})
				}

			}
		} catch (err) {
			console.log(err)
		}
	} else {
		// anti error kalau bot keluar gc
	}

}