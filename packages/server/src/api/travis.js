import axios from '../common/transport'

const URL = 'https://api.travis-ci.org/repos'

function getBuilds(opt) {
  const fullName = opt.owner + '/' + opt.repo
  const url = `${URL}/${fullName}/builds`

  return axios.get(url)
}

export {
  getBuilds
}

export default {
  getBuilds
}