import fs from 'fs'
import path from 'path'
import log from '../logger'

const PATH = path.resolve(__dirname, './db.json')
const memo = JSON.parse(fs.readFileSync(PATH, 'utf-8'))

export default {
  get(key) {
    const k = getKey(key)
    const v = memo[k]

    if (v !== undefined) {
      log.info('from store', k)
    }

    return v
  },

  set(key, value) {
    memo[getKey(key)] = JSON.parse(JSON.stringify(value && value.data ? {data: value.data} : value))

    fs.writeFileSync(PATH, JSON.stringify(memo), 'utf-8')

    return value
  },
  getKey(...args) {
    return args.map(getKey).join('#')
  }
}

function getKey(key) {
  return typeof key === 'string'
    ? key
    : JSON.stringify(key)
}