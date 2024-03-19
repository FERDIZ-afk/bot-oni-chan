module.exports = {
  name: "upswtext",
  alias: ["swtext",
    "textsw"],
  desc: "Mengupload status text menggunakan bot",
  use: "<text>",
  wait: true,
  isOwner: true,
  async run({
    m, fdz
  }, {
    quoted, q
  }) {
    try {
      await fdz.sendMessage('status@broadcast', {
        text: q ? '#UP STATUS DARI BOT\n'+q: '# TES UP STATUS DARI BOT' //is link preview compatible
      }, {
        backgroundColor: '#315575',
        font: 3,
        statusJidList: db.data.bot.contacts.map(a => a.id)
      });
      m.reply('Success upload status menggunakan bot')
    } catch (err) {
      console.log(err);
    }
  },
};