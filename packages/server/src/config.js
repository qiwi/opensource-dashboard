import path from 'path'
import fs from 'fs'
import opt from 'optimist'

const DEFAULT_CONFIG_PATH = path.resolve(__dirname, '../config/qiwi.json')

function resolveConfigPath() {
  return opt.argv.config || DEFAULT_CONFIG_PATH
}

const CONFIG_PATH = resolveConfigPath()

export default JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
