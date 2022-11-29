/**
   * Create By FERDIZ -AFK 
   * Contact Me on wa.me/6287877173955
   * Follow https://github.com/FERDIZ-afk
*/

const {
	default: makeWASocket,
	DisconnectReason,
	AnyMessageContent,
	delay,
	useSingleFileAuthState,
	generateForwardMessageContent,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	generateMessageID,
	downloadContentFromMessage,
	makeInMemoryStore,
	fetchLatestBaileysVersion,
	jidDecode,
	getContentType,
	proto
} = require('@adiwajshing/baileys')


exports.modulewa = (conn, m, store) => {

/*
	conn.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}

	conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
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
		await conn.relayMessage(jid, waMessage.message, {
			messageId: waMessage.key.id
		})
		return waMessage
	}

	conn.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		return buffer
	}


	conn.relayWAMessage = async (pesanfull) => {
		if (pesanfull.message.audioMessage) await conn.sendPresenceUpdate('recording', pesanfull.key.remoteJid)
		else await conn.sendPresenceUpdate('composing', pesanfull.key.remoteJid)
		let mekirim = await conn.relayMessage(pesanfull.key.remoteJid, pesanfull.message, { messageId: pesanfull.key.id })
		conn.ev.emit('messages.upsert', { messages: [pesanfull], type: 'append' });
		return mekirim
	}
*/

	if (!m) return m
	let M = proto.WebMessageInfo
	var m = M.fromObject(m)
	if (m.key) {
		m.id = m.key.id
		m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isGroup = m.chat.endsWith('@g.us')
		m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
		if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
	}
	if (m.message) {
		m.mtype = getContentType(m.message)
		m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
//		m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.tex // (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
		
		// t
		let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
		m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
		if (m.quoted) {
			let type = getContentType(quoted)
			m.quoted = m.quoted[type]
			if (['productMessage'].includes(type)) {
				type = getContentType(m.quoted)
				m.quoted = m.quoted[type]
			}
			if (typeof m.quoted === 'string') m.quoted = {
				text: m.quoted
			}
			m.quoted.mtype = type
			m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
			m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
			m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
			m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id)
			m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
			m.getQuotedObj = m.getQuotedMessage = async () => {
				if (!m.quoted.id) return false
				let q = await store.loadMessage(m.chat, m.quoted.id, conn)
				return exports.modulewa(conn, q, store)
			}
			let vM = m.quoted.fakeObj = M.fromObject({
				key: {
					remoteJid: m.quoted.chat,
					fromMe: m.quoted.fromMe,
					id: m.quoted.id
				},
				message: quoted,
				...(m.isGroup ? {
					participant: m.quoted.sender
				} : {})
			})

			/**
			 * 
			 * @returns 
			 */
			m.quoted.delete = () => conn.sendMessage(m.quoted.chat, {
				delete: vM.key
			})

			/**
			 * 
			 * @param {*} jid 
			 * @param {*} forceForward 
			 * @param {*} options 
			 * @returns 
			 */
			m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

			/**
			 *
			 * @returns
			 */
			m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
		}
	}
	if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg)
	m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
	/**
	 * Reply to this message
	 * @param {String|Object} text 
	 * @param {String|false} chatId 
	 * @param {Object} options 
	 */
	m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, {
		...options
	}) : conn.sendMessage(chatId, {
				text: text,
				mentions: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
			}, {
				quoted: m
			})
	/**
	 * Copy this message
	 */
	m.copy = () => exports.modulewa(conn, M.fromObject(M.toObject(m)))

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)
	
//	m.download = () => conn.downloadMediaMessage(m)
	return m
}