/**
* Create By FERDIZ -AFK
* Contact Me on wa.me/6287877173955
* Follow https://github.com/FERDIZ-afk
*/

const {
  jidNormalizedUser,
  proto,
  areJidsSameUser,
  extractMessageContent,
  generateWAMessageFromContent,
  normalizeMessageContent,
  assertMediaContent,
  downloadContentFromMessage,
  toBuffer,
  getDevice,
  prepareWAMessageMedia
} = require('@adiwajshing/baileys');


const escapeRegExp = async(string) => {
      return string.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&')
   }


exports.modulewa = async(fdz, msg, store) => {
  const m = {}
  if (!msg.message) return // ignore those that don't contain messages
  if (msg.key && msg.key.remoteJid == "status@broadcast") return // Ignore messages from status

  m.message = msg.message
 // m.message = extractMessageContent(msg.message)

  if (msg.key) {
    m.key = msg.key
    m.from = m.chat = fdz.decodeJid(m.key.remoteJid)
    m.fromMe = m.key.fromMe
    m.id = m.key.id
    m.device = getDevice(m.id)
    m.isBaileys = m.id.startsWith("BAE5")
    m.isGroup = m.from.endsWith("@g.us")
    m.participant = !m.isGroup ? false: m.key.participant
    m.sender = fdz.decodeJid(m.fromMe && fdz.user.id || m.participant || m.key.participant || m.from || '') //m.fromMe ? fdz.user.id: m.isGroup ? m.participant: m.from //fdz.decodeJid(m.fromMe ? fdz.user.id: m.isGroup ? m.participant: m.from)
  }

  m.pushName = msg.pushName
  m.isOwner = m.sender.includes([config.options.owner[0]]) || m.sender.includes([fdz.user.jid])
  if (m.isGroup) {
    m.metadata = await fdz.groupMetadata(m.from)
    
    m.admins = (m.metadata.participants.reduce((memberAdmin, memberNow) => (memberNow.admin ? memberAdmin.push({
      id: memberNow.id, admin: memberNow.admin
    }): [...memberAdmin]) && memberAdmin, []))
    m.isAdmin = !!m.admins.find((member) => member.id === m.sender)
    m.isBotAdmin = !!m.admins.find((member) => member.id === fdz.user.jid)
    
  }

  if (m.message) {
    m.mtype = fdz.getContentType(m.message) || Object.keys(m.message)[0]
    m.type = fdz.getContentType(extractMessageContent(m.message)) || Object.keys(extractMessageContent(m.message))[0]
    m.msg = extractMessageContent(extractMessageContent(m.message)[m.type]) || extractMessageContent(m.message)[m.type] // || m.message[m.type]
    m.mentions = m.msg?.contextInfo?.mentionedJid || []
    m.body = m.msg?.text || m.msg?.conversation || m.msg?.editedMessage?.extendedTextMessage?.text || m.msg?.caption || m.msg?.message?.imageMessage?.caption || m.msg?.message?.videoMessage?.caption || m.message?.conversation || m.msg?.selectedButtonId || m.msg?.singleSelectReply?.selectedRowId || m.msg?.selectedId || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || m.msg?.name || ""
    m.prefix = "." //config.options.prefix.test(m.body) ? m.body.match(config.options.prefix)[0]: "#"
    m.command = m.body && m.body.trim().split(/ +/)[0]//m.body.replace(m.prefix, '').trim().split(/ +/).shift()
    m.arg = m.body.trim().split(/ +/).filter(a => a) || []
    m.args = m.body.trim().replace(new RegExp("^" + escapeRegExp(m.prefix), 'i'), '').replace(m.command, '').split(/ +/).filter(a => a) || []
    m.text = m.args.join(" ")
    m.expiration = m.msg?.contextInfo?.expiration || 0
    m.timestamp = (typeof msg.messageTimestamp === "number" ? msg.messageTimestamp: msg.messageTimestamp.low ? msg.messageTimestamp.low: msg.messageTimestamp.high) || m.msg.timestampMs * 1000
    m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath
    if (m.isMedia) {
      m.mime = m.msg?.mimetype
      m.size = m.msg?.fileLength
      m.height = m.msg?.height || ""
      m.width = m.msg?.width || ""
      if (/webp/i.test(m.mime)) {
        m.isAnimated = m.msg?.isAnimated
      }
    }
    
    m.download = (filepath) => {
      m.message = extractMessageContent(m.message)
      if (filepath) return fdz.downloadMediaMessage(m, filepath)
      else return fdz.downloadMediaMessage(m)
    }
    
    m.reply = (tex, options = {}) => {
      return fdz.sendMessage(m.chat, {
				text: require("util").format(tex),
				mentions: options ?
          options.withTag ?
            [...tex.matchAll(/@([0-9]{5,16}|0)/g)].map(
              (v) => v[1] + "@s.whatsapp.net"
            ) :
            [] :
          [],
        ...options,
			}, {
				quoted: m
			})
    }
    
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => fdz.copyNForward(jid, m, forceForward, options)
    
  }
  
  // quoted line
  m.isQuoted = false
  if (m.msg?.contextInfo?.quotedMessage) {
    m.isQuoted = true
    m.quoted = {}
    m.quoted.message = m.msg?.contextInfo?.quotedMessage
  
    if (m.quoted.message) {


      m.quoted.mtype = fdz.getContentType(m.quoted.message) || Object.keys(m.quoted.message)[0]
      m.quoted.type = fdz.getContentType(extractMessageContent(m.msg?.contextInfo?.quotedMessage)) || Object.keys(extractMessageContent(m.msg?.contextInfo?.quotedMessage))[0]
      m.quoted.msg = normalizeMessageContent(extractMessageContent(extractMessageContent(m.msg?.contextInfo?.quotedMessage)[m.quoted.type])).message?.audioMessage || extractMessageContent(m.msg?.contextInfo?.quotedMessage)[m.quoted.type]
      m.quoted.key = {
        remoteJid: m.msg?.contextInfo?.remoteJid || m.from,
        participant: m.msg?.contextInfo?.remoteJid?.endsWith("g.us") ? fdz.decodeJid(m.msg?.contextInfo?.participant): false,
        fromMe: areJidsSameUser(fdz.decodeJid(m.msg?.contextInfo?.participant), fdz.decodeJid(fdz?.user?.id)),
        id: m.msg?.contextInfo?.stanzaId
      }
      m.quoted.from = m.quoted.key.remoteJid
      m.quoted.fromMe = m.quoted.key.fromMe
      m.quoted.id = m.msg?.contextInfo?.stanzaId
      m.quoted.device = getDevice(m.quoted.id)
      m.quoted.isBaileys = m.quoted.id.startsWith("BAE5")
      m.quoted.isGroup = m.quoted.from.endsWith("@g.us")
      m.quoted.participant = m.quoted.key.participant
      m.quoted.sender = fdz.decodeJid(m.msg?.contextInfo?.participant)

      m.quoted.isOwner = m.quoted.sender.includes(["6287752825741@s.whatsapp.net"]) || m.quoted.sender.includes([fdz.user.jid])

      if (m.quoted.isGroup) {
        
        m.quoted.metadata = await fdz.groupMetadata(m.quoted.from)
        m.quoted.admins = (m.quoted.metadata.participants.reduce((memberAdmin, memberNow) => (memberNow.admin ? memberAdmin.push({
          id: memberNow.id, admin: memberNow.admin
        }): [...memberAdmin]) && memberAdmin, []))
        m.quoted.isAdmin = !!m.quoted.admins.find((member) => member.id === m.quoted.sender)
        m.quoted.isBotAdmin = !!m.quoted.admins.find((member) => member.id === fdz.user.jid)
        
      }

      m.quoted.mentions = m.quoted.msg?.contextInfo?.mentionedJid || []
      m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ""
      m.quoted.prefix = '.'//config.options.prefix.test(m.quoted.body) ? m.quoted.body.match(config.options.prefix)[0]: "#"
      m.quoted.command = m.quoted.body && m.quoted.body.replace(m.quoted.prefix, '').trim().split(/ +/).shift()
      m.quoted.arg = m.quoted.body.trim().split(/ +/).filter(a => a) || []
      m.quoted.args = m.quoted.body.trim().replace(new RegExp("^" + escapeRegExp(m.quoted.prefix), 'i'), '').replace(m.quoted.command, '').split(/ +/).filter(a => a) || []
      m.quoted.text = m.quoted.args.join(" ")
      m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath
      if (m.quoted.isMedia) {
        m.quoted.mime = m.quoted.msg?.mimetype
        m.quoted.size = m.quoted.msg?.fileLength
        m.quoted.height = m.quoted.msg?.height || ''
        m.quoted.width = m.quoted.msg?.width || ''
        if (/webp/i.test(m.quoted.mime)) {
          m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false
        }
      }
      
      m.quoted.download = (filepath) => {
        m.quoted.message = extractMessageContent(m.msg?.contextInfo?.quotedMessage)
        if (filepath) return fdz.downloadMediaMessage(m.quoted, filepath)
        else return fdz.downloadMediaMessage(m.quoted)
      }
      
    }
  m.getQuotedObj = m.getQuotedMessage = async () => {
      if (!m.quoted.id) return false;
      let q = await store.loadMessage(m.from, m.quoted.id, fdz);
      if (!q) return false;
      return exports.modulewa(fdz, q, store);
  }
	m.quoted.copyNForward = (jid = m.quoted.from , forceForward = false, options = {}) => {
	  fdz.copyNForward(jid, m.quoted, forceForward, options)
	}
  }
//    console.log(m)
  
  
  const contentQ = m.quoted ? JSON.stringify(m.quoted) : []
  m.attribute = {
    isBot: (m.key.id.startsWith("BAE5") && m.key.id.length == 16) || (m.key.id.startsWith("3EB0") && m.key.id.length == 20) ? true : false,
    isVideo: m.mtype === "videoMessage",
    isImage: m.mtype === "imageMessage",
    isLocation: m.mtype === "locationMessage",
    isMedia: m.mtype === "imageMessage" || m.mtype === "videoMessage",
    isQAudio: m.mtype === "extendedTextMessage" && contentQ.includes("audioMessage"),
    isQVideo: m.mtype === "extendedTextMessage" && contentQ.includes("videoMessage"),
    isQImage: m.mtype === "extendedTextMessage" && contentQ.includes("imageMessage"),
    isQDocument: m.mtype === "extendedTextMessage" && contentQ.includes("documentMessage"),
    isQSticker: m.mtype === "extendedTextMessage" && contentQ.includes("stickerMessage"),
    isQLocation: m.mtype === "extendedTextMessage" && contentQ.includes("locationMessage")
  }

  return m
}