
const {EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ssu')
		.setDescription('server start up')
		.addUserOption(option =>
			option
				.setName('host')
				.setDescription('To Host The SSU')
				.setRequired(true))
		.addUserOption(option =>
			option
				.setName('co-host')
				.setDescription('To Co-Host The SSU')),
	async execute(interaction) {
		const Host = interaction.options.getUser('host');
		const COHOST = interaction.options.getUser('co-host');
		if (interaction.user.id == '95206229947517749'||'585137216611942409') {
			const SSU = new EmbedBuilder()
			
			.setColor(0xc15d43)
			.setTitle('**Server Start Up!**')
			.setDescription('You can join with this link :\n https://www.roblox.com/games/start?launchData=%7B%22psCode%22%3A%22erlcborder%22%7D&placeId=2534724415\n')
			.setThumbnail(`https://cdn.discordapp.com/app-icons/1124634562442571856/baf245b85e7e0a5af198ca5552c5ba99.png?size=512`)
			.addFields(
				{"name": `Or by using the server code in ERLC: `,"value": `\`erlcborder\``},
				{"name": `Our secend server`,"value": `https://www.roblox.com/games/start?launchData=%7B%22psCode%22%3A%22erlcboderb%22%7D&placeId=2534724415&`},
				{"name": `Host:`,"value": `${Host}`},
				{"name": `Co-Host:`,"value": `${COHOST}`},
			)	
		
		interaction.reply({content: "<@&1038122792421429308>", embeds: [SSU], ephemeral: false });
		
		} else {
			setTimeout(() => {  interaction.deleteReply(); }, 2000);
			interaction.reply({ content: 'Your Not Allowed To Use This!', ephemeral: true });
			return
		}
},
};
