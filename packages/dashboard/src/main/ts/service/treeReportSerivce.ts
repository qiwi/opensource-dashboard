import typescriptReport from './typescript.json'

const getTreeReport = () => {
  return new Promise((resolve) => resolve(typescriptReport.data[0].repos))
}

export const treeReportService = {
  getTreeReport,
}
