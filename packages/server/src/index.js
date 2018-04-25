import server from './server'
import logger from './logger'

server.listen(8080, () => logger.info('Server is online and ready for connections'))
