const { getBinaryNodeChildren } = require(`@adiwajshing/baileys`);

module.exports = {
  name: "add",
  alias: ["+", "tambah"],
  desc: "Mengganti foto profil grup",
  use: "<Mention or Number>",
  wait: true,
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  async run({ m, fdz }, { quoted }) {
    try {
      let users = m.mentions.length !== 0 ? m.mentions.slice(0, 2) : m.isQuoted ? [m.quoted.sender] : m.text.split(",").map(v => v.replace(/[^0-9]/g, ``) + "@s.whatsapp.net").slice(0, 2);
      if (users.length === 0) return m.reply(`Harap sebutkan pengguna yang ingin ditambahkan.`);

      await fdz.groupParticipantsUpdate(m.chat, users, "add").then(async (res) => {
        for (let i of res) {
          switch (i.status) {
            case `200`:
              m.reply(`_✔ SUCCESS: Number @${i.jid.split('@')[0]} added to group! ✔_`,{withTag:true});
              break;
            case `400`:
              m.reply(`_❌ ERROR: Invalid number! ${users} ❌_`,{withTag:true});
              break;
            case `403`:
              let node = getBinaryNodeChildren(i.content, "add_request");
              await m.reply(`Can't add @${i.jid.split(`@`)[0]}, send invitation...`,{withTag:true});
              let url = await fdz.profilePictureUrl(m.chat, "image").catch(_ => "https://example.com/default-image.jpg"); // Ganti URL gambar default sesuai kebutuhan
              await fdz.sendGroupV4Invite(
                i.jid,
                m.chat,
                node[0]?.attrs?.code || node.attrs.code,
                node[0]?.attrs?.expiration || node.attrs.expiration,
                m.metadata.subject,
                url,
                "Invitation to join my WhatsApp Group"
              );
              break;
            case `406`:
              m.reply(`_❌ ERROR: This number @${i.jid.split(`@`)[0]} is a business account and cannot be invited into the group! ❌_`,{withTag:true});
              break;
            case `408`:
              m.reply(`_❌ ERROR: Number @${i.jid.split('@')[0]} has left the group recently! ❌_`,{withTag:true});
              break;
            case `409`:
              m.reply(`_❌ ERROR: Number @${i.jid.split('@')[0]} already exists in the group! ❌_`,{withTag:true});
              break;
            case `500`:
              m.reply(`_❌ ERROR: Group is currently full! ❌_`);
              break;
            default:
              m.reply(i);
              break;
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
