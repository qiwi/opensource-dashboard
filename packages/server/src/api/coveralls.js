import axios from 'axios'

const URL = 'https://coveralls.io'

function getCoverage(opts) {
  const {owner, repo, hash} = opts

  const url = hash
    ? `${URL}/builds/${hash}.json`
    : `${URL}/github/${owner}/${repo}.json`

  return axios.get(url)
}

export {
  getCoverage
}