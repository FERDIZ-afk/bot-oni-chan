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
	name: "add",
	use: "<number>",
	category: "group",
	desc: "add members to group",
	wait: true,
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, fdz }, { q, prefix }) {
		add = q ? q : msg.quoted ? msg.quoted : false;
		if (!add) return msg.reply("Example: " + prefix + "add 62728288");
		q = msg.quoted ? msg.quoted.sender.split("@")[0] : q;
		let prk = q.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
		let chunk = [];
		for (let i of prk) {
		  const jid = FormatToWhatsappJid(i);
			i == " " ? "" : chunk.push(jid);
		}
		let participant = await fdz.groupParticipantsUpdate(msg.chat, chunk, "add");
		await require("delay")(5000);
		const cek = await fdz.groupMetadata(msg.chat);
		if (global.statParticipant == true) {
			global.statParticipant = false;
			return;
		}
		for (let respon of participant) {
			get_status = respon.status;
	if (get_status == 400) {
		msg.reply('_❌ ERROR: Invalid number! ❌_');
	}
	
	if (get_status == 403) {
		msg.reply('_❌ ERROR: Number has privacy on adding group! ❌_');
		const code = await fdz.groupInviteCode(msg.chat);
		await msg.reply(" The number @" + respon.jid.split("@")[0] + " you added is private, inviting the user...");
		await fdz.sendMessage(respon.jid, {
				text: `Buka tautan ini untuk bergabung ke grup WhatsApp saya: \nhttps://chat.whatsapp.com/${code}`,
		})
	}
	if (get_status == 408) {
		msg.reply('_❌ ERROR: Number has left the group recently! ❌_');
	}
	if (get_status == 409) {
		msg.reply('_❌ ERROR: Number is already exists! ❌_');
	}
	if (get_status == 500) {
		msg.reply('_❌ ERROR: Group is currently full! ❌_');
	}
	if (get_status == 200) {
		msg.reply('_✔ SUCCESS: Number added to group! ✔_');
	}
	}
		
		
	}
	};