const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder().setName('list').setDescription('List all exams'),
  async execute(interaction) {
    return interaction.reply('Pong!')
  }
}
