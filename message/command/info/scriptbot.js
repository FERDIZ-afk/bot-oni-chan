const fs = require("fs")

module.exports = {
	name: "scriptbot",
	alias: ["script", "sc", "scbot"],
	category: "info",
	async run({ msg, fdz }, { q, map, args, prefix }) {
		
		                let btn = [{
    urlButton: {
      displayText: "Buka",
      url:"https://github.com/FERDIZ-afk/bot-oni-chan"
    }
  },{
                                quickReplyButton: {
                                    displayText: 'Status Bot',
                                    id: `info`
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Contact Owner',
                                    id: `${prefix}owner`
                                }  
                            }]
                      await fdz.sendMessage(msg.chat, {
								caption: `Script Bot Is here\ndon't forget fork + star XD`,
								image: fs.readFileSync('./assets/header.jpg'),
								templateButtons: btn,
								footer: `FERDIZ-afk`
							})
							
		
	},
};
