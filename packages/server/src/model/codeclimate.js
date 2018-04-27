export default class Codeclimate {
  constructor(data) {
    const {attributes} = data


    if (attributes.ratings && attributes.ratings.length) {
      const measure = attributes.ratings[0].measure
      this.debtRatio = measure.value
      this.debtEst = measure.meta.remediation_time.value
    }

    this.sha = attributes.commit_sha
    this.lines = attributes.lines_of_code
  }
}