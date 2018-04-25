export default class GithubRepoModel {
  constructor(opts) {
    this.name = opts.name
    this.fullName = opts.full_name
    this.description = opts.description
  }
}