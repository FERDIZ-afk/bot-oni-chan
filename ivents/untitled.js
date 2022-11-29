const {
	getBuffer
} = require('./lib/function.js')

			       try {
							ppuser = await fdz.profilePictureUrl(m.sender, 'image')
						} catch {
							ppuser = 'https://i.ibb.co/sQTkHLD/ppkosong.png'
						}
	let buttons = [

		{
			buttonId: `${prefix}owner`,
			buttonText: {
				displayText: 'owner'
			},
			type: 1
		}
	]
						let metadata = await fdz.groupMetadata(m.chat) || ''
					let v = fdz.getName(m.sender)
	
	var onicanwel = `https://oni-chan.my.id/api/canvas/welcome_v1?ppurl=${ppuser}&bgurl=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyd4vOi-tJEhN-voL-yVTYsko8dcBvloa2A&usqp=CAU&username=${encodeURI(v)}&totalmember=${encodeURI(metadata.participants.length)}&secondtext=selamat%20datang%20member%20baru`
	
	let buttonMessage = {
		image: await getBuffer(onicanwel),
		caption: "teks",
		footer: '© FERDIZ-afk',
		buttons: buttons,
		headerType: 4,
		mentions: [m.sender],

	}
	await fdz.sendMessage(m.chat, buttonMessage, {
		quoted: m
	})
	
	
	