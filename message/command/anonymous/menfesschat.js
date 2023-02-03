const util = require('util')

module.exports = {
  name: "menfesschat",
  alias: ["menfesschat","accmenfess","tolakmenfess"],
  category: "anonymous",
  desc: "Menfess chat",
  isPrivate: true,
  async run({msg,fdz,cmdName},{prefix,q}){
    fdz.menfess = fdz.menfess ? fdz.menfess : {}
    const desc = `*Menfess Bot*\n\n*Example :*\n ◦ ${prefix}menfesschat 628xxxxx`
    button = [
      { buttonId: `${prefix}accmenfess`, buttonText: { displayText: 'Terima' }, type: 1 },
      { buttonId: `${prefix}tolakmenfess`, buttonText: { displayText: 'Tolak'}, type: 1}
      ]
    find = Object.values(fdz.menfess).find(menpes => menpes.status == 'wait')
    roof = Object.values(fdz.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
    let id = msg.sender
    
    switch(cmdName){
      case 'menfesschat':
        if(roof) return msg.reply('Kamu masih berada dalam Obrolan!')
        if(!q) return msg.reply(desc);
        if(!q.startsWith('628')) return msg.reply(desc)
        text = q + "@s.whatsapp.net"
        if(text == msg.sender) return msg.reply('Kamu tidak bisa memakai nomor sendiri')
        txt = "*Menfess Chat*\n\n"
        txt += `_Hallo @${q}, Seseorang *( @${msg.sender.split("@")[0]} )* telah mengajakmu bermain chat menfess di bot ini_\n\n`
        txt += `*Balas pesan ini ( terima / tolak )*`
        msg.reply(`*^Done, silahkan tunggu @${q} menerima pesannya..*`)
        fdz.sendMessage(text, {text:txt,footer: "bot onichan",buttons: button,headerType: 1, mentions: [...txt.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')})
        fdz.menfess[id] = {
          id: id,
          a: msg.sender,
          b: text,
          status: "wait",
        }
        break;
       
      case 'accmenfess':
       if(!roof) return msg.reply("Kamu belum memulai menfess..")
       try {
        find.b = msg.sender
        find.status = 'chatting'
        fdz.menfess[find.id] = {...find}
        find = Object.values(fdz.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
        fdz.sendMessage(find.a,{text: `_@${msg.sender.split("@")[0]} menerima chat dengan anda, sekarang anda bisa chat lewat bot dengan dia.._\n\n*NOTE : Jika ingin berhenti dari menfess, silahkan ketik _.stopmenfess_ Untuk hapus session kalian..*`,mentions: [msg.sender]})
        await msg.reply("*^Done..*")
       } catch (e){
         await fdz.sendMessage("6287877173955@s.whatsapp.net", {
			text: util.format(e),
		})
       }
        break

      case 'tolakmenfess':
        if(!roof) return msg.reply("Kamu belum memulai menfess..")
        find = Object.values(fdz.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
        await fdz.sendMessage(find.a, {text: `_@${find.b.split("@")[0]} Menolak bermain menfess.._`,mentions: [find.b]})
        msg.reply("*^Done..*")
        delete fdz.menfess[find.id]
        return !0
        break
    }
  }
}