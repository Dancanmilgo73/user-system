// const sendEmail = require("../config/nodemailerconfig")
const messageObj = require("../helpers/messageObj");
const sendEmail = require("../helpers/sendEmail");

exports.EmailSender = async (req, res) => {
	try {
		await sendEmail(messageObj);
		return res.send("Email sent");
	} catch (error) {
		return res.send(error.message);
	}
};
