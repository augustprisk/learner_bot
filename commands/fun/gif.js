const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Sends a random gif based on your search term!')
    .addStringOption((Option) =>
        Option
            .setName('category')
            .setDescription('The gif category')
            .setRequired(true)
            .addChoices(
                { name: 'Funny', value: 'gif_funny' },
				{ name: 'Meme', value: 'gif_meme' },
				{ name: 'Movie', value: 'gif_movie' },
            ));  