require("dotenv").config();
const nodemailer = require("nodemailer");
// const {smtpTransport} = require('nodemailer')
const transport = nodemailer.createTransport({
	service: "gmail",
	// port: 587,
	auth: {
		user: process.env.emailUser,
		pass: process.env.pass,
	},
});

function verifySmtp() {
	// verify connection configuration
	transport.verify(function (error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log("Server is ready for emails");
		}
		return true;
	});
}
// verifySmtp(); // call function in index.js file

module.exports = { transport, verifySmtp };
