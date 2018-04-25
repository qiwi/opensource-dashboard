export default class CommitModel {
  constructor(data) {
    const {commit} = data

    this.sha = data.sha
    this.author = commit.author
    this.committer = commit.committer
    this.date = new Date(commit.committer.date)
    this.message = data.message
  }
}