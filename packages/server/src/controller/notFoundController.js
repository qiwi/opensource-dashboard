import {NOT_FOUND} from '../error'

export default function (req, res, next) {
  res
    .status(NOT_FOUND)
    .send({message: 'Not found'})
}