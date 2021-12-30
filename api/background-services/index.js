const express = require("express");
const { verifySmtp } = require("./config/nodemailercofig");
const { sendProjectNotification } = require("./nodemailer");
const sendSMS = require("./sendSMS");
const cron = require("node-cron");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3004 || process.env.PORT;
verifySmtp();
const taskservice = async () => {
	cron.schedule("*/30 * * * * *", async () => {
		console.log("The task is running every 30 seconds : " + new Date());
		await sendSMS();
	});
	cron.schedule("*/40 * * * * *", async () => {
		console.log("The task is running every 40 seconds : " + new Date());
		await sendProjectNotification();
	});
};
taskservice();
app.listen(port, () => {
	console.log(`App running on port: ${port}`);
});
