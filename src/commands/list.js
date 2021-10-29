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

      mysqlConnection.query(sql, function (err, result) {
        if (err) throw err

        result.forEach((element) => {
          let fach = element.fach
          let thema = element.thema
          let datum = element.datum

          const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle(fach)
            .addField(`${thema}`, `${datum}`, false)
            .setTimestamp()

          interaction.channel.send(embed)
        })
      })
    })
  }
}
