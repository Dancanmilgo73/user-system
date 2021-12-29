const cron = require("node-cron");
const axios = require("axios");
const { verifySmtp } = require("./config/nodemailercofig");
const sendEmail = require("./helpers/sendEmail");
const tasks = [22, 30, 41, 25];
const senderName = "Project Management System";
const senderEmail = "dancanmilgo73@gmail.com";

cron.schedule("*/30 * * * * *", async () => {
	verifySmtp();
	console.log("The task is running every 30 seconds : " + new Date());
	const { data } = await axios.get("http://localhost:3001/user/emailservice");
	// console.log(data);
	if (data.length) {
		data.map((singleUser) => {
			const messageObj = {
				from: {
					name: senderName,
					address: senderEmail,
				},
				to: singleUser.email,
				subject: `Welcome to the developers world ${singleUser.username}`,
				html: `<div>
                <h4 style="text-align: center">You recently registered as a developer on our system</h4>
                <p style="text-align: center; color: grey">Be on the look out for the projects and tasks that you will be assigned</p>
                <p style="text-align: center; color:grey;">Any questions can be asked via the email ${senderEmail}</p>
       </div>`,
			};
			sendEmail(messageObj);
		});
	}
});

cron.schedule("*/40 * * * * *", async () => {
	verifySmtp();

	console.log("The task is running every 40 seconds : " + new Date());
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
});
