module.exports = {
  name: "setppgc",
  alias: ["gantippgc", "ppgc"],
  desc: "Mengganti foto profil grup",
  use: "<file gambar>",
  wait: true,
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  async run({ m, fdz }, { quoted }) {
    try {
      if (/full/i.test(m.text)) {
        if (!quoted || !/image/.test(quoted.mime) || /webp/.test(quoted.mime)) {
          m.reply(`Kirim/Reply Gambar Dengan Caption ${m.command}`);
          return;
        }

        const media = await fdz.downloadMediaMessage(quoted);
        await fdz.updateProfilePicture(m.chat, media, true)
          .then(() => m.reply('Berhasil mengubah foto profil grup'))
          .catch((err) => console.log(err));
      } else if (/(de(l)?(ete)?|remove)/i.test(m.text)) {
        await fdz.removeProfilePicture(m.chat)
          .then(() => m.reply('Berhasil menghapus foto profil grup'))
          .catch((err) => console.log(err));
      } else {
        if (!quoted || !/image/.test(quoted.mime) || /webp/.test(quoted.mime)) {
          m.reply(`Kirim/Reply Gambar Dengan Caption ${m.command}`);
          return;
        }

        const media = await fdz.downloadMediaMessage(quoted);
        await fdz.updateProfilePicture(m.chat, media)
          .then(() => m.reply('Berhasil mengubah foto profil grup'))
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  },
};
