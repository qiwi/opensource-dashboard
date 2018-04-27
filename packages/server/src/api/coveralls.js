import axios from '../common/transport'

const URL = 'https://coveralls.io'

function getCoverage(opts) {
  const {owner, repo, sha} = opts

  const url = sha
    ? `${URL}/builds/${sha}.json`
    : `${URL}/github/${owner}/${repo}.json`

  return axios.get(url)
}

export {
  getCoverage
}

export default{
  getCoverage
}