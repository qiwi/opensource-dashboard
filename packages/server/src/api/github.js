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

export default {
  octokit,
  getRepos,
  getRepo
}