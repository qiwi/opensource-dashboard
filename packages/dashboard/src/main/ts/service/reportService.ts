import axios from 'axios'

const getReport = (type: string, data: Record<string, string>) => {
  return axios.get(
    `http://jslab-repocrawler-api.testing.qiwi.com/reporter/${type}`,
    { params: data },
  )
}

export const reportService = {
  getReport,
}
