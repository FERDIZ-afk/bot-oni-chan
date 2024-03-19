require('./global')
const {
  default: makeWASocket,
    DisconnectReason,
    delay,
    useMultiFileAuthState,
    generateForwardMessageContent,
    downloadContentFromMessage,
    makeInMemoryStore,
    fetchLatestBaileysVersion,
    getBinaryNodeMessages,
    makeCacheableSignalKeyStore,
    normalizeMessageContent,
    jidDecode,
    jidNormalizedUser,
    PHONENUMBER_MCC,
    proto,
    Browsers
  } = require('@adiwajshing/baileys');

  const Pino = require('pino');
  const lolcatjs = require('lolcatjs');
  const {
    Boom
  } = require('@hapi/boom');

  const pairingCode = !!config.options.pairingNumber;

  async function startfdz() {
    const {
      state,
      saveCreds
    } = await useMultiFileAuthState(config.options.pairingNumber ? `session_${config.options.pairingNumber}`: config.options.sessionName || 'session'); //await useMultiFileAuthState('auth_info_baileys');
    let {
      version,
      isLatest
    } = await fetchLatestBaileysVersion();

    const store = makeInMemoryStore({
      logger: Pino().child({
        level: 'silent',
        stream: 'store'
      })
    })
    //    console.log(store)

    var fdz = makeWASocket({
      version,
      // bisa memberikan konfigurasi tambahan di sini
  //    generateHighQualityLinkPreview: true,
   //   syncFullHistory: true,
   //   mobile: false,
      markOnlineOnConnect: false,
      logger: Pino({
        level: 'silent'
      }),
      printQRInTerminal: !pairingCode,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, Pino({
          level: 'silent'
        }).child({
          level: 'silent'
        }))
      }
    });
    //   console.log(fdz)
    fdz = require('./message/messages-send').sendmessages(fdz, store)
    if (pairingCode && !fdz?.authState.creds.registered) {
      let phoneNumber;
      if (typeof pairingCode === "string") {
        phoneNumber = pairingCode.replace(/[^0-9]/g, '');
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
          console.log("Start with your country's WhatsApp code, Example : 62xxx")
        }
      } else {
        phoneNumber = ""; // Nilai default jika options.pairingNumber bukan string
      }

      setTimeout(async () => {
        let code = await fdz?.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(`your pairing code : ${code}\n\n\n\n\n\n\n`)
      }, 3000);
    }

    store.bind(fdz.ev)

    fdz.ev.on('connection.update', (update) => {
      const {
        connection,
        lastDisconnect,
        qr
      } = update;
      if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        if (reason === DisconnectReason.badSession) {
          console.log('Bad Session File, Please Delete Session and Scan Again');
          startfdz();
        } else if (reason === DisconnectReason.connectionClosed) {
          console.log('Connection closed, reconnecting....');
          startfdz();
        } else if (reason === DisconnectReason.connectionLost) {
          console.log('Connection Lost from Server, reconnecting...');
          startfdz();
        } else if (reason === DisconnectReason.connectionReplaced) {
          console.log('Connection Replaced, Another New Session Opened, Please Close Current Session First');
          startfdz();
        } else if (reason === DisconnectReason.loggedOut) {
          console.log('Device Logged Out, Please Scan Again And Run.');
          // process.exit();
          //    startfdz();
        } else if (reason === DisconnectReason.restartRequired) {
          console.log('Restart Required, Restarting...');
          startfdz();
        } else if (reason === DisconnectReason.timedOut) {
          console.log('Connection TimedOut, Reconnecting...');
          startfdz();
        } else {
          fdz.end(`Unknown DisconnectReason: ${reason}|${connection}`);
        }
      } else if (connection === 'connecting') {
        lolcatjs.fromString('[Sedang mengkoneksikan]');
      } else if (connection === 'open') {
        lolcatjs.fromString('[Connecting to] WhatsApp web');
        lolcatjs.fromString('[Connected] ' + JSON.stringify(fdz.user, null, 2));
      }
    });



    fdz.ev.on("messages.upsert",
      async (chatUpdate) => {
        try {
          for (let mek of chatUpdate.messages) {
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message: mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            var m = await require('./src/simpel').modulewa(fdz, mek, store)
            //         console.log(m)
            require('./message/handler.js')(fdz, m, mek, chatUpdate, store)
            if (m.mtype == 'viewOnceMessageV2') {
              try {
                //    fdz.ev.emit("viewOnceMessage", m);
              } catch (err) {}
            }

          }
        } catch (e) {
       //   console.error(e+`messages.upsert\n\n\n\n${require("util").format(chatUpdate)}`)
         }
      });

    fdz.ev.on("viewOnceMessage",
      async (m) => {
        try {
          console.log(m)
          let msg = m.message.viewOnceMessageV2.message
          let teks = `「 *Anti ViewOnce Message* 」`;
          teks += `🤠 *Name* : ${m.pushName}`;
          teks += `👾 *User* : wa.me//${m.sender.split("@")[0]}`;
          teks += `💫 *MessageType* : ${m.type}`;
          msg[m.type].caption = teks + `${msg[m.type].caption ? `\n\n💬 *Caption :*\n${msg[m.type].caption}`: ''}`;

          await delay(500)
          m.copyNForward(m.chat, true, {
            readViewOnce: true,
            quoted: m
          })
        } catch (err) {
          console.log(err)
        }
        //  console.log(json)
        //require('./ivents/messages-viewone.js')(fdz,json)
      })

    fdz.ev.on('groups.update', async (anu) => {
        console.log(anu)
        //		m.reply(anu)
      })
    fdz.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        //		m.reply(anu)
      })


    fdz.ev.on('creds.update',saveCreds);

  }

  startfdz()