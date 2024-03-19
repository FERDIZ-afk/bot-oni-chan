module.exports = {
  alias: ["help"],
  async run({ m, fdz }, { q, args }) {
    const command = fitur_bot;
    const cmds = command.keys();
    const categories = {};

    // Membuat kategori dari perintah-perintah bot
    for (const cmd of cmds) {
      const info = command.get(cmd);
      if (info.category === "hidden" || info.type === "changelog") continue;

      const category = info.category || "No Category";
      if (!categories[category]) categories[category] = [];
      categories[category].push(info);
    }

    // Informasi bot dan daftar menu
    const botInfo = `
📚 Menggunakan Library : *Baileys-MD*.
🔍 Prefix : ( ${m.prefix} )
◪ *Jumlah Fitur Tersedia* ${Object.values([...command]).length} 📋
❏ 
`;

    // Mengecek jika ada query dengan format '--nama_perintah'
    if (q.startsWith("--")) {
      const queryCommand = q.toLowerCase().replace("--", "");
      const cmd = command.get(queryCommand) || [...command.values()].find((x) => x.alias.find((x) => x == queryCommand));

      if (!cmd) {
        await fdz.sendMessage(m.chat, { text: "Perintah yang diminta tidak ditemukan." }, { quoted: m });
        return;
      }

      const detailMessage = `
*❏ Nama Perintah:* ${cmd.name}
*❏ Alias:* ${cmd.alias.join(", ")}
*❏ Deskripsi:* ${cmd.desc || "-"}
*❏ Cara Penggunaan:* ${m.prefix}${cmd.name} ${cmd.use ? cmd.use.replace(">", " 」").replace("<", "「 ") : ""}
*❏ Kategori:* ${cmd.category || "No Category"}
*❏ Bisa Tanpa Prefix:* ${cmd.options.noPrefix ? "Ya" : "Tidak"}
*❏ Dinonaktifkan:* ${cmd.options.disable ? "Ya" : "Tidak"}
*❏ Milik Pemilik:* ${cmd.options.isOwner ? "Ya" : "Tidak"}
*❏ Hanya untuk Admin:* ${cmd.options.isAdmin ? "Ya" : "Tidak"}
*❏ Admin Bot:* ${cmd.options.isBotAdmin ? "Ya" : "Tidak"}
*❏ Hanya untuk Grup:* ${cmd.options.isGroup ? "Ya" : "Tidak"}
  `;

      await fdz.sendMessage(m.chat, { text: detailMessage }, { quoted: m });
      return;
    }

    // Membuat daftar kategori dan perintah-perintah dalam kategori
    const formattedCategories = Object.keys(categories)
      .map(category => {
        const commandsInCategory = categories[category]
          .map((cmd, index) =>
            `*-* *${cmd.options.noPrefix ? "" : `${m.prefix}`}${cmd.name}* ${
              cmd.use ? cmd.use.replace(">", " 」").replace("<", "「 ") : ""
            }`
          )
          .join("\n");
        return `*❏ ${category.toUpperCase()}* \n${commandsInCategory}\n\n`;
      })
      .join("");

    // Pesan bantuan yang lengkap
    const helpMessage = `${botInfo}${formattedCategories}🖼️ *Kirim* *${m.prefix}help --sticker* untuk melihat detail dan contoh penggunaan`;

    // Mengirim pesan bantuan
    await fdz.sendMessage(m.chat, { text: helpMessage }, {
      quoted: m,
    });
  },
};
