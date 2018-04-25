import {github} from '../api'
import config from '../config'
import {Repo, Commit} from '../model'

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

function getCommits(name) {
  return github
    .getCommits({
      owner: config.repo.org,
      repo: name
    })
    .then(formatCommits)
}

function formatRepos(repos) {
  return repos.data.map(repo => new Repo(repo))
}

function formatRepo (repo) {
  return new Repo(repo.data)
}

function formatCommits(commits) {
  return commits.data.map(commit => new Commit(commit))
}

export default {
  getRepos,
  getRepo,
  getCommits
}

export {
  getRepos,
  getRepo,
  getCommits
}
