import axios from 'axios'

const stop = async (secret: string) => {
  return axios.post(
    'http://jslab-repocrawler-api.testing.qiwi.com/crawler/stop',
    {},
    {
      headers: {
        'Magic-Auth': secret,
      },
    },
  )
}

const start = async (secret: string) => {
  return axios.post(
    'http://jslab-repocrawler-api.testing.qiwi.com/crawler/start',
    {},
    {
      headers: {
        'Magic-Auth': secret,
      },
    },
  )
}

const getStatus = async () => {
  return axios
    .get('http://jslab-repocrawler-api.testing.qiwi.com/crawler/status')
    .then(({ data }) => data.running)
}

export const crawlerService = {
  getStatus,
  start,
  stop,
}
