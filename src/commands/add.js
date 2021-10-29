const mysql = require('mysql')
const { SlashCommandBuilder } = require('@discordjs/builders')
const MessageEmbed = require('discord.js').MessageEmbed
const DBNAME = 'arbeiten'
const TABLE = 'arbeiten'

const formatDate = (date) => {
  const temp = String(date).split('-')
  return temp[2] + '-' + temp[1] + '-' + temp[0]
}

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

    console.log(formatDate(datum))

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
        'INSERT INTO ' +
        TABLE +
        " (fach, thema, datum) VALUES ('" +
        fach +
        "', '" +
        thema +
        "', '" +
        datum +
        "' );"

      mysqlConnection.query(sql, function (err, result) {
        if (err) throw err

        console.log(result)

        interaction.reply('Test')
      })
    })
  }
}
