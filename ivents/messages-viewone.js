
/**
   * Create By FERDIZ -AFK 
   * Contact Me on wa.me/6287877173955
   * Follow https://github.com/FERDIZ-afk
*/
const {
	delay
} = require('@adiwajshing/baileys')
const moment = require("moment-timezone")

module.exports = async (fdz,m) => {
  			try {
  			  console.log(m)
  			  let msg = m.message.viewOnceMessageV2.message
		let type = Object.keys(msg)[0]
let teks = `「 *Anti ViewOnce Message* 」
      
🤠 *Name* : ${m.pushName}
👾 *User* : wa.me//${m.sender.split("@")[0]}
⏰ *Clock* : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB
      
💫 *MessageType* : ${type}`
   msg[type].caption = teks + `${msg[type].caption ? `\n\n💬 *Caption :*\n${msg[type].caption}` : ''}`
  await delay(500)
  m.copyNForward(m.chat, true, {
  readViewOnce: true,
    quoted: m
  })
			} catch (err) {
				console.log(err)
			}
}
