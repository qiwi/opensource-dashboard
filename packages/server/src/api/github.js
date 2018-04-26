import Octokit from '@octokit/rest'
import {Promise} from '../common'
import store from '../store'

const octokit = new Octokit()

export function getRepos(opts) {
  const value = store.get(opts)
  if (value) {
    return new Promise((resolve, reject) => resolve(value))
  }

  return octokit
    .repos
    .getForOrg(opts)
    .then(data => {
      store.set(opts, data)
      return data
    })
}

export function getRepo(opts) {
  return octokit
    .repos
    .get(opts)
}

function getCommits(opts) {
  const value = store.get(opts)
  if (value) {
    return new Promise((resolve, reject) => resolve(value))
  }

  return octokit
    .repos
    .getCommits(opts)
    .then(data => {
      store.set(opts, data)
      return data
    })
}

export default {
  octokit,
  getRepos,
  getRepo,
  getCommits
}