module.exports = {
  name: "read",
  alias: ["readvo",
    "voread",
    "rvo",
    "readviewonce"],
  //  desc: "Menganti photo profil bot",
  use: "<reply msg viewonce>",
  wait: true,
  // isOwner: true,
  async run({
    m, fdz
  }, {
    quoted
  }) {

    try {
      if (!quoted.msg.viewOnce) return m.reply(`Reply view once with command ${m.command}`)
      /*  quoted.msg.viewOnce = false
    await fdz.sendMessage(m.chat, {
      forward: quoted
    }, {
      quoted: m
    })
*/
      quoted.copyNForward(m.chat, true, {
        readViewOnce: true,
        quoted: m
      })
    } catch (err) {
      console.log(err);
    }
  },
};