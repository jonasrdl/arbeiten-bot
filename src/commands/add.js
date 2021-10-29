const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder().setName('add').setDescription('Add an exam'),
  async execute(interaction) {
    return interaction.reply('Pong!')
  }
}
