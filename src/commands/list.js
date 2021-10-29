const mysql = require('mysql')
const { SlashCommandBuilder } = require('@discordjs/builders')
const MessageEmbed = require('discord.js').MessageEmbed
const DBNAME = 'arbeiten'

module.exports = {
  data: new SlashCommandBuilder().setName('list').setDescription('List all exams'),
  async execute(interaction) {
    const mysqlConnection = mysql.createConnection({
      host: 'mariadb',
      user: 'root',
      password: 'password',
      database: DBNAME
    })

    mysqlConnection.connect(function (err) {
      if (err) throw err

      console.log('Connected!')

      const sql = 'SELECT * FROM `arbeiten`;'

      mySQLConnection.query(sql, function (err, result) {
        if (err) throw err

        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle('Alle arbeiten:')
          .addField('Result: ', `${result}`)
          .setTimestamp()

        return interaction.reply({ embeds: [embed] })
      })
    })
  }
}
