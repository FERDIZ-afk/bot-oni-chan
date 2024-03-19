'use strict'
//////////////////////////
const fs = require("fs")
global.config = require('./config/setting')

var low;
try {
  low = require('lowdb')
} catch (e) {
  low = require('./src/lib/lowdb')
}

const {
  Low,
  JSONFile
} = low
const _ = require('lodash');
const mongoDB = require('./src/lib/mongoDB');
const cloudDBAdapter = require('./src/lib/cloudDBAdapter');
const inputanDb = config.options.database_bot

const createDBInstance = () => {
  return new Low(
    /https?:\/\//.test(inputanDb || '') ?
    new cloudDBAdapter(inputanDb) : /mongodb/.test(inputanDb) ?
    new mongoDB(inputanDb) :
    new JSONFile(inputanDb)
  );
};

global.db = createDBInstance();
global.DATABASE = global.db; // Backwards Compatibility

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(function() {
      (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null);
    }, 1 * 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    "bot": {
      "contacts": [],
    },
    "users": {
      "contacts": {},
    },
    "group": {
      "antilink": [],
      "antiviewonce": [],
      "antidelete": [],
    },
    "donate": {
      "saweria": []
    },
    "menfess": {},
    ...(global.db.data || {})
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();

if (global.db) {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write();
    }
  }, 30 * 1000);
}

/////////////////////////

function parseOptions(optionsArgs = {}, args = {}) {
  let options = {};
  let entries = Object.entries(optionsArgs);
  for (let i = 0; i < Object.keys(optionsArgs).length; i++) {
    let [key, val] = entries[i];
    options[key] = or(args[key], val);
  }
  return options;

  function or() {
    for (let arg of arguments) {
      if (arg) return arg;
    }
    return arguments[arguments.length - 1];
  }
}

const ReadFitur = () => {
  global.fitur_bot = new Map();
  let pathdir = "./message/command";
  let fitur = fs.readdirSync(pathdir);
  console.log("Loading commands..");

  fitur.forEach(async (res) => {
		const commands = fs.readdirSync(`${pathdir}/${res}`).filter((file) => file.endsWith(".js"));
		try {
		for (let file of commands) {
			const command = require(`${pathdir}/${res}/${file}`);
			if (typeof command.run != "function") continue;
			const cmdOptions = {
				name: file.replace(".js",''),
				alias: [],
				desc: "",
				use: "",
				type: "", // default: changelog
				category: typeof command.category == "undefined" ? res.toLowerCase() : "",
				wait: false,
				isOwner: false,
				isAdmin: false,
				isGroup: false,
				isBotAdmin: false,
				noPrefix: false,
				isMedia: {
				  /*
					isQVideo: false,
					isQAudio: false,
					isQImage: false,
					isQSticker: false,
					isQDocument: false,
					*/
				},
				disable: false,
				run: () => {},
			};
			let cmd = parseOptions(cmdOptions, command);
			let options = {};
			for (var k in cmd)
				typeof cmd[k] == "boolean"
					? (options[k] = cmd[k])
					: k == "query" || k == "isMedia"
					? (options[k] = cmd[k])
					: "";
			let cmdObject = {
				name: cmd.name,
				alias: cmd.alias,
				desc: cmd.desc,
				use: cmd.use,
				type: cmd.type,
				category: cmd.category,
				options: options,
				run: cmd.run,
			};
			//console.log(cmd.name + JSON.stringify(cmdObject))
			fitur_bot.set(cmd.name, cmdObject);
		//	require("delay")(100);
	//		global.reloadFile(`./message/command/${res}/${file}`);
		}
		
		} catch (e) {
    console.error("Error di pengecekan fitur bot\n\n" + e);
  }
		
		
	});
	console.log(`loaded ${fitur_bot.size} fitur bot successfully`);

  console.log("Command loaded successfully");
};

ReadFitur()
