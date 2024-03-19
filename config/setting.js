/**
* Create By FERDIZ -AFK
* Contact Me on wa.me/6287877173955
* Follow https://github.com/FERDIZ-afk
*/

module.exports = {
  options: {
    public: true,
    antiCall: true,
    // reject call
    database_bot: "database.json",
    //👆 End .json when using JSON database or use Mongo URI
    owner: ["6287752825741","6283861007177"],
    // set owner number on here
    sessionName: "session",
    // for name session
    prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i,
   // pairingNumber: "6287752825741" // Example Input : 62xxx
   // masih error kalau ada yang tau cara fix nya pull aja ke repository gwe
  }
}

global.mess = {
		wait: "Tunggu sebentar, permintaan anda sedang diproses...",
		owner: "Perintah ini hanya untuk owner!",
		admin: "Perintah ini hanya untuk admin group!",
		botadmin: "Bot harus menjadi admin group untuk melakukan perintah ini!",
		group: "Perintah ini hanya dapat dilakukan didalam grup!",
		private: "Perintah ini hanya dapat dilakukan didalam Private Chat",
		error: "Command error, silahkan coba beberapa saat lagi...",
		errorlink: "Mohon masukkan link yang benar",
		limit: "Limit anda sudah habis, silahkan gunakan fitur ini esok hari"
}