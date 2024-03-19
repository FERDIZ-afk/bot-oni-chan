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
  extractMessageContent,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  normalizeMessageContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  fetchLatestBaileysVersion,
  generateProfilePicture,
  jidDecode,
  getContentType,
  proto
} = require('@adiwajshing/baileys')

const { exec, spawn } = require("child_process")

const commands = {
  start: 'Perintah untuk memulai bot',
  help: 'Perintah untuk menampilkan bantuan',
  info: 'Perintah untuk informasi',
  // Tambahkan perintah lain di sini
};

module.exports = fdz = async (fdz, m, mek, chatUpdate, store) => {
  try {
    if (!m) return
    if (m.isBaileys) return
    const multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");

    const prefix = m.prefix
    let temp_pref = multi_pref.test(m.body) ? m.body.split("").shift() : prefix;
    const args = m.body.trim().split(/ +/).slice(1)
    const text = q = args.join(" ")
    const mycontacts = db.data.bot.contacts || []
    const mycontacts_id = mycontacts.map(a => a.id)
    const isCmd = m.body.startsWith(prefix)
    const command = isCmd ? m.command.slice(1).trim().toLowerCase() : ""

    const quoted = m.isQuoted ? m.quoted : m
    
    if (m.isOwner) {
      if (m.body.startsWith(">")) {
        if (!q) return m.reply('Promise { md }')
        _syntax = ''
        _text = q
        try {
          await m.reply(require('util').format(await eval(`;(async () => { ${_text} })()`)))
        } catch (e) {
          console.log('*ERROR* eval\n', +e)
          m.reply(require('util').format(e));
        }

      } else if (m.body.startsWith(">>")) {
        try {
          var textke = require('util').format(await eval(`(async() => { return ${args.join(" ")} })()`))
          m.reply(require('util').format(textke))
        } catch (err) {
          m.reply(`FROM EVAL \n${require('util').format(err)}`)
        }
      } else if (m.body.startsWith("$ ")) {
        exec(m.body.slice(2), (err, stdout) => {
          if (err) return m.reply(`${err}`)
          if (stdout) m.reply(`${stdout}`)
        })
      } else if (m.body.startsWith("<")) {
        try {
          return m.reply(JSON.stringify(eval(`${args.join(' ')}`), null, '\t'))
        } catch (err) {
          m.reply(`FROM EVAL \n${require('util').format(err)}`)
        }
      } else if (m.body.startsWith(".>")) {
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

const responses = {
  "p": "*pa pe pa pe* \n minimal bilang assalamualaikum dulu gitu.",
  "prefix": ` *Prefix saat ini:* ${prefix}\n prefix adalah awal\ndari suatu command untuk bot.\n\n*contoh* *:* ${prefix}menu \n\ningat perhatikan juga spasi dan besar kecil ngak nya awalan huruf`,
  "makasihya": " *sama sama 🥰* ",
  "assalamualaikum" :"waalaikumsalam",
//  "info": await infobot(fdz, sender, prefix, pushName)
};

// Konversi pesan masukan menjadi huruf kecil
const lowerBody = m.body.toLowerCase();

// Mengecek apakah pesan ada dalam daftar respons
if (responses.hasOwnProperty(lowerBody)) {
  await delay(500);
  await m.reply("bot respons\n\n\n"+responses[lowerBody]);
}



    const cmdName = m.body.slice(temp_pref.length).trim().split(/ +/).shift().toLowerCase();
    const cmd =
      fitur_bot.get(m.body.trim().split(/ +/).shift().toLowerCase()) ||
      [...fitur_bot.values()].find((x) =>
        x.alias.find((x) => x.toLowerCase() == m.body.trim().split(/ +/).shift().toLowerCase())
      ) ||
      fitur_bot.get(cmdName) ||
      [...fitur_bot.values()].find((x) => x.alias.find((x) => x.toLowerCase() == cmdName));
      
    if (!cmd) return;
    let cmd_opsi = cmd.options;
      console.log(cmd)
      
    if (cmd_opsi.isOwner && !m.isOwner) {
      return m.reply(mess.owner);
    } else if (cmd_opsi.isGroup && !m.isGroup) {
      return m.reply(mess.group);
    } /*else if (cmd_opsi.private && m.isGroup) {
      return m.reply(response.private);
    }*/ else if (cmd_opsi.isAdmin && m.isGroup && !m.isAdmin && !m.isOwner) {
      return m.reply(mess.admin);
    } else if (cmd_opsi.isBotAdmin && m.isGroup && !m.isBotAdmin) {
      return m.reply(mess.botadmin);
    } 
      
    if (cmd.noPrefix) {
      if (isCmd) return;
      q = m.body.split(" ").splice(1).join(" ");
    } else if (!cmd.noPrefix) {
      if (!isCmd) return;
    }

    try {
      await cmd.run({
        fdz,
        m,
        cmdName,
        cmd
      }, {
        quoted,
        q,
        args,
        prefix: temp_pref,
      });

    } catch (e) {
      console.error(e+`\n\nexec command\n\n${m}`)
    }
  } catch (error) {
    console.error(error+`\n\nhandler.js\n\n${m}`);
  }
}
