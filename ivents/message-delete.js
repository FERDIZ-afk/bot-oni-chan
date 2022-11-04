//




module.exports = async (m) => {
  //	 console.log(m)
		if (!m) m = false;
		/*
		let data2 = db.cekDatabase("antidelete", "id", m.remoteJid || "");
		if (data2 == "empty data") return;
		*/
		const isGroup = m.remoteJid.endsWith('@g.us')
		if(!isGroup) return 
	try {
	  
	  			//		  let andel = await btgroup.findOne({ jid: m.remoteJid })
		//	  if (andel) {
			    //			     let mode = andel.antidelete || "false"

			//			if (mode == "true") {
			    
		const dataChat = global.dbchatpesan//JSON.parse(fs.readFileSync("./database/mess.json"));
		let mess = dataChat.find((a) => a.id == m.id);
	//	console.log(mess)
		
		let mek = mess.msg;
		let participant = mek.key.remoteJid.endsWith("@g.us") ? mek.key.participant : mek.key.remoteJid;
		let froms = mek.key.remoteJid;
		const moment = require('moment-timezone')
		await fdz.sendMessage(
			froms,
			{
				text:`「 *Anti delete Message* 」
    
    🤠 *Name* : ${mek.pushName}
    👾 *User* : @${mek.sender.split("@")[0]}
    ⏰ *Clock* : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB
    💫 *MessageType* : ${mek.mtype}
    `,
				mentions: [participant],
			},
			{ quoted: mek }
		);
		
		await fdz.copyNForward(froms, mek, true);
									await delay(4000)
		let messek = dataChat.find((a) => a.id == m.id);
//console.log(messek)
//tes.splice(mess, 1);

for (let [i, te] of dataChat.entries()) {
  if (te.id === m.id) {
    dataChat.splice(i, 1); // Tim is now removed from "users"
    console.log("[ PROSES DELETE PESAN DI DB ]")
  }
}
		
//			  }
//	}
	} catch (err) {
		//	console.log(JSON.stringify(err, undefined, 2))
		}
  
  
}