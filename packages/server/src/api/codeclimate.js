import axios from 'axios'

const URL = 'https://api.codeclimate.com/v1'

function getBuilds(repoId) {
  const url = `${URL}/${repoId}/builds`

  return axios
    .get(url)
}

function getRepo(name) {
  const url = `${URL}/repos?github_slug=${name}`

  return axios
    .get(url)
}

function getSnapshot(repoId, snapshotId) {
  const url = `${URL}/${repoId}/builds/${snapshotId}`

  return axios
    .get(url)
}

export {
  getRepo,
  getBuilds,
  getSnapshot
}