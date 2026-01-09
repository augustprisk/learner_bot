const { SlashCommandBuilder } = require('discord.js');
const { GiphyFetch } = require('@giphy/js-fetch-api');
const { giphyToken } = require('../../config.json')

const gf = new GiphyFetch(giphyToken);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('gifsearcher')
    .setDescription('Sends a random gif based on your search term!')
    .addStringOption((Option) =>
        Option
            .setName('query')
            .setDescription('What shall I search for')
            .setRequired(true)
            ),
    async execute(interaction) {
        const { options } = interaction;
        const query = options.getString('query');
        const lmt = 8;

        await interaction.deferReply();

        try {

            let choice = Math.floor(Math.random() * lmt);

            const { data: gifs } = await gf.search(query, { sort: 'relevant', limit: lmt, type: 'gifs'});

            if (!gifs || gifs.length <= 0) {
                return interaction.editReply('No GIFs found for that search term!');
            }

            const randomGif = gifs[Math.floor(Math.random() * lmt)];
            const gifUrl = randomGif.images.original.url;

            await interaction.editReply(gifUrl);
        }   catch (error) {
        console.error('Error fetching GIF:', error);
        await interaction.editReply('Something went wrong while searching for GIF');
    }
    } 
}