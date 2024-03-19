module.exports = {
  name: "upswmp3",
  alias: ["swvn",
    "upswvn",
    "vnsw"],
  desc: "Mengupload status audio menggunakan bot",
  use: "<image file>",
  wait: true,
  isOwner: true,
  async run({
    m, fdz
  }, {
    quoted, q
  }) {
    if (!quoted || !/audio/.test(quoted.mime) || /webp/.test(quoted.mime)) {
      m.reply(`Kirim/Reply audio Dengan Caption ${m.command}`);
      return;
    }

    try {
      let media = await fdz.downloadMediaMessage(quoted);
      await fdz.sendMessage('status@broadcast', {
        audio: media,
        mimetype: 'audio/mp4',
        ptt: 'true'
      }, {
        backgroundColor: '#315575',
        statusJidList: db.data.bot.contacts.map(a => a.id)
      });
      m.reply('Success upload audio menggunakan bot')
    } catch (err) {
      console.log(err);
    }
  },
};