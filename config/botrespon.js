const moment = require("moment-timezone");
const fs = require("fs");
const speed = require('performance-now')
const checkDiskSpace = require('check-disk-space').default
var process = require('process')
const os = require('os');
const { ownerWa } = require('./settings')
//const { ExpiredTime, getTotalReq, getTodayReq, getVisitor, getTotalUser, addRequest, addVisitor, addUtil } = require('../database/premium');


moment.tz.setDefault("Asia/Jakarta").locale("id");
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const titik3 = "```"
//${pushname !== undefined ? pushname : 'Kak'}*_
const d = new Date
const gmt = new Date(0).getTime() - new Date('1 Januari 2022').getTime()
const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
//console.log(weton)

			var date = new Date();
        var tahun = date.getFullYear();
        var bulan1 = date.getMonth();
        var tanggal = date.getDate();
        var hari = date.getDay();
        var jam = date.getHours().toString().padStart(2, 0);
        var menit = date.getMinutes().toString().padStart(2, 0);
        var detik = date.getSeconds().toString().padStart(2, 0);
        var waktoo = date.getHours();
            switch(hari) {
                case 0: hari = "Minggu"; break;
                case 1: hari = "Senin"; break;
                case 2: hari = "Selasa"; break;
                case 3: hari = "Rabu"; break;
                case 4: hari = "Kamis"; break;
                case 5: hari = "Jum`at"; break;
                case 6: hari = "Sabtu"; break;
            }
            switch(bulan1) {
                case 0: bulan1 = "Januari"; break;
                case 1: bulan1 = "Februari"; break;
                case 2: bulan1 = "Maret"; break;
                case 3: bulan1 = "April"; break;
                case 4: bulan1 = "Mei"; break;
                case 5: bulan1 = "Juni"; break;
                case 6: bulan1 = "Juli"; break;
                case 7: bulan1 = "Agustus"; break;
                case 8: bulan1 = "September"; break;
                case 9: bulan1 = "Oktober"; break;
                case 10: bulan1 = "November"; break;
                case 11: bulan1 = "Desember"; break;
            }
            var tampilTanggal = "" + hari + ", " + tanggal + " " + bulan1 + " " + tahun;
            var tampilWaktu = "" + jam + ":" + menit + ":" + detik ;
	    var ampm = jam >= 12 ? 'PM' : 'AM';





//console.log("" + hari + ", " + weton + ": Tanggal " + tanggal + " " + bulan1 + " " + tahun)
//console.log(tampilWaktu + " : " + ampm)




//${titik3} × ${prefix}igstalk <NEW ADD>${titik3}


function kyun(seconds) {
function pad(s) {
return (s < 10 ? '0' : '') + s
}
var hours = Math.floor(seconds / (60 * 60))
var minutes = Math.floor(seconds % (60 * 60) / 60)
var seconds = Math.floor(seconds % 60)
return `${pad(hours)} H ${pad(minutes)} M ${pad(seconds)} S`
}




exports.infobot = async (fdz, sender, prefix, pushname) => {
  
var process = require('process') 
let timestampi = speed();
let latensii = speed() - timestampi
anu = process.uptime()
var blocked = await fdz.fetchBlocklist()

let getGroups = await fdz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let gc = groups.map(v => v.id)
  /*
var groups = fdz.chats.array.filter(v => v.jid.endsWith('g.us'))
var privat = fdz.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
totalChat = await fdz.chats.all()
var total = math(`${groups.length}*${privat.length}`)



  *+*  Private Chats : ${privat.length}
  *+*  Total Chats : ${totalChat.length}
  
  
*/
sisaram = `${Math.round(os.freemem / 1024 / 1024)}`
totalram = `${Math.round(os.totalmem / 1024 / 1024)}`

persenram = sisaram/totalram*100
persenramm = 100-persenram
ramused = totalram-sisaram

space = await checkDiskSpace(process.cwd())
console.log(space)
freespace = `${Math.round(space.free / 1024 / 1024)}`
console.log(freespace)
totalspace = `${Math.round(space.size / 1024 / 1024)}`
console.log(totalspace)
diskused = totalspace-freespace
console.log(diskused)
persendisk = diskused/totalspace*100

let userwebTotal = '' //await getTotalUser()
  
var inpone = ` 🤖 _Bot Stats_
  *+*  ${titik3} ❏ Library : Baileys-MD${titik3}
  *+*  ${titik3} ❏ Database : MONGODB${titik3}
  *+*  ${titik3} ❏ Language : Javascript${titik3}
  *+*  ${titik3} ❏ Prefix : [ ${prefix} ]${titik3}
  *+*  Number bot : wa.me//${fdz.user.jid.split('@')[0]}
  *+*  Owner bot : wa.me//${ownerWa[0].split('@')[0]}
  *+*  Group Chats : ${gc.length}
  *+*  Total block : ${blocked.length}
  
📱 _Phone Stats_
  *+*  Wa Version : 2.22.16.75
  *+*  Android Version : 9
  *+*  Device Model : RMX1941
  *+*  Device Name : REALME C2

🖥️ _server bot_
  *+*  Speed : ${latensii.toFixed(4)} Second
  *+*  Runtime : ${kyun(anu)}
  *+*  Platform : ${os.platform()}
  *+*  Hostname : ${os.hostname()}

  *+*  OS version: ${os.version()}
  *+*  NODEJS version: ${process.version}
  *+*  RAM NODEJS: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
  *+*  Ram terpakai : ${ramused} MB (${persenramm.toString().split('.')[0]}%)
  *+*  Sisa Ram : ${sisaram} MB
  *+*  Total Ram : ${totalram} MB
  *+*  *Disk terpakai:* ${diskused} MB (${persendisk.toString().split('.')[0]}%)
  *+*  *Disk tersedia:* ${freespace} MB
  *+*  *Total disk:* ${totalspace} MB
  *+*  Lokasi SC : ${process.cwd()}
  
  
  `

  
return inpone
}
