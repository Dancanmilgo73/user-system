// const transport = require("../config/nodemailerconfig")

const { transport } = require("../config/nodemailercofig");

const sendEmail = async (message) => {
	return new Promise((resolve, reject) => {
		transport.sendMail(message, (err, info) => {
			if (err) {
				return reject(err);
			}

			console.log(info.response);
			resolve(info.response);
		});
	});
};

module.exports = sendEmail;
