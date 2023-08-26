const dev = 0
const fs = require('node:fs');
const path = require('node:path');
const { IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Collection, GatewayIntentBits, Activity, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const { type } = require('node:os');
const { log, clear } = require('node:console');
const { url } = require('node:inspector');
const cli = require('nodemon/lib/cli');
const ready = require('./events/ready');
const now = new Date();
const day = now.getDate(); // returns a number representing the day of the week, starting with 0 for Sunday
const hours = now.getHours();
const minutes = now.getMinutes();
const secends = now.getSeconds();
const milliseconds = now.getMilliseconds();
const month = now.getMonth();
const year = now.getFullYear();
const readline = require('readline').createInterface({
	input: process.stdin,
	
  });


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages
	] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//not that stuff ^^^^
client.on(Events.InteractionCreate, async interaction => {
	
	if (!interaction.isModalSubmit()) return;
	if(interaction.customId === 'myModal') {
	// Get the data entered by the user
	const firstinput = interaction.fields.getTextInputValue('firstinput');
	const secendinput = interaction.fields.getTextInputValue('secendinput');
	const thirdinput = interaction.fields.getTextInputValue('thirdinput');
	const fourinput = interaction.fields.getTextInputValue('fourinput');
	console.log({ firstinput, secendinput, thirdinput, fourinput });
	
	
	const yay = new ButtonBuilder()
			.setCustomId('Yes')
			.setLabel('Approve')
			.setStyle(ButtonStyle.Primary);

			const boo = new ButtonBuilder()
			.setCustomId('No')
			.setLabel('Deny')
			.setStyle(ButtonStyle.Secondary);

			const del = new ButtonBuilder()
			.setCustomId('delete')
			.setLabel('Delete')
			.setStyle(ButtonStyle.Danger);

		const row = new ActionRowBuilder()
			.addComponents(yay, boo, del);
		await client.channels.cache.get('1125696534651088968').send({ content: `
**MOD APPLICATION REQUEST BY ${interaction.user}**

What commands do you know and what are they used for (at least 3 Commands): 
${firstinput}
	
Why do you want to be a moderator ? (at least 3 sentences): 
${secendinput}
	
Do you have any past experience as a moderator ? If yes, describe in which area, and how long ago:
${thirdinput}
	
how old are you?: 
${fourinput}

Their UserID: 
${interaction.user.id}

**NOTE TO MODERATERS: After Approve/Denying Press The delete Button, DO NOT SPAM MOD APPS OR YOU WILL GET DEMOTED!**
	`, components: [row],});
	

	
	
	interaction.reply({ content: 'Done!', ephemeral: true });
	setTimeout(() => {  interaction.deleteReply(); }, 1000);
	} else if(interaction.customId === 'Reason') {

		const reason = interaction.fields.getTextInputValue('Reason');
		const userid = interaction.fields.getTextInputValue('Userid');

// inside a command, event listener, etc.
const exampleEmbed = new EmbedBuilder()
	.setTitle('**Mod Application Results**')
	.setDescription(`<@${userid}>, unfortunately you have failed your application!

**Feedback:** ${reason}

You can re-apply at Anytime.
This was Declined By: <@${interaction.user.id}>`)
	
	.setImage('https://media.discordapp.net/attachments/950291378628362241/1004110699896766484/Failed_Clown.png?width=1440&height=639')

	client.channels.cache.get('1098847514662273154').send({content:`<@${userid}>`, embeds: [exampleEmbed] });
interaction.reply({content: 'Deny Sucsessful', ephemeral:'true',})
setTimeout(() => {  interaction.deleteReply(); }, 1000);

	} else if(interaction.customId === 'Approve') {
		const userid = interaction.fields.getTextInputValue('Userid');
		const exampleEmbed = new EmbedBuilder()
			.setTitle(`**Mod Application Results**`)
			.setDescription(`Congrats <@${userid}>, you passed you mod application!
						Please Read https://discord.com/channels/1037780253763981332/1037790751976857671
						Please Wait while staff make you mod in discord. Wait In game until staff mod you!
						This was Passed By <@${interaction.user.id}>`)
			
			.setImage('https://media.discordapp.net/attachments/950291378628362241/1004110699305390251/Passed_Clown.png?width=1440&height=639')
		
			client.channels.cache.get('1098847514662273154').send({content:`<@${userid}>`, embeds: [exampleEmbed] });
			interaction.reply({content: 'Approve Sucsessful', ephemeral:'true',})
setTimeout(() => {  interaction.deleteReply(); }, 1000);
	}
});

client.on('interactionCreate', async interaction => {
    if(interaction.isButton()) {
        if(interaction.customId == 'Yes') {
			
			const modal = new ModalBuilder()
			.setCustomId('Approve')
			.setTitle('Please Add The Userid!');

		// Add components to modal

		// Create the text input components
		const Userid = new TextInputBuilder()
			.setCustomId('Userid')
		    // The label is the prompt the user sees for this input
			.setLabel("Their Userid")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);
			

			const UserIdActionRow = new ActionRowBuilder().addComponents(Userid);
			
			modal.addComponents(UserIdActionRow);

			await interaction.showModal(modal);

			

        } else if(interaction.customId == 'No') {
			
			const modal = new ModalBuilder()
			.setCustomId('Reason')
			.setTitle('Reason For Deny');

		// Add components to modal

		// Create the text input components
		const Reason = new TextInputBuilder()
			.setCustomId('Reason')
		    // The label is the prompt the user sees for this input
			.setLabel("Reason")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Paragraph);
			const Userid = new TextInputBuilder()
			.setCustomId('Userid')
		    // The label is the prompt the user sees for this input
			.setLabel("Their Userid")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

			const ReasonActionRow = new ActionRowBuilder().addComponents(Reason);
			const UserIdActionRow = new ActionRowBuilder().addComponents(Userid);
			
			modal.addComponents(UserIdActionRow, ReasonActionRow);

			await interaction.showModal(modal);

			



		} }
});
 

client.on('interactionCreate', async interaction => {
    if(interaction.isButton()) {
		if(interaction.customId === 'modapp') {
			console.log("e")
			const modal = new ModalBuilder()
				.setCustomId('myModal')
				.setTitle('ER:LC MOD APLLICATION');
	
			// Add components to modal
	
			// Create the text input components
			const firstinput = new TextInputBuilder()
				.setCustomId('firstinput')
				// The label is the prompt the user sees for this input
				.setLabel("What commands do you know?")
				// Short means only a single line of text
				.setStyle(TextInputStyle.Paragraph);
	
			const secendinput = new TextInputBuilder()
				.setCustomId('secendinput')
				.setLabel("Why do you want to be a moderator?")
				// Paragraph means multiple lines of text.
				.setStyle(TextInputStyle.Paragraph);
	
			// An action row only holds one text input,
			// so you need one action row per text input.
			const thirdinput = new TextInputBuilder()
				.setCustomId('thirdinput')
				// The label is the prompt the user sees for this input
				.setLabel("Do you have any past experience as a mod?")
				// Short means only a single line of text
				.setStyle(TextInputStyle.Paragraph);
	
			const fourinput = new TextInputBuilder()
				.setCustomId('fourinput')
				.setLabel("how old are you?")
				// Paragraph means multiple lines of text.
				.setStyle(TextInputStyle.Short);
			
	
			// An action row only holds one text input,
			// so you need one action row per text input.
			const firstActionRow = new ActionRowBuilder().addComponents(firstinput);
			const secondActionRow = new ActionRowBuilder().addComponents(secendinput);
			const thirdActionRow = new ActionRowBuilder().addComponents(thirdinput);
			const fourActionRow = new ActionRowBuilder().addComponents(fourinput);
			
	
			// Add inputs to the modal
			modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourActionRow);
	
			// Show the modal to the user
			await interaction.showModal(modal);
	
		
    } else if(interaction.customId === 'delete') {
		interaction.message.delete();}
	}
})


let y = process.openStdin()
y.addListener("data", res =>{
    let x = res.toString().trim().split(/ +/g)
		if (x.join(" ") == "restart") {
		console.log("Restarting...");
		setTimeout(() => {  client.login(token);  }, 6000);
		client.destroy()
		setTimeout(() => {  console.log("Restarted!");  }, 6000);
	}
	if (x.join(" ") == "dev on") {
		console.log("dev is now on!");
		client.user.setActivity({
			name: "Dev Mode Active!",
			type: ActivityType.Listening,
	})} if (x.join(" ") == "dev off") {
		console.log("dev is now off!");
		client.user.setActivity({
			name: "Everyones Mod Applications",
			type: ActivityType.Watching
		})
	} if (x.join(" ") == "clear") {
		clear()
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}
});


client.off('error', (c) => {
	log("?")
})
client.on('ready', (c) => {
	client.user.setActivity({
			name: "Everyones Mod Applications",
			type: ActivityType.Watching
		})
})


client.on('interactionCreate', async interaction => {
    if(interaction.isButton()) {
		
        if(interaction.customId == '1') {
		client.channels.cache.get("1143894583206494268").setName("[🟢]")
		interaction.reply({ content: 'Done!', ephemeral: true });
		setTimeout(() => {  interaction.deleteReply(); }, 1000);
		console.log(`(${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds}) Changed To Full Server By ${interaction.user.tag}`);
		} else if(interaction.customId == '2') {
			client.channels.cache.get("1143894583206494268").setName("[🟣]")
			interaction.reply({ content: 'Done!', ephemeral: true });
							setTimeout(() => {  interaction.deleteReply(); }, 1000);
							console.log(`(${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds}) Changed To 30+ People Or Lower By ${interaction.user.tag}`);
			} else if(interaction.customId == '3') {
				client.channels.cache.get("1143894583206494268").setName("[🟠]")
				interaction.reply({ content: 'Done!', ephemeral: true });
							setTimeout(() => {  interaction.deleteReply(); }, 1000);
							console.log(`(${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds}) Changed To 20+ People Or Lower By ${interaction.user.tag}`);

				} else if(interaction.customId == '4') {
					client.channels.cache.get("1143894583206494268").setName("[🟡]")
					interaction.reply({ content: 'Done!', ephemeral: true });
							setTimeout(() => {  interaction.deleteReply(); }, 1000);
							console.log(`(${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds}) Changed To 15+ People Or Lower By ${interaction.user.tag}`);

					} else if(interaction.customId == '5') {
						client.channels.cache.get("1143894583206494268").setName("[🔵]")
						interaction.reply({ content: 'Done!', ephemeral: true });
							setTimeout(() => {  interaction.deleteReply(); }, 1000);
							console.log(`(${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds}) Changed To 10+ People Or Lower By ${interaction.user.tag}`);

						} else if(interaction.customId == '6') {
							client.channels.cache.get("1143894583206494268").setName("[🔴]")
							interaction.reply({ content: 'Done!', ephemeral: true });
							setTimeout(() => {  interaction.deleteReply(); }, 1000);
							console.log(`(${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds}) Changed To Dead or not up By ${interaction.user.tag}`);

							}
	}
	}

		)
		

		const fsPromises = require('fs').promises; 
		client.on("messageCreate", (message) => {
			console.log(`(${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds})${message.author.tag} said: ${message.content}`)
			fsPromises.readFile('Database.json', 'utf8') 
        .then(data => { 
                let json = JSON.parse(data);
                json.push({ Time: `${day}/${month}/${year}:${hours}:${minutes}:${secends}:${milliseconds}`, Username: `${message.author.tag}`, Content: `${message.content}`, Userimg: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=128`, Channel: `${message.channel.name}` });

                fsPromises.writeFile('Database.json', JSON.stringify(json, null, 4))
            })
        .catch(err => { console.log("Read Error: " +err);});

		})



client.login(token); 