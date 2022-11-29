/**
   * Create By FERDIZ -AFK 
   * Contact Me on wa.me/6287877173955
   * Follow https://github.com/FERDIZ-afk
*/
const {
	delay
} = require('@adiwajshing/baileys')
const {
	getBuffer
} = require('../lib/function.js')
const { ownerWa } = require('../config/settings')


module.exports = async (send, code) => {
	console.log(code)
	if (!code.participants.includes(send.user.jid)) {
		///       if (code.participants.length > 2) return
		try {
			let participants = code.participants
      for (let num of participants) {
			       try {
							ppuser = await fdz.profilePictureUrl(num, 'image')
						} catch {
							ppuser = 'https://i.ibb.co/sQTkHLD/ppkosong.png'
						}
				// Get Profile Picture User

		if (code.action == 'add') {
			let metadata = await send.groupMetadata(code.id) || ''
			let v = send.getName(num)
			let buttons = [{
			buttonId: `makasihya`,
			buttonText: {
				displayText: 'makasihya'
			},
			type: 1
  		}]
    	var onicanwel = `https://oni-chan.my.id/api/canvas/welcome_v1?ppurl=${ppuser}&bgurl=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyd4vOi-tJEhN-voL-yVTYsko8dcBvloa2A&usqp=CAU&username=${encodeURI(v)}&totalmember=${encodeURI(metadata.participants.length)}&secondtext=selamat%20datang%20member%20baru`
	
    	let buttonMessage = {
  		image: await getBuffer(onicanwel),
	  	caption: `Halo @${num.split("@")[0]} Selamat Datang di Grup *${metadata.subject}*`,
		  footer: '© FERDIZ-afk',
	  	buttons: buttons,
	  	headerType: 4,
	  	mentions: [num],
    	}
    	await send.sendMessage(code.id, buttonMessage, {quoted: ""})
		} else if (code.action == 'remove') {
		  //https://oni-chan.my.id/api/canvas/leave_v1?ppurl=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLsSI7eajxhLwkdMqO3p1WzwCxN-8P2ctSoA&usqp=CAU&bgurl=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyd4vOi-tJEhN-voL-yVTYsko8dcBvloa2A&usqp=CAU&username=FERDIZ-AFK&totalmember=45&secondtext=yah%20ada%20member%20yang%20keluar%20
			if (num === send.user.jid) return
			send.sendMessage(code.id, {
						mentions: [num],
						text: `Sayonara @${num.split("@")[0]}`
			})
		} else if (code.action == 'promote') {
					let metadata = await send.groupMetadata(code.id) || ''
					let v = send.getName(num)
					let buttons = [{
      			buttonId: `makasihya`,
      			buttonText: {
      				displayText: 'makasihya'
      			},
      			type: 1
        		}]
          	var onicanprom = `https://oni-chan.my.id/api/canvas/promote_v1?ppurl=${ppuser}&bgurl=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyd4vOi-tJEhN-voL-yVTYsko8dcBvloa2A&usqp=CAU&username=${encodeURI(v)}&totalmember=${encodeURI(metadata.participants.length)}&secondtext=selamat%20kak%20atas%20kenaikan%20jabatan%20nya%20!`
          	let buttonMessage = {
        		image: await getBuffer(onicanprom),
      	  	caption: `@${num.split('@')[0]} Promote From ${metadata.subject}`,
      		  footer: '© FERDIZ-afk',
      	  	buttons: buttons,
      	  	headerType: 4,
      	  	mentions: [num],
          	}
          	await send.sendMessage(code.id, buttonMessage, {quoted: ""})
		} else if (code.action == 'demote') {
					let metadata = await send.groupMetadata(code.id) || ''
					let v = send.getName(num)
					let buttons = [{
      			buttonId: ``,
      			buttonText: {
      				displayText: '😣😣😣😢'
      			},
      			type: 1
        		}]
          	var onicandem = `https://oni-chan.my.id/api/canvas/demote_v1?ppurl=${ppuser}&bgurl=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyd4vOi-tJEhN-voL-yVTYsko8dcBvloa2A&usqp=CAU&username=${encodeURI(v)}&totalmember=${encodeURI(metadata.participants.length)}&secondtext=kamu%20telah%20menerima%20penurunan%20jabatan!`
          	let buttonMessage = {
        		image: await getBuffer(onicandem),
      	  	caption: `@${num.split('@')[0]} Demote From ${metadata.subject}`,
      		  footer: '© FERDIZ-afk',
      	  	buttons: buttons,
      	  	headerType: 4,
      	  	mentions: [num],
          	}
          	await send.sendMessage(code.id, buttonMessage, {quoted: ""})
		}

			}
		} catch (err) {
			console.log(err)
			await fdz.sendMessage(ownerWa[0], {
			text: util.format(err),
		})
		}
	} else {
		// anti error kalau bot keluar gc
	}

}