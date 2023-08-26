const { Events } = require('discord.js');
const now = new Date();
const day = now.getDate(); // returns a number representing the day of the week, starting with 0 for Sunday
const hours = now.getHours();
const minutes = now.getMinutes();
const secends = now.getSeconds();
const milliseconds = now.getMilliseconds();
const month = now.getMonth();
const year = now.getFullYear();

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		const fsPromises = require('fs').promises; 
fsPromises.writeFile('botstatus.json', JSON.stringify({ Status: "ON"}))
        .catch(er => { console.log(er);});

		
		console.log(`(${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds}) Ready! Logged in as ${client.user.tag}`);
		
	},
};