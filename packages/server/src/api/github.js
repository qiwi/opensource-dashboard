import Octokit from '@octokit/rest'

const octokit = new Octokit()

export function getRepos(opts) {
  return octokit
    .repos
    .getForOrg(opts)
}

export function getRepo(opts) {
  return octokit
    .repos
    .get(opts)
}

function getCommits(opts) {
  return octokit
    .repos
    .getCommits(opts)
}

function getRefs(opts) {
  octokit.gitdata.getReference(opts)
}

export default {
  octokit,
  getRepos,
  getRepo,
  getCommits
}