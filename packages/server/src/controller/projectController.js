import {Router} from 'express'

const router = new Router()

function getEntireInfo (req, res, next) {
  res.send({foo: 'bar'})
}

function getInfo(req, res, next) {
  res.send({baz: 'qux'})
}

export default router
  .get('/', getEntireInfo)
  .get('/:name', getInfo)
