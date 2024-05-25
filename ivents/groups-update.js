/**
 * Create By FERDIZ -AFK 
 * Contact Me on wa.me/6287877173955
 * Follow https://github.com/FERDIZ-afk
 */
const { delay } = require('@adiwajshing/baileys');

module.exports = async (send, code) => {
  console.log(code);
  try {
    const res = code[0];
    const authorMention = `*@${res.author.split('@')[0]}*`;

    await delay(2000);

    let message = '「 Group Settings Change 」\n\n';

    if (res.announce) {
      message += res.announce 
        ? `Group telah ditutup oleh\n${authorMention}\nSekarang hanya admin yang dapat mengirim pesan !`
        : `Group telah dibuka oleh\n${authorMention}\nSekarang peserta dapat mengirim pesan !`;
    } else if (res.restrict) {
      message += res.restrict 
        ? `Info group telah dibatasi oleh\n${authorMention}\nSekarang hanya admin yang dapat mengedit info group !`
        : `Info group telah dibuka oleh\n${authorMention}\nSekarang peserta dapat mengedit info group !`;
    } else if (!res.desc == '') {
      message += `Group desk telah diganti oleh\n${authorMention}\nmenjadi\n\n*NEW Description :*\n\n${res.desc === 'undefined' ? '' : res.desc}`;
    } else if (!res.inviteCode == '') {
      message += `${authorMention}\ntelah mereset link invite group menjadi\n\n*NEW invite link Code :*\n\n${res.inviteCode === 'undefined' ? '' : "https://chat.whatsapp.com/" + res.inviteCode}`;
    } else if (!res.subject == '') {
      message += `Group Name telah diganti oleh\n${authorMention}\nmenjadi\n\n*NEW NAME GROUP :*\n\n*${res.subject}*`;
    } else {
      message = `*ADMIN*\n${authorMention}\ntelah ${res.imgurl === 'changed' ? 'mengganti' : 'menghapus'} Foto profil group.`;
    }

    await send.sendMessage(res.id, { text: message, mentions: [res.author] });
  } catch (err) {
    console.log(err);
  }
};






