import server from './server'
import logger from './logger'
import config from './config'
import router from './router'

const port = config.server.port

server
  .use('/', router)
  .listen(port, () => logger.info(`Server is online and ready for connections: ${port}`))
