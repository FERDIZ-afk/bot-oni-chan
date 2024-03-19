/**
* Create By FERDIZ -AFK
* Contact Me on wa.me/6287877173955
* Follow https://github.com/FERDIZ-afk
*/

const {
  delay,
  jidNormalizedUser,
  jidDecode,
  isJidGroup,
  proto,
  areJidsSameUser,
  WA_DEFAULT_EPHEMERAL,
  extractMessageContent,
  generateWAMessageFromContent,
  generateWAMessageContent,
  generateForwardMessageContent,
  downloadContentFromMessage,
  toBuffer,
  getDevice,
  DEFAULT_CONNECTION_CONFIG,
  generateProfilePicture,
  prepareWAMessageMedia
} = require('@adiwajshing/baileys');
const fs = require("fs");

const { getBuffer } = require("../src/lib/function")

const { logger, emitOwnEvents } = DEFAULT_CONNECTION_CONFIG;


exports.sendmessages = (fdz, store) => {

  if (fdz.user && fdz.user.id) fdz.user.jid = jidNormalizedUser(fdz.user.id)

  fdz.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}
      return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
  }

  fdz.getContentType = (message) => {
    if (message) {
      const type = Object.keys(message)
      var restype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(type[0]) && type[0]) || // Sometimes message in the front
      (type.length >= 3 && type[1] !== 'messageContextInfo' && type[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3
      type[type.length - 1] || Object.keys(message)[0] // common case
      return restype
    }
  }

  fdz.parseMention = async (text) => {}
  
  fdz.copyNForward = async (jid, message, forceForward = false, options = {}) => {
		let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			switch (message.mtype) {
      
      case 'viewOnceMessageV2':
			vtype = Object.keys(message.message.viewOnceMessageV2.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessageV2.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessageV2.message
			}
			break;
			
          case 'viewOnceMessageV2Extension':
			vtype = Object.keys(message.message.viewOnceMessageV2Extension.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessageV2Extension.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessageV2Extension.message
			}
			break;
			}
			
	//		console.log(message)
		}

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
		await fdz.relayMessage(jid, waMessage.message, {
			messageId: waMessage.key.id,
      statusJidList : db.data.bot.contacts.map(a => a.id)
		})
		return waMessage
	}
  fdz.sendGroupV4Invite = async (jid, groupJid, inviteCode, inviteExpiration, groupName, jpegThumbnail, caption = "Invitation to join my WhatsApp Group", options = {}) => {
//  console.log(`${jid}, ${groupJid}, ${inviteCode}, ${inviteExpiration}, ${groupName}, ${jpegThumbnail}, ${caption}`);

  let buffer;
  if (Buffer.isBuffer(jpegThumbnail)) {
    buffer = jpegThumbnail;
  } else if (/^data:.*?\/.*?;base64,/i.test(jpegThumbnail)) {
    buffer = Buffer.from(jpegThumbnail.split(',')[1], 'base64');
  } else if (/^https?:\/\//.test(jpegThumbnail)) {
    buffer = await getBuffer(jpegThumbnail); // Pastikan getBuffer telah diimpor dari sumber yang sesuai
  } else if (fs.existsSync(jpegThumbnail)) {
    buffer = fs.readFileSync(jpegThumbnail);
  } else {
    buffer = Buffer.alloc(0);
  }

  const media = await prepareWAMessageMedia({ image: buffer }, { upload: fdz.waUploadToServer });
  
  const message = proto.Message.fromObject({
    groupInviteMessage: {
      groupJid,
      inviteCode,
      inviteExpiration: inviteExpiration ? parseInt(inviteExpiration) : +new Date(new Date() + (3 * 86400000)),
      groupName,
      jpegThumbnail: media.imageMessage?.jpegThumbnail || buffer,
      caption
  }
  })
  
  
  //;
  //console.log(message)

  const m = generateWAMessageFromContent(jid, message, { userJid: fdz.user?.id });
  console.log(m)
  await fdz.relayMessage(jid, m.message, { messageId: m.key.id });

  return m;
};

  fdz.reSize = async (image, width, height) => {
    let jimp = require('jimp')
    var oyy = await jimp.read(image);
    var kiyomasa = await oyy.resize(width,
      height).getBufferAsync(jimp.MIME_JPEG)
    return kiyomasa
  }

  fdz.downloadMediaMessage = async (message,pathFile) => {
    let mime = {
      imageMessage: "image",
      videoMessage: "video",
      stickerMessage: "sticker",
      documentMessage: "document",
      audioMessage: "audio",
      ptvMessage: "video"
    }[message.type]

    if ('thumbnailDirectPath' in message.msg && !('url' in message.msg)) {
      message = {
        directPath: message.msg.thumbnailDirectPath,
        mediaKey: message.msg.mediaKey
      };
      mime = 'thumbnail-link'
    } else {
      message = message.msg
    }
    /*
    var stream = await downloadContentFromMessage(message, mime);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    */
    if (pathFile) {
      const stream = await toBuffer(await downloadContentFromMessage(message, mime))
      await fs.promises.writeFile(pathFile, stream);
      return pathFile
    } else {
      return await toBuffer(await downloadContentFromMessage(message, mime))
    }
  //  return buffer //await toBuffer(await downloadContentFromMessage(message, mime))
  }

  fdz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
    let buffer = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
    return await fdz.sendMessage(jid, {
      image: buffer,
      caption: caption,
      ...options
    }, {
      quoted
    })
  }

  fdz.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
    let buffer = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
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
    let buffer = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
    return await fdz.sendMessage(jid, {
      audio: buffer,
      ptt: ptt,
      ...options
    }, {
      quoted
    })
  }


  fdz.setProfilePicture = async (jid, content,lol) => {
  	const {
  				img
  	} = await generateProfilePicture(content,true)
  			//	console.log(img)
  	await delay(2000)
  	return fdz.query({
  		tag: 'iq',
  		attrs: {
  			to: jidNormalizedUser(jid),
  			type: 'set',
  		  xmlns: "w:profile:picture",//	xmlns: 'profile'
  		},
  		content: [{
  			tag: "picture",
    		attrs: {
    			type: 'image'
    		},
    		content: img
  		}]
  	})
  }


  //  console.log(fdz)

  return fdz
}