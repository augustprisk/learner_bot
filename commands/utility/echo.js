const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption((option) => option.setName('input').setDescription('The input to echo back').setRequired(true).setMaxLength(2000))
    .addChannelOption((option) => option.setName('channel').setDescription('The channel to echo into').addChannelTypes(ChannelType.GuildText))
    .addBooleanOption((option) =>
		option.setName('ephemeral').setDescription('Whether or not the echo should be ephemeral'),
	),
    async execute(interaction) {
        const input = interaction.options.getString('input', true);
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const ephemeral = interaction.options.getBoolean('ephemeral') || false;
        if (channel.type !== ChannelType.GuildText) {
            return interaction.reply({ content: 'Please select a text channel!', ephemeral: true });
        }
        await channel.send(input);
        if (channel.id === interaction.channel.id) {
            if (ephemeral) {
                await interaction.reply({ content: 'Message sent!', ephemeral: true });
            } else {
                await interaction.reply('Message sent!');
            }
        }
    }
}
