const util = require('util')

module.exports = {
  name: "stopmenfess",
  alias: ["stopmenfess","menfessstop"],
  category: "anonymous",
  desc: "Menfess chat",
  isPrivate: true,
  async run({msg,fdz}){
    try{
    fdz.menfess = fdz.menfess ? fdz.menfess : {}
    find = Object.values(fdz.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
    if(!find) return msg.reply("Kamu belum memulai menfess..")
    const to = find.a == msg.sender ? find.b : find.a
    fdz.sendMessage(to, {text: "_Partner meninggalkan Obrolan.._"})
    await msg.reply("*^Done..*")
    delete fdz.menfess[find.id]
    return !0
  } catch (e){
  }
  }
}
