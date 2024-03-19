
module.exports = {
  name: "setppbot",
  alias: ["gantippbot","ppbot"],
  desc: "Menganti photo profil bot",
  use: "<image file>",
  wait: true,
  isOwner: true,
  async run({ m, fdz }, { quoted }) {
    if (!quoted || !/image/.test(quoted.mime) || /webp/.test(quoted.mime)) {
      m.reply(`Kirim/Reply Image Dengan Caption ${m.command}`);
      return;
    }
    
    try {
      let media = await fdz.downloadMediaMessage(quoted);
      await fdz.setProfilePicture(fdz.user.jid, media, true)
        .then(() => m.reply('Success update profile picture bot'))
        .catch(m.reply);
    } catch (err) {
      console.log(err);
    }
  },
};
