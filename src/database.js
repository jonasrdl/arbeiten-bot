const mysql = require('mysql')
const DBNAME = 'arbeiten'

const mysqlConnection = mysql.createConnection({
  host: 'mariadb',
  user: 'root',
  password: 'password',
  database: DBNAME
})

connection.connect(function (err) {
  if (err) throw err

  console.log('Connected!')

  const sql = `create table if not exists arbeiten(fach TEXT, thema TEXT, datum DATE);`

  connection.query(sql, function (err, result) {
    if (err) throw err

    console.log('Inserted successfully!')
  })
})
