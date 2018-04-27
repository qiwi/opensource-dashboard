import axios from 'axios'
import log from '../logger'
import store from '../store'

export default {
  get: (req) => {
    const value = store.get(req)

    log.info('url', req)

    if (value !== undefined) {
      return new Promise((res, rej) => res(value))
    }

    if (value === null) {
      return new Promise((res, rej) => rej(null))
    }

    return axios.get(req)
      .then(data => {
        store.set(req, data)

        return data
      })
      .catch(err => {
        store.set(req, null)

        throw err
      })
  }
}