const util = require('util')
		const FormatToIndonesian = function (number){
    number = number.replace(/\D/g, '');
    if (number.startsWith('62')){
        number = '0' + number.substring(2);
    }
    return number;
    };

    const FormatToWhatsappJid = function (number){
    number = number.replace(/\D/g, '');
    if (number.startsWith('+')){
        number = number.substring(1);
    }
    if (number.startsWith('08')){
        number = '62' + number.substring(1);
    }
    if (!number.endsWith('@s.whatsapp.net')){
        number = number + '@s.whatsapp.net';
    }
    return number;
    };
    
module.exports = {
	name: "demote",
	use: "<number>",
	category: "group",
	desc: "demote members in group",
	wait: true,
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, fdz }, { q, prefix }) {
	  try{
		add = q ? q : msg.quoted ? msg.quoted : false;
		if (!add) return msg.reply("Example: " + prefix + "demote 62728288");
		q = msg.quoted ? msg.quoted.sender.split("@")[0] : q;
		let prk = q.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
		let chunk = [];
		for (let i of prk) {
		  const jid = FormatToWhatsappJid(i);
			i == " " ? "" : chunk.push(jid);
		}
		let participant = await fdz.groupParticipantsUpdate(msg.chat, chunk, "demote").then((res) => msg.reply(util.format(res))).catch((err) => msg.reply(util.format(err)))
	  } catch (err) {
	}
		
	}
	};