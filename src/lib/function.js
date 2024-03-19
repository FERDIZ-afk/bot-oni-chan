const axios = require("axios");

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}


function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}


module.exports = {
	delay,
	getBuffer,
};