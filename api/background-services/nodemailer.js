const axios = require("axios");
const { verifySmtp } = require("./config/nodemailercofig");
const sendEmail = require("./helpers/sendEmail");
const tasks = [22, 30, 41, 25];
const senderName = "Project Management System";
const senderEmail = "dancanmilgo73@gmail.com";

const sendProjectNotification = async () => {
	const { data } = await axios.get("http://localhost:3002/tasks/emailservice");
	console.log(data);
	// check to see if there is any job to run
	if (data.length) {
		data.map((user) => {
			const messageObj = {
				from: {
					name: senderName,
					address: senderEmail,
				},
				to: user.email,
				subject: `You have been assigned the project ${user.projectName}`,
				html: `<div>
                <h4 style="text-align: center, font-weight: bold;">You have been tasked with ${user.taskName}</h4>
                <p style="text-align: center; color: grey">${user.taskDescription}</p>
                <p style="text-align: center; color: grey">Please start working on this task as soon as youreceive this email</p>

                <p style="text-align: center; color:grey;">Any questions can be asked via the email ${senderEmail}</p>
       </div>`,
			};
			sendEmail(messageObj);
		});
	}
};
module.exports = { sendProjectNotification };
