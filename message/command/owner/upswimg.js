
module.exports = {
  name: "upswimg",
  alias: ["swimg","imgsw"],
  desc: "Mengupload status image menggunakan bot",
  use: "<image file>",
  wait: true,
  isOwner: true,
  async run({ m, fdz }, { quoted, q }) {
    if (!quoted || !/image/.test(quoted.mime) || /webp/.test(quoted.mime)) {
      m.reply(`Kirim/Reply Image Dengan Caption ${m.command}`);
      return;
    }
    
    try {
      let media = await fdz.downloadMediaMessage(quoted);
      await fdz.sendMessage('status@broadcast', {
        image: media,
        caption: q ? '#UP STATUS DARI BOT\n'+q : '#UP STATUS DARI BOT'
      }, {
        statusJidList: db.data.bot.contacts.map(a => a.id)
      });
      m.reply('Success upload status menggunakan bot')
    } catch (err) {
      console.log(err);
    }
  },
};
