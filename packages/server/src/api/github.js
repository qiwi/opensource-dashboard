import Octokit from '@octokit/rest'

const octokit = new Octokit()

export function getRepos(opts) {
  return octokit
    .repos
    .getForOrg(opts)
}

export default {
  octokit,
  getRepos
}