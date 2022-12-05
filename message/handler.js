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
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")

const util = require('util')
const fs = require("fs");
const {exec,spawn} = require("child_process")
const IkyyClient = require("ikyy");
global.rzky = new IkyyClient();


var dbs = []
global.dbchatpesan = dbs

const { color } = require('../lib/color')
const { prefixbot, ownerWa } = require('../config/settings')
const { infobot } = require("../config/botrespon")
const PollUpdateDecrypt = require('../lib/PollUpdateDecrypt')

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
		const type = Object.keys(mek.message)[0];
		1
    
    
		global.dashboard = JSON.parse(fs.readFileSync("./database/dashboard.json"));
		if (m && type == "protocolMessage") fdz.ev.emit("message.delete", m.message.protocolMessage.key);
		const body = m.body || (type === 'conversation' && m.message.conversation) ? m.message.conversation : (type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption :	(type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : 	(type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (type == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''

		var budy = (typeof m.text == 'string' ? m.text : '')

		const fromMe = msg.key.fromMe
		const from = m.key.remoteJid //|| fromMe

		const args = budy.trim().split(/ +/).slice(1)
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
		const isOwner = sender.includes(ownerWa) || sender.includes(ownerWa) || sender.includes(ownerbot)

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
		const isCmd = body.startsWith(temp_pref);


    mess = {
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

	
	if ( m.mtype == 'viewOnceMessage' && m.msg.viewOnce) {
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

		const cmdName = body.slice(temp_pref.length).trim().split(/ +/).shift().toLowerCase();
		const cmd =
			map.command.get(body.trim().split(/ +/).shift().toLowerCase()) ||
			[...map.command.values()].find((x) =>
				x.alias.find((x) => x.toLowerCase() == body.trim().split(/ +/).shift().toLowerCase())
			) ||
			map.command.get(cmdName) ||
			[...map.command.values()].find((x) => x.alias.find((x) => x.toLowerCase() == cmdName));
		if (isCmd && !cmd) {
			var data = [...map.command.keys()];
			[...map.command.values()]
				.map((x) => x.alias)
				.join(" ")
				.replace(/ +/gi, ",")
				.split(",")
				.map((a) => data.push(a));
			var result = rzky.tools.detectTypo(cmdName, data);
			if (result.status != 200) return;
			teks = `Maybe this is what you mean?\n\n`;
			angka = 1;
			if (typeof result.result == "object" && typeof result.result != "undefined") {
				for (let i of result.result) {
					var alias =
						[...map.command.values()].find((x) => x.name == i.teks) ||
						[...map.command.values()].find((x) => x.alias.find((x) => x.toLowerCase() == i.teks));
					teks += `*${angka++}. ${map.prefix}${i.teks}*\n`;
					teks += `Alias: *${alias.alias.join(", ")}*\n`;
					teks += `Accuracy: *${i.keakuratan}*\n\n`;
				}
				teks += `If true, please re-command!`;
				await msg.reply(teks);
			}
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
		
		/*
		if (cmd && cmd.category != "private") {
			let comand = dashboard.find((command) => command.name == cmd.name);
			if (comand) {
				comand.success += 1;
				comand.lastUpdate = Date.now();
				fs.writeFileSync("./database/dashboard.json", JSON.stringify(dashboard));
			} else {
				dashboard.push({ name: cmd.name, success: 1, failed: 0, lastUpdate: Date.now() })
				fs.writeFileSync("./database/dashboard.json"), JSON.stringify(dashboard));
			}
		}
		*/
		
		if (optionsCmd.isAdmin && !isGroupAdmins) {
			await fdz.sendMessage(from, { text: mess.only.admin }, { quoted: msg });
			return true;
		}
		
		if (optionsCmd.isQuoted && !msg.quoted) {
			await msg.reply(`Please reply message sesuai type pesan tersebut`);
			return true;
		}
		
		if (optionsCmd.isBotAdmin && !isBotGroupAdmins) {
			await fdz.sendMessage(from, { text: mess.only.Badmin }, { quoted: msg });
			return true;
		}
		
		if (optionsCmd.isOwner && !isOwner) {
			await fdz.sendMessage(from, { text: mess.only.ownerB}, { quoted: msg });
			return true;
		}
		if (optionsCmd.isGroup && !isGroup) {
			await fdz.sendMessage(from, { text: mess.only.group }, { quoted: msg });
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
				from,
				{ text: typeof optionsCmd.wait == "string" ? optionsCmd.wait : "untuk sementara fitur sedang maintenance" },
				{ quoted: msg }
			);
			return true;
		}
		
		
		if (optionsCmd.wait) {
			await fdz.sendMessage(
				from,
				{ text: typeof optionsCmd.wait == "string" ? optionsCmd.wait : mess.wait },
				{ quoted: msg }
			);
		}
		
				try {
			await cmd.run(
				{ msg, fdz, from, fromMe, type, body,budy, mess},
				{ quoted, mime, pushName, isGroup, botNumber,  isOwner, q, map, args, prefix: temp_pref, chat: m, command, groupMetadata, groupMembers,groupAdmins, isBotGroupAdmins, isGroupAdmins, isImage,isVideo,isSticker,isQuotedMsg,isQuotedImage,isQuotedAudio,isQuotedDocument,isQuotedVideo,isQuotedSticker,isviewOnce}
			);
		} catch (e) {
			console.error(util.format(e))
			await fdz.sendMessage(ownerWa[0], {
			text: util.format(e),
		}, {
			quoted: m
		})
		}
		
		/*
		
switch (command) {
  
//Owner Menu
case prefix + 'restart': {
	if (!isOwner) throw m.reply(mess.only.ownerB)
	if (!process.send) throw m.reply('Dont: node index.js\nDo: node main.js')
	if (fdz.user.jid) {
	  //  fs.writeFileSync('./database/mess.json', JSON.stringify([], null, 2))
		await m.reply('*Restarting Bot...*')
		await delay(1500)
		exec(`pm2 restart webot`)
//		process.send('reset')
	//	m.reply(mess.done)
	} else throw m.reply('Eits tidak semudah itu Ferguso')
}
break
 
case prefix + 'up':
case prefix + 'update': {
	if (!isOwner) throw m.reply(mess.only.ownerB)
	if (!process.send) throw m.reply('Dont: node index.js\nDo: node main.js')
	if (fdz.user.jid) {
	  //  fs.writeFileSync('./database/mess.json', JSON.stringify([], null, 2))
exec(`git pull`, (err, stdout) => {
					if (err) return m.reply(`${err}`)
					if (stdout) m.reply(`${stdout}`)
				})
//		process.send('reset')
		await delay(1500)
	} else throw m.reply('Eits tidak semudah itu Ferguso')
}
break


	case prefix + 'public': {
		if (!isOwner) return m.reply(mess.only.ownerB)
		if (banChats === false) return await m.reply('Dah public daritadi mank')
		banChats = false
		m.reply(`「 *PUBLIC-MODE* 」`)
	}
	break

case prefix + 'self': {
	if (!isOwner) return m.reply(mess.only.ownerB)
	if (banChats === true) return await m.reply('Dah self daritadi mank')
	//	uptime = process.uptime()
	banChats = true
	m.reply(`「 *SELF-MODE* 」`)
}
break

default:

}
		
		*/
		
		
		
		
		
		
		
		
		
		
		
		

	} catch (err) {
		e = String(err);
		console.error(util.format(err))
		await fdz.sendMessage(ownerWa[0], {
			text: util.format(e),
		}, {
			quoted: m
		})
	}


}