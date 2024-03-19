

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



const cutAndUploadVideo = async (fdz, m, q = "", inputFilePath, sec) => {
  try {
    const ran = `${Math.floor(Math.random() * 10000)}`;
    // Buat direktori jika belum ada
    const outputDir = './tmp/output-upsw/';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // Pastikan direktori dan subdirektorinya ada
    }
    console.log("Memulai memotong durasi video");
    const command = `ffmpeg -hide_banner -err_detect ignore_err -i ${inputFilePath} -r 24 -codec:v libx264 -vsync 1 -codec:a aac -ac 2 -ar 48k -f segment -preset fast -segment_format mp4 -segment_time ${sec} -force_key_frames "expr:gte(t,n_forced*${sec})" ${path.join(outputDir, ran)}%d.mp4`;

    await exec(command);

    for (let i = 0; i <= 14; i++) {
      const filePath = path.join(outputDir, `${ran}${i}.mp4`);
      if (fs.existsSync(filePath)) {
        console.log('Video:', filePath);

        await fdz.sendMessage('status@broadcast', {
          video: { url: filePath },
          caption: q
        }, {
          statusJidList: db.data.bot.contacts.map(a => a.id)
        });
        setTimeout(() => {
          fs.unlinkSync(filePath);
        }, 1000);
        // Jeda sebentar sebelum mengunggah video berikutnya
        await sleep(20000); // Atur sesuai kebutuhan

        // Hentikan proses jika potongan video berikutnya tidak ditemukan
        if (!fs.existsSync(path.join(outputDir, `${ran}${i + 1}.mp4`))) {
          break;
        }
      }
    }
    m.reply('Success upload status menggunakan bot');

  } catch (error) {
    console.error('Error:', error);
  }
};


module.exports = {
  name: "upswvid",
  alias: ["swvid","vidsw"],
  desc: "Mengupload status video menggunakan bot",
  use: "<video file>",
  wait: true,
  isOwner: true,
  async run({ m, fdz }, { quoted, q }) {
    if (!quoted || !/video/.test(quoted.mime) || /webp/.test(quoted.mime)) {
      m.reply(`Kirim/Reply video Dengan Caption ${m.command}`);
      return;
    }
    
    try {
      if (quoted.msg.seconds > 30) {
        m.reply(`video harus 30 detik`)
        /*
      let media = await fdz.downloadMediaMessage(quoted,`./tmp/upswvid.mp4`);
        await cutAndUploadVideo(fdz,m,q ? '#UP STATUS DARI BOT\n'+q : '#UP STATUS DARI BOT',media,30)
        */
      } else {
      let media = await fdz.downloadMediaMessage(quoted);
      await fdz.sendMessage('status@broadcast', {
        video: media,
        caption: q ? '#UP STATUS DARI BOT\n'+q : '#UP STATUS DARI BOT'
      }, {
        statusJidList: db.data.bot.contacts.map(a => a.id)
      });
      m.reply('Success upload status menggunakan bot')
      }
    } catch (err) {
      console.log(err);
    }
  },
};
