const { exec } = require("child_process");
var express = require("express");
const app = express();
const os = require("os");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
	res.header("Content-Type", "text/plain");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	if (!req.body.password) return res.send("Please type the password.");
	if (!req.body.command) return res.send("Please type a command.");
	if (req.body.password == process.env.password) {
		var to = setTimeout(function() {
			if (!err && !out && !serr) return res.send("No errors or outputs has been sent for the last 5 seconds, maybe the command has been successfully executed.");
		}, 5000);
		var err, out, serr;
		exec((req.body.folder ? ("cd /d \"" + req.body.folder + "\" & ") : "") + req.body.command, (error, stdout, stderr) => {
			if (error) {
				clearTimeout(to);
				err = error;
				res.send(`${error.message}`);
				return;
			}
			if (stderr) {
				clearTimeout(to);
				serr = stderr;
				res.send(`${stderr}`);
				return;
			}
			clearTimeout(to);
			out = stdout;
			if (stdout != "") return res.send(`${stdout}`);
			else return res.send(`The command has been executed successfully.`);
		});
	}
	else return res.send("Invalid password!");
});

app.options("/", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.send("OK");
});

app.get("/", (req, res) => {
	var html = require("fs").readFileSync("main.html").toString();
	res.send(html
		.replaceAll("<!--computer.name-->", os.userInfo().username + "@" + os.hostname)
		.replaceAll("<!--system.name-->", os.type() + " " + os.release() + " (" + os.platform() + ")")
	);
});

var port = process.env.port || 3000;

app.listen(port, () => {
	console.log("OpenShell is now open at port " + port + ".");
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
  });