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

const {
	modulewa,
} = require('../lib/simpel')


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

fdz.sendSticker = async (jid, sticker, op = {}) => {
	if (!fs.existsSync(sticker) && !Buffer.isBuffer(sticker) && !/^https?:\/\//.test(sticker)) throw new ReferenceError('Sticker not found')
	const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
	var filewebp = Date.now()+jid.split('@')[0]+'.webp'
	var stikker = new Sticker(sticker, {
    	pack: op.pack?op.pack:'Stiker gratis',
    	author: op.author?op.author:'hehe',
    	type: 'full',
    	categories: ['😭', '🎉'],
    	id: jid.split('@')[0],
    	quality: 50,
    	//background: '#000000'
	})
	await fdz.sendPresenceUpdate('composing', jid)
	return await fdz.sendMessage(jid, await stikker.toMessage(), op)
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


fdz.serializeM = (m) => modulewa(fdz, m, store)

// code detek group nih
function _0x1ea6(_0x2212da,_0x298247){const _0x2c0293=_0x2c02();return _0x1ea6=function(_0x1ea601,_0x4d84ce){_0x1ea601=_0x1ea601-0x158;let _0x107903=_0x2c0293[_0x1ea601];return _0x107903;},_0x1ea6(_0x2212da,_0x298247);}function _0x2c02(){const _0x3e877d=['messages','3521340tTprZH','key','image','562424tiKRqQ','\x0atelah\x20menjadikan\x0a@','profilePictureUrl','https://i.ibb.co/sQTkHLD/ppkosong.png','3tMXdKc','split','\x20sebagai\x20admin','messageStubParameters','\x0akeluar','\x0atelah\x20bergabung\x20menggunakan\x20tautan\x20undangan\x20grup\x20ini','35nBjzRo','1106659bofAcb','remoteJid','fromMe','\x0atelah\x20mengubah\x20subjek\x20menjadi','\x0atelah\x20bergabung\x20menggunakan\x20undangan\x20group','3694110FIFhDT','1415674HkyBoB','\x0atelah\x20menambahkan\x0a@','participant','3518490KGPjCQ','sendMessage','4809636YssmOe','includes','user','jid','messageStubType','\x0atelah\x20memberhentikan\x0a@'];_0x2c02=function(){return _0x3e877d;};return _0x2c02();}(function(_0x40f7a4,_0x43be56){const _0x4e7d48=_0x1ea6,_0x4d4c2b=_0x40f7a4();while(!![]){try{const _0x8809cd=-parseInt(_0x4e7d48(0x15c))/0x1+-parseInt(_0x4e7d48(0x162))/0x2*(-parseInt(_0x4e7d48(0x175))/0x3)+parseInt(_0x4e7d48(0x16e))/0x4+-parseInt(_0x4e7d48(0x165))/0x5+parseInt(_0x4e7d48(0x161))/0x6+parseInt(_0x4e7d48(0x15b))/0x7*(-parseInt(_0x4e7d48(0x171))/0x8)+parseInt(_0x4e7d48(0x167))/0x9;if(_0x8809cd===_0x43be56)break;else _0x4d4c2b['push'](_0x4d4c2b['shift']());}catch(_0x185f71){_0x4d4c2b['push'](_0x4d4c2b['shift']());}}}(_0x2c02,0x8cb85),fdz['ev']['on']('messages.upsert',async _0x453e9a=>{const _0x381215=_0x1ea6;try{mek=_0x453e9a[_0x381215(0x16d)][0x0];const _0x1c053a=mek[_0x381215(0x16f)][_0x381215(0x15d)],_0x41db3d=mek[_0x381215(0x16f)]['fromMe']?fdz[_0x381215(0x169)][_0x381215(0x16a)]:mek['participant']?mek[_0x381215(0x164)]:mek[_0x381215(0x16f)]['participant']?mek[_0x381215(0x16f)][_0x381215(0x164)]:_0x1c053a;switch(mek[_0x381215(0x16b)]){case 0x15:fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+_0x41db3d['split']('@')[0x0]+_0x381215(0x15f),'mentions':[_0x41db3d]});break;case 0x18:fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+_0x41db3d['split']('@')[0x0]+'\x0atelah\x20mengubah\x20description','mentions':[_0x41db3d]});break;case 0x16:try{ppuser=await fdz[_0x381215(0x173)](_0x1c053a,_0x381215(0x170));}catch{ppuser=_0x381215(0x174);}fdz[_0x381215(0x166)](_0x1c053a,{'image':await getBuffer(ppuser),'contextInfo':{'mentionedJid':[_0x41db3d]},'caption':'@'+_0x41db3d['split']('@')[0x0]+'\x0atelah\x20mengubah\x20Foto\x20profil\x20group\x20menjadi..'});break;case 0x1b:if(!mek[_0x381215(0x16f)]['participant']&&!mek[_0x381215(0x164)])return fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+mek[_0x381215(0x158)][0x0][_0x381215(0x176)]('@')[0x0]+_0x381215(0x15a),'mentions':mek[_0x381215(0x158)]});fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+_0x41db3d[_0x381215(0x176)]('@')[0x0]+_0x381215(0x163)+mek[_0x381215(0x158)][0x0]['split']('@')[0x0],'mentions':[_0x41db3d,...mek[_0x381215(0x158)]]});break;case 0x1c:!mek[_0x381215(0x158)][0x0][_0x381215(0x168)](fdz[_0x381215(0x169)]['jid'])&&fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+_0x41db3d[_0x381215(0x176)]('@')[0x0]+'\x0atelah\x20mengeluarkan\x0a@'+mek['messageStubParameters'][0x0][_0x381215(0x176)]('@')[0x0],'mentions':[_0x41db3d,...mek['messageStubParameters']]});break;case 0x1d:fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+_0x41db3d[_0x381215(0x176)]('@')[0x0]+_0x381215(0x172)+mek[_0x381215(0x158)][0x0][_0x381215(0x176)]('@')[0x0]+_0x381215(0x177),'mentions':[_0x41db3d,...mek[_0x381215(0x158)]]});break;case 0x1e:fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+_0x41db3d['split']('@')[0x0]+_0x381215(0x16c)+mek[_0x381215(0x158)][0x0][_0x381215(0x176)]('@')[0x0]+'\x20sebagai\x20admin','mentions':[_0x41db3d,...mek[_0x381215(0x158)]]});break;case 0x20:if(mek['key'][_0x381215(0x15e)])return;fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+_0x41db3d['split']('@')[0x0]+_0x381215(0x159),'mentions':[_0x41db3d]});break;case 0x47:fdz[_0x381215(0x166)](_0x1c053a,{'text':'@'+mek[_0x381215(0x158)][0x0][_0x381215(0x176)]('@')[0x0]+_0x381215(0x160),'mentions':mek[_0x381215(0x158)]});break;}}catch(_0x5b3d59){}}));

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
		let quoted = message.msg ? message.msg : message
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
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
		//	trueFileName = attachExtension ? (`./tmp/`+filename + '.' + type.ext) : `./tmp/`+filename
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
			vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await fdz.getName(i + '@s.whatsapp.net')}\nFN:${await fdz.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
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