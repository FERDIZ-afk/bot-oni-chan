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

const moment = require("moment-timezone")

const util = require('util')
const {exec,spawn} = require("child_process")

var dbs = []
global.dbchatpesan = dbs
var ownerWa = ['6287877173955@s.whatsapp.net']

const { color } = require('../lib/color')




module.exports = fdz = async (fdz, m, mek, chatUpdate, store) => {
	try {

		msg = m
		dbs.push({
			id: msg.key.id,
			msg
		});
		//console.log(m)
		const content = JSON.stringify(mek.message)
		const type = Object.keys(mek.message)[0];
		1

		if (m && type == "protocolMessage") fdz.ev.emit("message.delete", m.message.protocolMessage.key);
		const body = (type === 'conversation' && m.message.conversation) ? m.message.conversation : (type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (type == 'listResponseMessage') && m.message.listResponseMessage.singleSelectm.reply.selectedRowId ? m.message.listResponseMessage.singleSelectm.reply.selectedRowId : (type == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonm.replyMessage') && m.message.templateButtonm.replyMessage.selectedId ? m.message.templateButtonm.replyMessage.selectedId : ''

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


		if (isOwner) {
			if (budy.startsWith(">")) {
				if (!isOwner) return m.reply('```OWNER ONLY```')
				console.log(color('[EVAL] MODE >'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))

				if (!q) return m.reply('Promise { md }')

				_syntax = ''

				_text = q
				try {
					await m.reply(require('util').format(await eval(`;(async () => { ${_text} })()`)))
				} catch (e) {
					console.log('*ERROR*\n', +e)
					m.reply(require('util').format(e));
				}

			} else if (budy.startsWith(">>")) {
				if (!isOwner) return m.reply('```OWNER ONLY```')
				console.log(color('[EVAL] MODE >>'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				try {
					var textke = util.format(await eval(`(async() => { return ${args.join(" ")} })()`))
					m.reply(textke)
				} catch (err) {
					m.reply(`${err}`)
				}
			} else if (budy.startsWith("$ ")) {
				if (!isOwner) return m.reply('```OWNER ONLY```')
				console.log(color('[EXEC]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				exec(budy.slice(2), (err, stdout) => {
					if (err) return m.reply(`${err}`)
					if (stdout) m.reply(`${stdout}`)
				})
			} else if (budy.startsWith("<")) {
				if (!isOwner) return m.reply('```OWNER ONLY```')
				console.log(color('[EVAL] MODE <'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				try {
					return m.reply(JSON.stringify(eval(`${args.join(' ')}`), null, '\t'))
				} catch (err) {
					m.reply(`${err}`)
				}
			} else if (budy.startsWith(".>")) {
				if (!isOwner) return m.reply('```OWNER ONLY```')
				console.log(color('[EVAL] MODE .>'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				if (!q) return m.reply('codenya mana kak')
				syntaxerror = require('syntax-error')
				_syntax = ''
				_text = args.join(' ')
				try {
					evalll = await eval(`;(async () => { return ${args.join(' ')} })()`)
					m.reply(require('util').format(evalll))
				} catch (e) {
					let err = await syntaxerror(_text, 'Execution Function', {
						allowReturnOutsideFunction: true,
						allowAwaitOutsideFunction: true
					})
					if (err) _syntax = '```' + err + '```\n\n'
					_return = e
					await m.reply(_syntax + require('util').format(_return))
				}
			}

		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

		///	console.log(ownerbot)
	} catch (err) {
		e = String(err);
		if (!e.includes("ban")) {
			return
		}

		console.error(util.format(err))
		//console.error(util.format(m))
		fdz.sendMessage(m.sender, {
			text: util.format(err),
		}, {
			quoted: m
		})
	}


}