/**
   * Create By FERDIZ -AFK 
   * Contact Me on wa.me/6287877173955
   * Follow https://github.com/FERDIZ-afk
*/

const {
	delay,
	proto,
	jidDecode,
	jidNormalizedUser,
	generateForwardMessageContent,
	generateWAMessageFromContent,
	downloadContentFromMessage,
} = require('@adiwajshing/baileys')

const fs = require("fs")
const PhoneNumber = require('awesome-phonenumber')

const {
	imageToWebp,
	videoToWebp,
	writeExifImg,
	writeExifVid
} = require('../lib/exif')

const {
	getBuffer
} = require('../lib/function.js')


async function generateProfilePicture(mediaUpload) {
const {
  read,
	MIME_JPEG,
	AUTO
} = await Promise.resolve().then(() => require('jimp'))
const jimp = await read(mediaUpload)
const min = jimp.getWidth()
const max = jimp.getHeight()
const cropped = jimp.crop(0, 0, min, max)
return {
		img: await cropped
			.quality(95)
			.scaleToFit(720, 720, AUTO)
			.getBufferAsync(MIME_JPEG)
}}





exports.sendmessages = (fdz,store) => {
  
if (fdz.user && fdz.user.id) fdz.user.jid = jidNormalizedUser(fdz.user.id)
 
fdz.decodeJid = (jid) => {
	if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
		return decode.user && decode.server && decode.user + '@' + decode.server || jid
	} else return jid
}

fdz.reSize = async (image, width, height) => {
  let jimp = require('jimp')
  var oyy = await jimp.read(image);
  var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
  return kiyomasa
}

fdz.sendTextWithMentions = async (jid, text, quoted, options = {}) => fdz.sendMessage(jid, {
	text: text,
	contextInfo: {
		mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
	},
	...options
}, {
	quoted
})

fdz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
	return await fdz.sendMessage(jid, {
		image: buffer,
		caption: caption,
		...options
	}, {
		quoted
	})
}

fdz.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
	return await fdz.sendMessage(jid, {
		video: buffer,
		caption: caption,
		gifPlayback: gif,
		...options
	}, {
		quoted
	})
}

fdz.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
	return await fdz.sendMessage(jid, {
		audio: buffer,
		ptt: ptt,
		...options
	}, {
		quoted
	})
}



fdz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
	let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
	let buffer
	if (options && (options.packname || options.author)) {
		buffer = await writeExifImg(buff, options)
	} else {
		buffer = await imageToWebp(buff)
	}

	await fdz.sendMessage(jid, {
		sticker: {
			url: buffer
		},
		...options
	}, {
		quoted
	})
	return buffer
}

fdz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
	let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
	let buffer
	if (options && (options.packname || options.author)) {
		buffer = await writeExifVid(buff, options)
	} else {
		buffer = await videoToWebp(buff)
	}

	await fdz.sendMessage(jid, {
		sticker: {
			url: buffer
		},
		...options
	}, {
		quoted
	})
	return buffer
}


fdz.ev.on('contacts.update', async (update) => {
	for (let contact of update) {
		let id = fdz.decodeJid(contact.id)
		if (store && store.contacts) store.contacts[id] = {
			id,
			name: contact.notify
		}
	}
})



fdz.updateProfilePicture = async (jid, content) => {
	const {
				img
	} = await generateProfilePicture(content)
			//	console.log(img)
	await delay(2000)
	await fdz.query({
		tag: 'iq',
		attrs: {
			to: jidNormalizedUser(jid),
			type: 'set',
			xmlns: 'w:profile:picture'
		},
		content: [{
			tag: 'picture',
		attrs: {
			type: 'image'
		},
		content: img
		}]
	})
}

fdz.sendGroupV4Invite = async (
		jid,
		participant,
		inviteCode,
		inviteExpiration,
		groupName = "unknown subject",
		jpegThumbnail,
		caption = "Invitation to join my WhatsApp group",
		options = {}
	) => {
		let msg = proto.Message.fromObject({
			groupInviteMessage: proto.GroupInviteMessage.fromObject({
				inviteCode,
				inviteExpiration: inviteExpiration ? parseInt(inviteExpiration) : +new Date(new Date() + 3 * 86400000),
				groupJid: jid,
				groupName: groupName ? groupName : (await fdz.groupMetadata(jid)).subject,
				jpegThumbnail,
				caption,
			}),
		});
		const ms = generateWAMessageFromContent(participant, msg, options);
		await fdz.relayMessage(participant, ms.message, { messageId: ms.key.id });
	};

  
fdz.cMod = (jid, copy, text = '', sender = fdz.user.id, options = {}) => {
	//let copy = message.toJSON()
	let mtype = Object.keys(copy.message)[0]
	let isEphemeral = mtype === 'ephemeralMessage'
	if (isEphemeral) {
		mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
	}
	let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
	let content = msg[mtype]
	if (typeof content === 'string') msg[mtype] = text || content
	else if (content.caption) content.caption = text || content.caption
	else if (content.text) content.text = text || content.text
	if (typeof content !== 'string') msg[mtype] = {
		...content,
		...options
	}
	if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
	else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
	if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
	else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
	copy.key.remoteJid = jid
	copy.key.fromMe = sender === fdz.user.id
	return proto.WebMessageInfo.fromObject(copy)
}
		
fdz.copyNForward = async (jid, message, forceForward = false, options = {}) => {
  let vtype
	if (options.readViewOnce) {
		message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
		vtype = Object.keys(message.message.viewOnceMessage.message)[0]
		delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
		delete message.message.viewOnceMessage.message[vtype].viewOnce
		message.message = {
			...message.message.viewOnceMessage.message
	}}

	let mtype = Object.keys(message.message)[0]
	let content = await generateForwardMessageContent(message, forceForward)
	let ctype = Object.keys(content)[0]
	let context = {}
	if (mtype != "conversation") context = message.message[mtype].contextInfo
	content[ctype].contextInfo = {
				...context,
				...content[ctype].contextInfo
	}
	const waMessage = await generateWAMessageFromContent(jid, content, options ? {
		...content[ctype],
		...options,
		...(options.contextInfo ? {
		contextInfo: {
				...content[ctype].contextInfo,
				...options.contextInfo
				}
		} : {})
	} : {})
	await fdz.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
	return waMessage
}
  
fdz.downloadMediaMessage = async (message) => {
	let mime = (message.msg || message).mimetype || ''
	let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
	const stream = await downloadContentFromMessage(message, messageType)
	let buffer = Buffer.from([])
	for await (const chunk of stream) {
		buffer = Buffer.concat([buffer, chunk])
	}
	return buffer
}

fdz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
	let quoted = message.msg ? message.msg : message
	const FileType = require('file-type')
	let mime = (message.msg || message).mimetype || ''
	let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
	const stream = await downloadContentFromMessage(quoted, messageType)
	let buffer = Buffer.from([])
	for await (const chunk of stream) {
		buffer = Buffer.concat([buffer, chunk])
	}
	let type = await FileType.fromBuffer(buffer)
	trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
			// save to file
	await fs.writeFileSync(trueFileName, buffer)
	return trueFileName
	}
	
fdz.getName = (jid, withoutContact = false) => {
	id = fdz.decodeJid(jid)
	withoutContact = fdz.withoutContact || withoutContact
	let v
	if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
		v = store.contacts[id] || {}
		if (!(v.name || v.subject)) v = fdz.groupMetadata(id) || {}
		resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
	})
	else v = id === '0@s.whatsapp.net' ? {
			id,
			name: 'WhatsApp'
		} : id === fdz.decodeJid(fdz.user.id) ?
		fdz.user :
		(store.contacts[id] || {})
	return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}
	
fdz.sendListContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
		list.push({
			displayName: await fdz.getName(i + '@s.whatsapp.net'),
			vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await fdz.getName(i + '@s.whatsapp.net')}\nFN:${await fdz.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:okeae2410@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/cak_haho\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
		})
	}
	fdz.sendMessage(jid, {
		contacts: {
			displayName: `${list.length} Kontak`,
			contacts: list
		},
		...opts
	}, {
		quoted
	})
}
  
return fdz
}