const readCommand = async (receive) => {
		const { chat, from, isOwner, isGroupAdmin, command, prefix, args, isButtonResponseMessage, isTemplateButtonReplyMessage } = receive;
		const dir = readdirSync(path.join(__dirname, '../lib/command'));
		// Print log in terminal
		bot.printLog(receive);
		// Reading Button Response
		await buttonResponse(receive);
		// 
		if (isButtonResponseMessage) return;
		const arrayCommand = [];
		dir.forEach((value, i) => {
			// Command Category
			const cmd_category = readdirSync(path.join(__dirname, '../lib/command', value));
			cmd_category.forEach((value1, i) => {
				// Command Result
				const cmd_result = require(path.join(__dirname, '../lib/command', value, value1));
				if (cmd_result.command === undefined) return;
				// Command result per file
				cmd_result.command.forEach(async (v, i) => {
					// Filter command 
					arrayCommand.push(v);
					if (v === command) {
						if (cmd_result.isOwner && !isOwner) return bot.sock.sendMessage(from, { 'text': 'Khusus Owner gan' }, { quoted: chat })
						if (cmd_result.isGroupAdmin && !isGroupAdmin && !isOwner) return bot.sock.sendMessage(from, { 'text': 'Khusus Admin Group gan' }, { quoted: chat })
						await cmd_result.execute(receive, bot.sock);
						// Command help
					} else if (!isTemplateButtonReplyMessage && command === 'help' && args[0] === v) {
						await bot.sock.sendMessage(from, { text: String(cmd_result.description).replaceAll('prefix.', prefix) });
					}
				})
			})
		})
		if (command === null || args.length != 0) return;
		if (['help', 'menu', 'tos', 'donasi', 'groupbot'].some(v => v === command)) return await menu_help(receive);

		const unknownCmd = arrayCommand.some((v) => v === command);
		if (!unknownCmd) return await reply(from, 'Command tidak ada', chat);
	}