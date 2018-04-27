import Octokit from '@octokit/rest'
import {Promise} from '../common'
import store from '../store'

const octokit = new Octokit()

export function getRepos(opts) {
  const key = store.getKey(opts, 'gitrepos')
  const value = store.get(key)
  if (value !== undefined) {
    return new Promise((resolve, reject) => resolve(value))
  }

  return octokit
    .repos
    .getForOrg(opts)
    .then(data => {
      store.set(key, data)
      return data
    })
}

export function getRepo(opts) {
  const key = store.getKey(opts, 'gitrepo')
  const value = store.get(key)
  if (value !== undefined) {
    return new Promise((resolve, reject) => resolve(value))
  }

  return octokit
    .repos
    .get(opts)
    .then(data => {
      store.set(key, data)
      return data
    })
}

function getCommits(opts) {
  const key = store.getKey(opts, 'gitcommits')
  const value = store.get(key)
  if (value !== undefined) {
    return new Promise((resolve, reject) => resolve(value))
  }

  return octokit
    .repos
    .getCommits(opts)
    .then(data => {
      store.set(key, data)
      return data
    })
}

export default {
  octokit,
  getRepos,
  getRepo,
  getCommits
}