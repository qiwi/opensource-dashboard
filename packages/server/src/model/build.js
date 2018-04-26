export default class Build {
  constructor(data) {
    this.success = data.result === 0
    this.sha = data.commit
  }
}