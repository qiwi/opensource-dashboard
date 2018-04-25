import {github} from '../api'
import config from '../config'
import {Repo} from '../model'

function getRepos() {
  return github
    .getRepos({
      org: config.repo.org,
      type: 'public'
    })
    .then(formatRepos)
}

function getRepo(name) {
  return github
    .getRepo({
      owner: config.repo.org,
      repo: name
    })
    .then(formatRepo)
}

function formatRepos(repos) {
  return repos.data.map(repo => new Repo(repo))
}

function formatRepo (repo) {
  return repo.data
}

export default {
  getRepos,
  getRepo
}

export {
  getRepos,
  getRepo
}
