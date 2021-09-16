module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
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
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  }
}