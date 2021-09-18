module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  jwt: {
    secret: process.env.JWT_SECRET || ''
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
  },
  cacheService: {
    host: process.env.cache_SRV_HOST || 'localhost',
    port: process.env.cache_SRV_PORT || 3003,
  },
  redis: {
    host: process.env.REDIS_HOST || 'redis-18797.c279.us-central1-1.gce.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 18797,
    password: process.env.REDIS_PASSWORD || 'IHtLndRwlpgcuh94EsLR0HR94yoizrBE',
  }
}