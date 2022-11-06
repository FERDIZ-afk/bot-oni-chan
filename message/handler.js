  const {
	default: makeWASocket,
	DisconnectReason,
	AnyMessageContent,
	delay,
	WA_DEFAULT_EPHEMERAL,
	useSingleFileAuthState,
	generateForwardMessageContent,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	generateMessageID,
	downloadContentFromMessage,
	makeInMemoryStore,
	fetchLatestBaileysVersion,
	jidDecode,
	proto
} = require('@adiwajshing/baileys')

var dbs = []
global.dbchatpesan = dbs
var ownerWa = ['6287877173955@s.whatsapp.net']




module.exports = fdz = async (fdz, m, mek, chatUpdate, store) => {
  
  	msg = m
    dbs.push({ id: msg.key.id, msg });
//console.log(m)
		const content = JSON.stringify(mek.message)
		const type = Object.keys(mek.message)[0];
		1
		
    if (m && type == "protocolMessage") fdz.ev.emit("message.delete", m.message.protocolMessage.key);
  	const body = (type === 'conversation' && m.message.conversation) ? m.message.conversation : (type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (type == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
  	
    var budy = (typeof m.text == 'string' ? m.text : '')
    
		const fromMe = msg.key.fromMe
		const from = m.key.remoteJid //|| fromMe

		const args = budy.trim().split(/ +/).slice(1)
		const text = q = args.join(" ")
		const quoted = m.quoted ? m.quoted : m
		const mime = (quoted.msg || quoted).mimetype || ''

		const pushName = msg.pushName
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		
    const sender = m.sender //isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const botNumber = fdz.decodeJid(fdz.user.id) || fdz.user.id.split(':')[0] + '@s.whatsapp.net' || fdz.user.jid
		var ownerbot = [botNumber]
    const isOwner = sender.includes(ownerWa) || sender.includes(ownerWa) || sender.includes(ownerbot)
		
		const groupMetadata = isGroup ? await fdz.groupMetadata(from) : ''
		const groupName = m.isGroup ? await groupMetadata.subject : ''
    const groupDesc = m.isGroup ? await groupMetadata.desc : ''
    const groupOwner = m.isGroup ? await groupMetadata.owner : ''
	  const groupMembers = participants = isGroup ? await groupMetadata.participants : ''
		const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false
    const isNumber = x => typeof x === 'number' && !isNaN(x)
    
    
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')

		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
		const isviewOnce = isQuotedMsg ? content.includes('viewOnceMessage') ? true : false : false
		
		
  	
 ///	console.log(ownerbot)
  	
}