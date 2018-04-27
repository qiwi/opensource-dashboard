import {formatError, BAD_REQUEST, INTERNAL_SERVER_ERROR} from '../error'
import log from '../logger'

const DEFAULT_ERROR_CODE = INTERNAL_SERVER_ERROR

export default function(err, req, res, next) {
  let code = DEFAULT_ERROR_CODE
  let data

  if (err) {
    data = formatError(err.code, err.message)
    code = err.code | 0 || code
  }

  res
    .status(code)
    .send(data)
}

export function handleReject(err, res) {
  log.error(err)

  res
    .status(err.code || INTERNAL_SERVER_ERROR)
    .send({
      message: err.message || 'Rejected'
    })
}