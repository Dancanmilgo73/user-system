const AfricasTalking = require("africastalking");
const atalking = require("./config/atalkingConfig");
const axios = require("axios");

module.exports = async function sendSMS() {
	// TODO: Send message
	try {
		const { data } = await axios.get("http://localhost:3001/user/emailservice");
		if (data.length) {
			data.map(async (singleUser) => {
				console.log(singleUser);
				const messageObj = {
					to: `+${singleUser.phoneNumber}`,
					from: "72346",
					message: `Greetings ${singleUser.username},
                    You have registered as a developer in our project management system.
                    Be on the lookout on your email for the tasks you will be assigned.`,
				};

				const result = await atalking.SMS.send(messageObj);
				// console.log(result);
			});
		}
	} catch (ex) {
		console.error(ex);
	}
};
