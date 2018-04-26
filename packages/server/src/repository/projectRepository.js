import {github, coveralls, travis, codeclimate} from '../api'
import config from '../config'
import {Repo, Commit, Coverage, Build} from '../model'
import {Promise} from '../common'

function getRepos() {
  return github
    .getRepos({
      org: config.repo.org,
      type: 'public',
      per_page: 100
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

function getCoverage(opts) {
  return coveralls
    .getCoverage(opts)
    .then(formatCoverage)
    .catch(() => null)
}

function getTravisBuilds(name) {
  return travis.getBuilds({
    owner: config.repo.org,
    repo: name
  })
    .then(formatBuilds)
    .catch(() => null)
}

function getCodeClimate(name) {
  return new Promise((res, rej) => res({climate: 'climate'}))

  return codeclimate
    .getRepo({
      owner: config.repo.org,
      repo: name
    })
    .then(data => {
      const repoId = data.data.data[0].id
      return codeclimate
        .getBuilds(repoId)
        .then(builds => {
          return Promise.all(builds.map(build => {
            const snapshotId = build.relationships.snapshot.data.id

            return codeclimate.getSnapshot(repoId, snapshotId)
          }))
        })
    })
    .catch(() => null)
}

function formatBuilds(builds) {
  return builds.data.map(build => new Build(build))
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

function formatCoverage(coverage) {
  return new Coverage(coverage.data || coverage)
}

function getProjects() {
  return getRepos()
    .then(repos => {
      return Promise.all(repos.slice(-5).map(({name}) => getProject(name)))
    })
}

function getProject(name) {
  const climate = getCodeClimate(name)
  const builds = getTravisBuilds(name)
  const repo = getRepo(name)
  const commits = getCommits(name)
    .then(commits => {
      return Promise.all(commits.map(commit => {
        return getCoverage({
          sha: commit.sha
        })
          .then(coverage => {
            commit.coverage =  coverage

            return commit
          })
      }))
    })

  const queue = [repo, commits, builds, climate]

  return Promise.all(queue)
    .then(([repo, commits, builds, climate]) => {

      repo.commits = commits
      repo.builds = builds
      repo.climate = climate

      return repo
    })
}

export default {
  getRepos,
  getRepo,
  getCommits,
  getProjects,
  getProject
}

export {
  getRepos,
  getRepo,
  getCommits,
  getProjects,
  getProject
}


