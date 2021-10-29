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
          console.log(element.fach)
          console.log(element.thema)
          console.log(element.datum)

          const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle(element.fach)
            .addField(`${element.thema}`, `${element.datum}`)
            .setTimestamp()

          interaction.channel.send(embed)
        })
      })
    })
  }
}
