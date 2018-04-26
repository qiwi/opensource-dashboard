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
      return Promise.all(repos.slice(-10).map(({name}) => getProject(name)))
    })
}

function getProject(name) {
  const climate = getCodeClimate(name)
  const builds = getTravisBuilds(name)
  const repo = getRepo(name)
  const cov = []
  let dateFirst = Infinity
  let dateLast = 0
  const dateMap = {}
  const commits = getCommits(name)
    .then(commits => {
      return Promise.all(commits.map(commit => {
        if (commit.date > dateLast) {
          dateLast = commit.date
        }

        if (commit.date < dateFirst) {
          dateFirst = commit.date
        }

        dateMap[commit.sha] = commit.date

        return getCoverage({
          sha: commit.sha
        })
          .then(coverage => {
            if (coverage) {
              coverage.sha = commit.sha
              cov.push(coverage)
            }
            //commit.coverage =  coverage

            return commit
          })
      }))
    })

  const queue = [repo, commits, builds, climate]

  return Promise.all(queue)
    .then(([repo, commits, builds, climate]) => {

      repo.commits = commits
      repo.builds = normalizeDataset(builds, dateMap)
      repo.climate = normalizeDataset(climate, dateMap)
      repo.coverage = normalizeDataset(cov, dateMap)
      repo.dateFirst = dateFirst
      repo.dateLast = dateLast

      return repo
    })
}

function normalizeDataset(data, dateMap) {
  if (!data || !data.map) {
    return []
  }

  return data.map(item => {
    item.date = dateMap[item.sha]
    return item
  })
}

function getStats() {
  return getProjects()
    .then(projects => {
      let dateFirst = Infinity
      let dateLast = 0

      projects.forEach(project => {
        if (project.dateLast > dateLast) {
          dateLast = project.dateLast
        }

        if (project.dateFirst < dateFirst) {
          dateFirst = project.dateFirst
        }
      })

      const len = 10
      const dateDiff = dateLast - dateFirst
      const step = dateDiff / len
      const dateRanges = [...Array(len)].map((v, k) => new Date(k * step + dateFirst.getTime()))

      const builds = []
      const coverage = []
      const climate = []
      dateRanges.forEach((v, i) => {
        if (i) {
          const dateFrom = dateRanges[i - 1]
          const dateTo = v

          let covCount = 0
          let covValue = 0
          let climateCount = 0
          let climateValue = 0
          let buildCount = 0
          let buildValue = 0

          projects.forEach(project => {
            project.coverage.forEach((cov) => {
              if (cov.date >= dateFrom && cov.date <= dateTo) {
                covValue += cov.covered_percent
                covCount += 1
              }
            })

            project.builds.forEach(build => {
              if (build.date >= dateFrom && build.date <= dateTo) {
                buildValue += +build.success
                buildCount += 1
              }
            })
          })

          coverage.push(covValue/covCount)
          builds.push(buildValue/buildCount)
        }
      })

      return {
        dateRanges,
        dateFirst,
        dateLast,
        coverage,
        builds
      }
    })
}

export default {
  getStats,
  getRepos,
  getRepo,
  getCommits,
  getProjects,
  getProject
}

export {
  getStats,
  getRepos,
  getRepo,
  getCommits,
  getProjects,
  getProject
}


