const mysql = require('mysql')
const { SlashCommandBuilder } = require('@discordjs/builders')
const MessageEmbed = require('discord.js').MessageEmbed
const DBNAME = 'arbeiten'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add an exam')
    .addStringOption((option) => option.setName('fach').setDescription('Fach'))
    .addStringOption((option) => option.setName('thema').setDescription('Thema'))
    .addStringOption((option) => option.setName('datum').setDescription('Datum')),
  async execute(interaction) {
    const fach = interaction.options.getString('fach')
    const thema = interaction.options.getString('thema')
    const datum = interaction.options.getString('datum')

    const mysqlConnection = mysql.createConnection({
      host: 'mariadb',
      user: 'root',
      password: 'password',
      database: DBNAME
    })

    mysqlConnection.connect(function (err) {
      if (err) throw err

      console.log('Connected!')

      const sql =
        'INSERT INTO `arbeiten` (`fach`, `thema`, `datum`) VALUES (' +
        fach +
        ', ' +
        thema +
        ', ' +
        datum +
        ')'

      mysqlConnection.query(sql, function (err, result) {
        if (err) throw err

        result.forEach((element) => {
          interaction.channel.send(
            `Fach:
             ${element.fach} 
             Thema: ${element.thema} 
             Datum: ${element.datum}`
          )
        })

        interaction.reply('Alle arbeiten: ')
      })
    })
  }
}
