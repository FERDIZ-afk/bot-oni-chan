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
	WA_DEFAULT_EPHEMERAL,
	generateForwardMessageContent,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	normalizeMessageContent,
	generateMessageID,
	downloadContentFromMessage,
	makeInMemoryStore,
	fetchLatestBaileysVersion,
	jidDecode,
	getContentType,
	proto
} = require('@adiwajshing/baileys')

const moment = require("moment-timezone")
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")

const util = require('util')
const fs = require("fs");
const {exec,spawn} = require("child_process")
const IkyyClient = require("ikyy");
global.rzky = new IkyyClient();


var dbs = []
global.dbchatpesan = dbs

const { color } = require('../lib/color')
const { prefixbot, ownerNumber } = require('../config/settings')
const { infobot } = require("../config/botrespon")

const prefix = prefixbot
const multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");

module.exports = fdz = async (fdz, m, mek, chatUpdate, store, map) => {
	try {

		msg = m
		dbs.push({
			id: msg.key.id,
			msg
		});
	//	console.log(m)
		const content = JSON.stringify(mek.message)
		const type = Object.keys(mek.message)[0];1;
    
    
		global.dashboard = JSON.parse(fs.readFileSync("./database/dashboard.json"));
		const body = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation :
		(m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : 
		(m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : 
		(m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : 
		(m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : 
		(m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : 
		(m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
		var budy = (typeof m.text == 'string' ? m.text : '')

		const fromMe = msg.key.fromMe
		const from = m.key.remoteJid //|| fromMe

		const args = body.trim().split(/ +/).slice(1)
		const text = q = args.join(" ")
		const quoted = m.quoted ? m.quoted : m
		const mime = (quoted.msg || quoted).mimetype || ''
		
		const command = body.trim().split(/ +/)[0]  // body.toLowerCase().split(' ')[0] || ''

		const pushName = msg.pushName
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const isPrivate = msg.key.remoteJid.endsWith("@s.whatsapp.net");

		const sender = m.sender //isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const botNumber = fdz.decodeJid(fdz.user.id) || fdz.user.id.split(':')[0] + '@s.whatsapp.net' || fdz.user.jid
		var ownerbot = [botNumber]
		const isOwner = sender.includes(ownerNumber) || sender.includes(ownerNumber) || sender.includes(ownerbot)

		const groupMetadata = isGroup ? await fdz.groupMetadata(m.chat) : ''
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


		let temp_pref = multi_pref.test(body) ? body.split("").shift() : prefix;
		const isCmd = body.startsWith(prefix);


		global.mess = {
			wait: '⌛ Sedang di proses「 ⏳ 」',
			success: '✔️ Berhasil ✔️',
			error: {
				stick: '❌ Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ❌',
				Iv: '❌ Link tidak valid ❌',
				api: "Sorry an error occurred"
			},
			only: {
				group: '❌ Perintah ini hanya bisa di gunakan dalam group! ❌',
				privateB: '❌ Perintah ini hanya bisa di gunakan dalam chat private! ❌',
				ownerG: '❌ Perintah ini hanya bisa di gunakan oleh owner group! ❌',
				ownerB: '❌ Perintah ini hanya bisa di gunakan oleh owner bot! ❌',
				admin: '❌ Perintah ini hanya bisa di gunakan oleh admin group! ❌',
				Badmin: '❌ Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❌'
			}
		}

	
		if (m.mtype == 'viewOnceMessageV2' ) {
			try {
				fdz.ev.emit("viewOnceMessage", m);
			} catch (err) {
				console.error(util.format(err))
				//console.error(util.format(m))
				fdz.sendMessage(m.sender, {
					text: util.format(err),
				}, {
					quoted: m
				})
			}
		}

	if ( m.mtype == 'pollUpdateMessage') {
  try {
    	console.log(util.format(m))
    	//console.log(util.format(m.message.pollUpdateMessage))
  } catch (err) {
		console.error(util.format(err))
		//console.error(util.format(m))
		fdz.sendMessage(m.sender, {
			text: util.format(err),
		}, {
			quoted: m
		})
	}}

		//Reply no prefix
	  if (body == "P") {
	    await delay(500)
			await m.reply("*pa pe pa pe* \nketik *mode* kak buat tahu\nmode bot saat ini\nketik *prefix* kak buat tahu\nprefix / awalan command bot saat ini ")
		} else if (body == "p") {
		  await delay(500)
			await m.reply("*pa pe pa pe* \nketik *mode* kak buat tahu\nmode bot saat ini\nketik *prefix* kak buat tahu\nprefix / awalan command bot saat ini ")
		} else if (body == "prefix") {
		  await delay(500)
			await m.reply(` *Prefix saat ini:* ${prefix}\n prefix adalah awal\ndari suatu command untuk bot.\n\n*contoh* *:* ${prefix}menu \n\ningat perhatikan juga spasi dan besar kecil ngak nya awalan huruf`)
		} else if (body == "Prefix") {
		  await delay(500)
			await m.reply(` *Prefix saat ini:* ${prefix}\n prefix adalah awal\ndari suatu command untuk bot.\n\n*contoh* *:* ${prefix}menu \n\ningat perhatikan juga spasi dan besar kecil ngak nya awalan huruf`)
		} else if (body == "makasihya") {
		  await delay(500)
			await m.reply(" *sama sama 🥰* ")
		} else if (body == "Makasihya") {
		  await delay(500)
			await m.reply(" *sama sama 🥰* ")
		} else if (body == "info") {
		  await delay(500)
		   var teks = await infobot(fdz, sender, prefix, pushName)
      await  m.reply(teks)
    } else if (body == "Info") {
		  await delay(500)
		   var teks = await infobot(fdz, sender, prefix, pushName)
      await  m.reply(teks)
    }

		if (isOwner) {
			if (budy.startsWith(">")) {
				if (!isOwner) return m.reply(mess.only.ownerB)
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
				if (!isOwner) return m.reply(mess.only.ownerB)
				console.log(color('[EVAL] MODE >>'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				try {
					var textke = util.format(await eval(`(async() => { return ${args.join(" ")} })()`))
					m.reply(textke)
				} catch (err) {
					m.reply(`${err}`)
				}
			} else if (budy.startsWith("$ ")) {
				if (!isOwner) return m.reply(mess.only.ownerB)
				console.log(color('[EXEC]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				exec(budy.slice(2), (err, stdout) => {
					if (err) return m.reply(`${err}`)
					if (stdout) m.reply(`${stdout}`)
				})
			} else if (budy.startsWith("<")) {
				if (!isOwner) return m.reply(mess.only.ownerB)
				console.log(color('[EVAL] MODE <'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
				try {
					return m.reply(JSON.stringify(eval(`${args.join(' ')}`), null, '\t'))
				} catch (err) {
					m.reply(`${err}`)
				}
			} else if (budy.startsWith(".>")) {
				if (!isOwner) return m.reply(mess.only.ownerB)
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
	
		require("../lib/function/menfess")(m, fdz,prefix,body);

		const cmdName = body.slice(temp_pref.length).trim().split(/ +/).shift().toLowerCase();
		const cmd =
			map.command.get(body.trim().split(/ +/).shift().toLowerCase()) ||
			[...map.command.values()].find((x) =>
				x.alias.find((x) => x.toLowerCase() == body.trim().split(/ +/).shift().toLowerCase())
			) ||
			map.command.get(cmdName) ||
			[...map.command.values()].find((x) => x.alias.find((x) => x.toLowerCase() == cmdName));

if (m.message && !m.key.fromMe ) {
      //      fdz.sendReadReceipt(m.chat, m.sender, [m.key.id])
    fdz.readMessages([m.key])
	  if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'dari', color(sender.split('@')[0]), 'args :', color(args.length))
    if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, 'message', color(command), 'nomor', color(sender.split('@')[0]), 'Dari grup', color(groupName), 'args :', color(args.length))
   
    if (!isGroup && !isCmd) console.log(color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), "white"), color("[ PRIVATE ]", "aqua"), color(body || type, "white"), "dari", color(sender.split('@')[0], "yellow"))
    if (isGroup && !isCmd) console.log(color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), "white"), color("[  GROUP  ]", "aqua"), color(body || type, "white"), "dari", color(sender.split('@')[0], "yellow"), "group", color(groupName, "yellow"))
    if (!isGroup && isCmd) console.log(color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), "white"), color("[ COMMAND ]", "aqua"), color(body || type, "white"), "dari", color(sender.split('@')[0], "yellow"))
    if (isGroup && isCmd) console.log(color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), "white"), color("[ COMMAND ]", "aqua"), color(body || type, "white"), "dari", color(sender.split('@')[0], "yellow"), "group", color(groupName, "yellow"))
}
		

    if (!cmd) return;

		let optionsCmd = cmd.options;
		if (optionsCmd.noPrefix) {
			if (isCmd) return;
			q = body.split(" ").splice(1).join(" ");
		} else if (!optionsCmd.noPrefix) {
			if (!isCmd) return;
		}
		
		
		
		
		if (optionsCmd.isAdmin && !isGroupAdmins) {
			await fdz.sendMessage(from, { text: mess.only.admin	}, { quoted: m });
			return true;
		}
		if (optionsCmd.isQuoted && !msg.quoted) {
			await msg.reply(`Please reply message sesuai type pesan tersebut`);
			return true;
		}
		if (optionsCmd.isBotAdmin && !isBotGroupAdmins) {
			await fdz.sendMessage(from, { text: mess.only.Badmin }, { quoted: m });
			return true;
		}
		if (optionsCmd.isOwner && !isOwner) {
			await fdz.sendMessage(from, { text: mess.only.ownerB }, { quoted: m });
			return true;
		}
		if (optionsCmd.isGroup && !isGroup) {
			await fdz.sendMessage(from, { text: mess.only.group }, { quoted: m });
			return true;
		}
		if (optionsCmd.query && !q) {
			await msg.reply(
				typeof optionsCmd.query == "boolean" && optionsCmd.query ? `Masukan query` : optionsCmd.query
			);
			return true;
		}

		if (optionsCmd.disable) {
			await fdz.sendMessage(
				from, {
					text: typeof optionsCmd.wait == "string" ? optionsCmd.wait : "untuk sementara fitur sedang maintenance\ncobalah fitur yang lain."
				}, {
					quoted: m
				}
			);
			return true;
		}

if(optionsCmd.isPrivate && !isPrivate) {
		await msg.reply("Fitur ini hanya bisa di gunakan di chat private")
		return true;
	}

		if (optionsCmd.wait) {
			await fdz.sendMessage(
				from, {
					text: typeof optionsCmd.wait == "string" ? optionsCmd.wait : mess.wait
				}, {
					quoted: m
				}
			);
		}
		
		try {
			await cmd.run({
				msg: m,
				fdz,
				from,
				fromMe,
				type,
				body,
				budy,
				mess,
				cmdName,
				cmd
			}, {
				quoted,
				mime,
				pushName,
				isGroup,
				botNumber,
				isOwner,
				q,
				map,
				args,
				prefix: temp_pref,
				command,
				groupMetadata,
				groupMembers,
				groupAdmins,
				isBotGroupAdmins,
				isGroupAdmins,
				isImage,
				isVideo,
				isSticker,
				isQuotedMsg,
				isQuotedImage,
				isQuotedAudio,
				isQuotedDocument,
				isQuotedVideo,
				isQuotedSticker,
				isviewOnce
			});

			if (cmd && cmd.category != "private") {
				let comand = dashboard.find((command) => command.name == cmd.name);
				console.log(comand)

				if (comand) {
					comand.success += 1;
					comand.lastUpdate = Date.now();
					fs.writeFileSync("./database/dashboard.json", JSON.stringify(dashboard));
				} else {
					try {
						let data = JSON.parse(fs.readFileSync("./database/dashboard.json"))
						var isian = {
							name: cmd.name,
							success: 1,
							failed: 0,
							lastUpdate: Date.now()
						}
						data.push(isian)
						//	console.log(data)
						fs.writeFileSync("./database/dashboard.json", JSON.stringify(data, null, 2));
					} catch (err) {
						console.log(`${err}`)
					}
				}
			}

		} catch (e) {
			console.error(util.format(e))
			await fdz.sendMessage(ownerNumber[0], {
			text: util.format(e),
		}, {
			quoted: m
		})
		
			if (cmd.category != "private") {
				let fail = dashboard.find((command) => command.name == cmd.name);
				fail.failed += 1;
				fail.success -= 1;
				fail.lastUpdate = Date.now();
				fs.writeFileSync("./database/dashboard.json", JSON.stringify(dashboard));
			}
		}
		
	} catch (err) {
		console.error(util.format(err))
		await fdz.sendMessage(ownerNumber[0], {
			text: util.format(err),
		}, {
			quoted: m
		})
	}


}