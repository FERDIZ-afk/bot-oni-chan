/**
   * Create By FERDIZ -AFK 
   * Contact Me on wa.me/6287877173955
   * Follow https://github.com/FERDIZ-afk
*/

qrwa = null
PORT = process.env.PORT || 3000
const qrcode = require('qrcode')
const express = require('express')
const app = express()
app.enable('trust proxy')
app.set("json spaces",2)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.all('*', async (req, res) => {
    if (qrwa) return res.type('.jpg').send(qrwa)
    res.send('QRCODE BELUM TERSEDIA. SILAHKAN REFRESH TERUS MENERUS')
})
app.listen(PORT, async() => {
    console.log(`express listen on port ${PORT}`)
})

const Pino = require("pino")
const {
	default: makeWASocket,
	DisconnectReason,
	AnyMessageContent,
	delay,
	useMultiFileAuthState, 
	generateForwardMessageContent,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	generateMessageID,
	downloadContentFromMessage,
	makeInMemoryStore,
	fetchLatestBaileysVersion,
  MessageRetryMap, 
	jidDecode,
	jidNormalizedUser,
	proto
} = require('@adiwajshing/baileys')

const {
	Boom
} = require("@hapi/boom")
const lolcatjs = require('lolcatjs')
const path = require("path");
const fs = require("fs");

const {
	modulewa,
} = require('./lib/simpel')
const {
	sendmessages,
} = require('./message/messages-send')

const { color } = require('./lib/color')
const utils = require("./utils");
const { prefixbot } = require('./config/settings')
const msgRetryCounterMap = MessageRetryMap || { }




const attribute = {};
attribute.prefix = prefixbot 

attribute.command = new Map();

// database game
global.addMap = (x) => {
	attribute[x] = new Map();
};

// lock cmd
attribute.lockcmd = new Map();



const ReadFitur = () => {
	let pathdir = "./message/command" //path.join(__dirname, "./message/command");
	let fitur = fs.readdirSync(pathdir);
	console.log("Loading commands..")
//	spinnies.add("spinner-1", { text: "Loading commands..", color: "green" });
	fitur.forEach(async (res) => {
		const commands = fs.readdirSync(`${pathdir}/${res}`).filter((file) => file.endsWith(".js"));
		for (let file of commands) {
			const command = require(`${pathdir}/${res}/${file}`);
			if (typeof command.run != "function") continue;
			const cmdOptions = {
				name: "command",
				alias: [""],
				desc: "",
				use: "",
				type: "", // default: changelog
				category: typeof command.category == "undefined" ? "" : res.toLowerCase(),
				wait: false,
				isOwner: false,
				isAdmin: false,
				isQuoted: false,
				isGroup: false,
				isBotAdmin: false,
				query: false,
				noPrefix: false,
				isMedia: {
					isQVideo: false,
					isQAudio: false,
					isQImage: false,
					isQSticker: false,
					isQDocument: false,
				},
				disable: false,
				isUrl: false,
				run: () => {},
			};
			let cmd = utils.parseOptions(cmdOptions, command);
			let options = {};
			for (var k in cmd)
				typeof cmd[k] == "boolean"
					? (options[k] = cmd[k])
					: k == "query" || k == "isMedia"
					? (options[k] = cmd[k])
					: "";
			let cmdObject = {
				name: cmd.name,
				alias: cmd.alias,
				desc: cmd.desc,
				use: cmd.use,
				type: cmd.type,
				category: cmd.category,
				options: options,
				run: cmd.run,
			};
			attribute.command.set(cmd.name, cmdObject);
			require("delay")(100);
	//		global.reloadFile(`./message/command/${res}/${file}`);
		}
	});
	console.log("Command loaded successfully")
//	spinnies.succeed("spinner-1", { text: "Command loaded successfully", color: "yellow" });
};
// cmd
ReadFitur();











const startfdz = async () => {
	const {
		state,
		saveCreds
	} = await useMultiFileAuthState('auth')
	// fetch latest version of WA Web
	const {
		version,
		isLatest
	} = await fetchLatestBaileysVersion()
	console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

	const store = makeInMemoryStore({
		logger: Pino().child({
			level: 'silent',
			stream: 'store'
		})
	})

	const sock = makeWASocket({
		version,
		logger: Pino({
			level: 'silent'
		}),
		printQRInTerminal: true,
		//work tempelate message 
		patchMessageBeforeSending: (message) => {
                const requiresPatch = !!(
                  message.buttonsMessage
              	  || message.templateMessage
              		|| message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    };
                }
                return message;
    },
		browser: ['bot-oni-chan', 'Safari', '1.0.0'],
		auth: state,
	//	markOnlineOnConnect: false
		//msgRetryCounterMap
	})
  const fdz = sendmessages(sock,store)
 	if (fdz.user && fdz.user.id) fdz.user.jid = jidNormalizedUser(fdz.user.id)
  global.fdz = fdz
	fdz.ev.on('connection.update', async (update) => {
		const {
			connection,
			lastDisconnect,
			qr
		} = update

		try {
			if (qr) {
				console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color(' scan qr nya kak makek WhatsApp 👍 '))
				let qrkode = await qrcode.toDataURL(qr, {
					scale: 20
				})
				qrwa = Buffer.from(qrkode.split`,` [1], 'base64')
			}

			if (connection === 'close') {
				qrwa = null
				let reason = new Boom(lastDisconnect?.error)?.output.statusCode
				if (reason === DisconnectReason.badSession) {
					console.log(`Bad Session File, Please Delete Session and Scan Again`);
					startfdz()
				} else if (reason === DisconnectReason.connectionClosed) {
					console.log("Connection closed, reconnecting....");
					startfdz();
				} else if (reason === DisconnectReason.connectionLost) {
					console.log("Connection Lost from Server, reconnecting...");
					startfdz();
				} else if (reason === DisconnectReason.connectionReplaced) {
					console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
					startfdz()
				} else if (reason === DisconnectReason.loggedOut) {
					console.log(`Device Logged Out, Please Scan Again And Run.`);
					//			process.exit();
				} else if (reason === DisconnectReason.restartRequired) {
					console.log("Restart Required, Restarting...");
					startfdz();
				} else if (reason === DisconnectReason.timedOut) {
					console.log("Connection TimedOut, Reconnecting...");
					startfdz();
				} else fdz.end(`Unknown DisconnectReason: ${reason}|${connection}`)
			}
			if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
				lolcatjs.fromString(`[Sedang mengkoneksikan]`)
			}
			if (update.connection == "open" || update.receivedPendingNotifications == "true") {
				qrwa = null
				lolcatjs.fromString(`[Connecting to] WhatsApp web`)
				lolcatjs.fromString(`[Connected] ` + JSON.stringify(fdz.user, null, 2))
			}

		} catch (err) {
			console.log('error di connection.update' + err)
			startfdz();
		}

	})

store.bind(fdz.ev)

	fdz.ev.on('messages.upsert', async chatUpdate => {
		try {
			mek = chatUpdate.messages[0]
			if (!mek.message) return
			mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			//		if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			var m = modulewa(fdz, mek, store)
			require('./message/handler.js')(fdz, m, mek, chatUpdate, store, attribute)
		} catch (err) {
			//console.log(JSON.stringify(err, undefined, 2))
		}
	})

	fdz.ev.on('group-participants.update', async (anu) => {
		require('./ivents/group-participants-update.js')(fdz, anu)
	})

	// detect group update
	fdz.ev.on("groups.update", async (json) => {
		require('./ivents/groups-update.js')(fdz, json)
	})

	fdz.ev.on("message.delete", async (json) => {
		require('./ivents/message-delete.js')(fdz, json)
	})
  
  fdz.ev.on("viewOnceMessage", async (json) => {
//		console.log(json)
		require('./ivents/messages-viewone.js')(fdz,json)
	})
	
	
  fdz.ev.on("messages.reaction", async (json) => {
		require('./ivents/messages-reaction.js')(fdz, store, json)
	})

	fdz.ev.process(
		async (events) => {
			// selalu offline
			if (events['presence.update']) {
				await fdz.sendPresenceUpdate('unavailable')
			}

			// menerima pesan baru
			if (events['messages.upsert']) {
				const upsert = events['messages.upsert']
				//     console.log(JSON.stringify(upsert, '', 2))
				for (let msg of upsert.messages) {
					if (msg.key.remoteJid === 'status@broadcast') {
						//console.log(JSON.stringify(upsert, '', 2))
						if (msg.message?.protocolMessage) return
						console.log(`Lihat status ${msg.pushName} ${msg.key.participant.split('@')[0]}`)
						await fdz.readMessages([msg.key])
						await delay(1000)
						return fdz.readMessages([msg.key])
					}
				}


			}
			// kredensial diperbarui -- simpan season WhatsApp web
			if (events['creds.update']) {
				await saveCreds()
			}
		}
	)



	return fdz
}

startfdz()
//process.on('uncaughtException', console.error)