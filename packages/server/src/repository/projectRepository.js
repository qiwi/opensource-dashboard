import {github} from '../api'
import config from '../config'

function getRepos() {
  return github.getRepos({
    org: config.repo.org,
    type: 'public'
  })
}

export default {
  getRepos
}

export {
  getRepos
}
