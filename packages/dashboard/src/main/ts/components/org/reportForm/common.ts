export type TReportProps = {
  data: {
    type: string
    depType: string
    packageNamePattern: string
    source: string
    versionRange?: string
  }
  setData: (args: Record<string, any>) => void
}
