import {Router} from 'express'
import {projectRepository} from '../repository'
import {handleReject} from './errorController'

const router = new Router()

function getEntireInfo (req, res, next) {
  projectRepository
    .getProjects()
    .then(res.send.bind(res))
    .catch(err => handleReject(err, res))
}

function getInfo(req, res, next) {
  projectRepository
    .getProject(req.params.name)
    .then(res.send.bind(res))
    .catch(err => handleReject(err, res))
}

function getCommits(req, res, next) {
  projectRepository
    .getCommits(req.params.name)
    .then(res.send.bind(res))
    .catch(err => handleReject(err, res))
}

function getStats(req, res, next) {
  projectRepository
    .getStats()
    .then(res.send.bind(res))
    .catch(err => handleReject(err, res))
}

export default router
  .get('/', getEntireInfo)
  .get('/stats', getStats)
  .get('/:name', getInfo)
  .get('/:name/commit', getCommits)
