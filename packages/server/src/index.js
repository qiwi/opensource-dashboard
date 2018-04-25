import server from './server'
import logger from './logger'
import config from './config'

const port = config.server.port

server.listen(port, () => logger.info(`Server is online and ready for connections: ${port}`))
