module.exports = {
  name: "upsw",
  alias: ["swtext", "textsw"],
  desc: "Mengupload status text menggunakan bot",
  use: "<text>",
  wait: true,
  isOwner: true,
  async run({ m, fdz }, { quoted, q }) {
    try {
      const statusJidList = db.data.bot.contacts.map(a => a.id);
      const statusText = q ? '#UP STATUS DARI BOT\n' + q : '# TES UP STATUS DARI BOT';
      let colors = ['#7ACAA7', '#6E257E', '#5796FF', '#7E90A4', '#736769', '#57C9FF', '#25C3DC', '#FF7B6C', '#55C265', '#FF898B', '#8C6991', '#C69FCC', '#B8B226', '#EFB32F', '#AD8774', '#792139', '#C1A03F', '#8FA842', '#A52C71', '#8394CA', '#243640'];
      let fonts = [0, 1, 2, 6, 7, 8, 9, 10];

      if (!quoted.isMedia) {
     //   let text = m.text || m.quoted?.body || '';
  //      if (!text) throw 'Mana text?';

        await fdz.sendMessage(
          'status@broadcast',
          { text:statusText },
          {
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            textArgb: 0xffffffff,
            font: fonts[Math.floor(Math.random() * fonts.length)],
            statusJidList,
          }
        );

        await m.reply(`Up status ke: ${statusJidList.length} Kontak`);
      } else if (/audio/.test(quoted.type)) {
        await fdz.sendMessage(
          'status@broadcast',
          {
            audio: await quoted.download(),
            mimetype: 'audio/mp4',
            ptt: true,
            waveform: [100, 0, 100, 0, 100, 0, 100],
          },
          { backgroundColor: colors[Math.floor(Math.random() * colors.length)], statusJidList }
        );

        await m.reply(`Up status ke: ${statusJidList.length} Kontak`);
      } else {
        let type = /image/.test(quoted.type) ? 'image' : /video/.test(quoted.type) ? 'video' : false;
        if (!type) throw 'Type tidak didukung';

        await fdz.sendMessage(
          'status@broadcast',
          {
            [type]: await quoted.download(),
            caption: statusText,
          },
          { statusJidList }
        );

        await m.reply(`Up status ke: ${statusJidList.length} Kontak`);
      }

    } catch (err) {
      console.log(err);
    }
  },
};
