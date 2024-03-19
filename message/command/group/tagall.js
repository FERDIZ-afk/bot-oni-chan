module.exports = {
  name: "tagall",
  desc: "Tag All member group",
  wait: true,
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  async run({
    m, fdz
  }, {
    quoted
  }) {
    try {
      let tag = `_*TAG ALL*_\n`
      if (text) tag += `${m.text}\n`
      for (let i of m.metadata.participants.participants.map(mp => mp.id)) {
        tag += `\n${shp} @${i.split('@')[0]}`
      }
      m.reply(tag, {
        withTag: true
      })

    } catch (err) {
      console.log(err);
    }
  },
};