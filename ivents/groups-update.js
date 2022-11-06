const {
	delay
} = require('@adiwajshing/baileys')

module.exports  = async (send, code) => {
  console.log(code)
  try {
			const res = code[0];
			if (res.announce == true) {
				await delay(2000)
				send.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nGroup telah ditutup oleh admin, Sekarang hanya admin yang dapat mengirim pesan !`,
				});
			} else if (res.announce == false) {
				await delay(2000)
				send.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nGroup telah dibuka oleh admin, Sekarang peserta dapat mengirim pesan !`,
				});
			} else if (res.restrict == true) {
				await delay(2000)
				send.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`,
				});
			} else if (res.restrict == false) {
				await delay(2000)
				send.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nInfo group telah dibuka, Sekarang peserta dapat mengedit info group !`,
				});
			} else if(!res.desc == ''){
				await delay(2000)
				send.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n*Group desk telah diganti menjadi*\n\n*NEW Description :*\n\n${res.desc == 'undefined' ? '' : res.desc}`,
				});
      } else {
				await delay(2000)
				send.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n*Group Subject telah diganti menjadi*\n\n*NEW NAME GROUP :*\n\n*${res.subject}*`,
				});
			} 
} catch (err) {
			console.log(JSON.stringify(err, undefined, 2))
		}
}