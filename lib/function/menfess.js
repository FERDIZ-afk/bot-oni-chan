module.exports = async function (msg,fdz,prefix,body){
  try {
    fdz.menfess = fdz.menfess ? fdz.menfess : {}
    const find = Object.values(fdz.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender) && menpes.status == 'chatting')
        if(msg.isGroup) return
        if(find == undefined) return
        if(body == `${prefix}stopmenfess`) return
        const to = find.a == msg.sender ? find.b : find.a
        fdz.copyNForward(to, msg, true)
  } catch (e){
         await fdz.sendMessage("6287877173955@s.whatsapp.net", {
			text: util.format(e),
		})
       }
}
