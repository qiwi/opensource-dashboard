import {Router} from 'express'
import {projectRepository} from '../repository'
import {handleReject} from './errorController'

const router = new Router()

function getEntireInfo (req, res, next) {
  projectRepository
    .getRepos()
    .then(data => {
      res.send(data.data)
    })
    .catch(handleReject)
}

function getInfo(req, res, next) {
  res.send({baz: 'qux'})
}

export default router
  .get('/', getEntireInfo)
  .get('/:name', getInfo)
