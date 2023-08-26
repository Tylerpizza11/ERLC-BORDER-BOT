
const {SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Helps You'),
	async execute(interaction) {
		setTimeout(() => {  interaction.deleteReply(); }, 5000);
		interaction.reply({ content: 'Want to do your mod Applications? Go here: https://discord.com/channels/1037780253763981332/1098272588721033216', ephemeral: true });
	},
};

