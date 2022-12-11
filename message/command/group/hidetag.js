module.exports = {
	name: "hidetag",
	alias: ["ht","hdt","texttag"],
	category: "group",
	isAdmin: true,
	isGroup: true,
	desc: "Buat ngasih informasi / bikin 1 gc kesel :v",
	use: "<text>",
	async run({ msg, fdz }, { q }) {
		const gc = await fdz.groupMetadata(msg.chat);
		const mem = gc.participants;
		fdz.sendMessage(msg.chat, { text: q ? q : '', mentions: mem.map((a) => a.id) });
	},
};
