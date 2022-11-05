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

const {
	modulewa,
} = require('./lib/simpel')
const { color } = require('./lib/color')

const msgRetryCounterMap = MessageRetryMap || { }

const startfdz = async () => {
	const {
		state,
		saveCreds
	} = await useMultiFileAuthState('auth')  //useMultiFileAuthState('auth')
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

	const fdz = makeWASocket({
		version,
		logger: Pino({
			level: 'silent'
		}),
		printQRInTerminal: true,
		browser: ['bot-oni-chan', 'Safari', '1.0.0'],
		auth: state,
		markOnlineOnConnect: false
		//msgRetryCounterMap
	})

		fdz.ev.on('connection.update', async (update) => {
			const {
				connection,
				lastDisconnect,
				qr
			} = update

			try {
			  if (qr) {
			    console.log(color('[','white'), color('!','red'), color(']','white'), color(' scan qr nya kak makek WhatsApp 👍 '))
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


	fdz.ev.on('messages.upsert', async chatUpdate => {
		try {

			mek = chatUpdate.messages[0]
			if (!mek.message) return
			mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			//		if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			var m = modulewa(fdz, mek, store)

			//		m.isBaileys = m.key.id.startsWith('BAE5') || m.key.id.startsWith('3EB0')
			require('./message/handler.js')(fdz, m, mek, chatUpdate, store)

			//		require('../controllers/botowner.js')(fdz, m, mek, chatUpdate, store)
		} catch (err) {
			//console.log(JSON.stringify(err, undefined, 2))
		}
	})

		fdz.ev.on('group-participants.update', async (anu) => {
			console.log(anu)
	//		require('./ivents/group-participants-update.js')(anu)
		})
		
fdz.ev.on('groups.update', async (json) => {
			console.log(json)
	//		require('./ivents/groups-update.js')(json)
		})

	fdz.ev.on("message.delete", async (m) => {
		if (!m) m = false;
	//	require('./ivents/message-delete.js')(fdz,json)

	});



	fdz.ev.process(
		async (events) => {
			// sesuatu tentang koneksi berubah
			// mungkin ditutup, atau kami menerima semua pesan offline atau koneksi dibuka
/*
			if (events['connection.update']) {
				const update = events['connection.update']
				const {
					connection,
					lastDisconnect,
					qr
				} = update
				if (qr) {
					let qrkode = await qrcode.toDataURL(qr, {
						scale: 20
					})
					qrwa = Buffer.from(qrkode.split`,` [1], 'base64')
				}

				if (connection === 'open') {
				  qrwa = null
          console.log(fdz.user)
				}
				if (connection === 'close') {
					qrwa = null
					if ((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
						await startSock()
					} else {
						console.log('Connection closed. You are logged out.')
					}
				}
				// console.log('connection update', update)
			}
*/
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
						console.log(`Lihat status ${msg.pushName} ${msg.key.participant.split('@')[0]}\n`)
						await fdz.readMessages([msg.key])
						await delay(1000)
						return fdz.readMessages([msg.key])
					}
				}


			}

			// kredensial diperbarui -- simpan
			if (events['creds.update']) {
				await saveCreds()
			}


		}
	)



	return fdz
}

startfdz()
process.on('uncaughtException', console.error)