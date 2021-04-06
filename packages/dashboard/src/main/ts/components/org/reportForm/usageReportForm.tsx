import React from 'react'
import { Box } from '@qiwi/pijma-core'
import { RadioField, TextField } from '@qiwi/pijma-desktop'
import { TReportProps } from './common'

export const UsageReportForm = ({ data, setData }: TReportProps) => (
  <div>
    <Box mb={'24px'} width={64}>
      <TextField
        title={'packageNamePattern'}
        type="text"
        value={data.packageNamePattern}
        onChange={(data) => setData({ type: 'packageNamePattern', data })}
      />
    </Box>
    <Box mb={'24px'} width={64}>
      <TextField
        title={'versionRange'}
        type="text"
        value={data.versionRange || ''}
        onChange={(data) => setData({ type: 'versionRange', data })}
      />
    </Box>
    <Box mb={'24px'}>
      <RadioField
        title="depType"
        options={[
          {
            label: 'optional',
            value: 'optional',
          },
          {
            label: 'peer',
            value: 'peer',
          },
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'dev',
            value: 'dev',
          },
          {
            label: 'all',
            value: 'all',
          },
        ]}
        value={data.depType}
        onChange={(data) => setData({ type: 'depType', data })}
      />
    </Box>
    <Box mb={'24px'}>
      <RadioField
        title="source"
        options={[
          {
            label: 'auto',
            value: 'auto',
          },
          {
            label: 'lock',
            value: 'lock',
          },
          {
            label: 'package',
            value: 'package',
          },
        ]}
        value={data.source}
        onChange={(data) => setData({ type: 'source', data })}
      />
    </Box>
  </div>
)
