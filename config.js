module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notASecret!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'sql5.freemysqlhosting.net',
    user: process.env.MYSQL_USER || 'sql5437281',
    password: process.env.MYSQL_PASS || 'xMYIzS32wz',
    database: process.env.MYSQL_DB || 'sql5437281',
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT ||3001
  }
}