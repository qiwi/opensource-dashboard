import axios from '../common/transport'

const URL = 'https://api.codeclimate.com/v1'

function getBuilds(repoId) {
  const url = `${URL}/repos/${repoId}/builds`

  return axios
    .get(url)
}

function getRepo(opt) {
  const {owner, repo} = opt
  const url = `${URL}/repos?github_slug=${owner}/${repo}`

  return axios
    .get(url)
}

function getSnapshot(repoId, snapshotId) {
  const url = `${URL}/repos/${repoId}/snapshots/${snapshotId}`

  return axios
    .get(url)
}

export {
  getRepo,
  getBuilds,
  getSnapshot
}

export default {
  getRepo,
  getBuilds,
  getSnapshot
}