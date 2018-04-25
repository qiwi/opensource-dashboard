export default class RepoModel {
  constructor(data) {
    this.name = data.name
    this.fullName = data.full_name
    this.description = data.description
  }
}