# OpenShell

**OpenShell** is a small tool originally made just for fun but later I made it into an open-source project.

It aims to mostly replicate the Command Prompt, execute commands directly from your browser and even remotely over the network.

## Features

- Executing commands directly from your browser or using the HTTP POST method.
- Receiving the standard outputs from the command you run.

### Currently, these features are not supported yet but will be in the future:

- Receiving asynchronous outputs in Standard Output using WebSocket instead of current non-asynchronous outputs using HTTP POST.
- Sending inputs using Standard Input.
- cd (pointing) the folders in the shell to relative folders. Currently, you need to use the full path to point.
- and much more...

## How to use?

* **Step 1:** Install *Node.JS* first if you don't have it.

* **Step 2:** Clone this repository.

* **Step 3:** Create these two Environment Variables using the Environment Variables settings on your OS or the .env file:

```
password=(the password of the Command Prompt)
port=(the port of the Command Prompt, if not defined the port 3000 will be used)
```

* **Step 4:** Open a Command Prompt and cd (point) it into the cloned folder and run this command to install all the dependencies:

```
npm install
```

* **Step 5:** Finally, run this command:

```
node main.js
```
	
And the shell will be open widely on your defined port. You can now use the webpage version of this shell using `localhost` (or your local IP address) with your defined port or use the HTTP POST method with these 2 parameters: `password` containing the authentication password and `command` containing the command you want to execute.

You can also use *Ngrok* to open a shell on your computer over the Internet.
