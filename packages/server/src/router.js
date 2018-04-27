import {Router} from 'express'
import {projectController, errorController, notFoundController} from './controller'

const router = new Router()

router
  .use('/', projectController)
  .use('*', notFoundController)
  .use(errorController)

export default router