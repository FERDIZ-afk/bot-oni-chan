module.exports = {
  name: "linkgc",
  alias: ['linkgroup', 'linkgc', 'linkgrup'],
  desc: "Untuk mengambil link grup",
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  async run({ m, fdz }) {
    try {
      const code = await fdz.groupInviteCode(m.chat);
      const groupLink = `https://chat.whatsapp.com/${code}`;
      await m.reply(`Link Group: ${groupLink}`);
    } catch (err) {
      await m.reply('Terjadi masalah di server, silakan laporkan ke pemilik bot.');
      console.log(err);
    }
  },
};
