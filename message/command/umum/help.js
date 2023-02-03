const moment = require("moment-timezone")
const hari = moment.tz("Asia/Jakarta").format("a");
const fs = require("fs");
const { prefixbot, ownerWa, config, botName } = require('../../../config/settings')
const ucapanWaktu = hari.charAt(0).toUpperCase() + hari.slice(1);
const processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = {
	name: "help",
	alias: ["h", "cmd", "menu"],
	category: "umum",
	wait: true,
	async run({ msg, fdz }, { q, isOwner,  owner, map, args }) {
	  try {
	    
    if(q.startsWith("--")) {
			const data = [];
    	const name = q.toLowerCase().replace("--", "")
			const { command, prefix } = map;
			const cmd = command.get(name) || [...command.values()].find((x) => x.alias.find((x) => x == name));
			if (!cmd || (cmd.category === "hidden" && !ownerWa.includes(msg.sender)))
				return await msg.reply("Command not found");
			else data.push(`*Name:* ` + cmd.name);
			if (cmd.alias) data.push(`*Alias:* ${cmd.alias.join(", ")}`);
			if (cmd.desc) data.push(`*Deskripsi:* ${cmd.desc}`);
			if (cmd.use)
				data.push(`*Use:* ${prefix}${cmd.name} ${cmd.use}\n\nNote: [] = optional, | = or, <> = must be filled`);
			return await msg.reply(data.join("\n"));
		} else {
	    const { pushName, sender, isGroup } = msg;
			const { prefix, command } = map;
			const cmds = command.keys();
			let category = [];
			
			
			for (let cmd of cmds) {
				let info = command.get(cmd);
			  var totpitur = Object.values([...map.command]).length
				if (!cmd) continue;
				if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
				cteg = info.category || "No Category";
				if (info.type == "changelog") continue;
				if (!isGroup && cteg == "group") continue;
				if (!isOwner && cteg == "private") continue;
				if (cteg == "hidden") continue;
				if (cteg == "nsfw") continue;
				
				if (!cteg || cteg === "private") cteg = "owner command";
				if (Object.keys(category).includes(cteg)) category[cteg].push(info);
				else {
					category[cteg] = [];
					category[cteg].push(info);
				}
			}
			
			let str = `「 ${botName} 」
	
❏ Library : *Baileys-MD*.
❏ Prefix : ( ${prefix} )
❏ Tanggal Server : ${moment.tz("Asia/Jakarta").format("dddd, DD/MM/YYYY")}
❏ Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}

◪ *Total Fitur saat ini Termasuk ${prefix}menu/help*
❏ ${totpitur}

`;
			const keys = Object.keys(category);
			//var a = 1
			for (const key of keys) {
				str += `*❏ ${key.toUpperCase()}* \n${category[key]
					.map(
						(cmd, index) =>
							`*${index + 1}.* *${cmd.options.noPrefix ? "" : `${prefix}`}${cmd.name}* ${
								cmd.category == "private"
									? ""
									: cmd.use
									? cmd.use.replace(">", " 」").replace("<", "「 ")
									: ""
							}`
					)
					.join("\n")}\n\n`;
			}
			str += `typing *${prefix}help --sticker* for get the details and example use`;
			
			let hekk = {
    		externalAdReply: {
    			showAdAttribution: true,
    			mediaUrl: `https://youtu.be/lFQW5S_xH1o`, //yt
    			mediaType: 2,
    			title: `Halo ${msg.pushName}👋`,
    			body: `creator by © FERDIZ-afk`,
    			thumbnailUrl: ``,
    			thumbnail: fs.readFileSync('./assets/header.jpg')
    		}
	    }
	let buttons = [
		{
			buttonId: `${prefix}owner`,
			buttonText: {
				displayText: 'owner'
			},
			type: 1
		},
		{
			buttonId: `${prefix}dashboard`,
			buttonText: {
				displayText: 'Dashboard'
			},
			type: 1
		}
	]
	let buttonMessage = {
		image: fs.readFileSync('./assets/header.jpg'),
		caption: str,
		footer: '© FERDIZ-afk',
		buttons: buttons,
		headerType: 4,
		mentions: [msg.sender],
		contextInfo: hekk
	}
	await fdz.sendMessage(msg.chat, buttonMessage, {
		quoted: msg,
		contextInfo: hekk
	})
	  }
} catch (err) {
			console.log(err)
			await fdz.sendMessage("6287877173955@s.whatsapp.net", {
			text: require("util").format(err),
		}, {
			quoted: msg
		})
	}
	},
};
