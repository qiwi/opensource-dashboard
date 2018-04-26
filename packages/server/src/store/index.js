import fs from 'fs'
import path from 'path'

const PATH = path.resolve(__dirname, './db.json')
const memo = JSON.parse(fs.readFileSync(PATH, 'utf-8'))

export default {
  get(key) {
    return memo[getKey(key)]
  },

  set(key, value) {
    memo[getKey(key)] = JSON.parse(JSON.stringify(value && value.data ? {data: value.data} : value))

    fs.writeFileSync(PATH, JSON.stringify(memo), 'utf-8')

    return value
  }
}

function getKey(key) {
  return typeof key === 'string'
    ? key
    : JSON.stringify(key)
}