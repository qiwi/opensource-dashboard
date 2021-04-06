import { Block, Card, Flex, Box } from '@qiwi/pijma-core'
import { Button, HeaderMenu } from '@qiwi/pijma-desktop'
import React, { useReducer } from 'react'
import { reportService } from '../../../service'
import { useAsync } from '../../../hooks/useAsyncExecutor'

import {
  TreeReportForm,
  VersionsReportForm,
  UsageReportForm,
  TReportProps,
} from '../../org/reportForm'
import { defaultTypes, treeDefault } from './constants'

function downloadObjectAsJson(exportObj: any, exportName: string) {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', exportName + '.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

const reducer = (
  state: Record<string, string>,
  action: Record<string, string>,
) => {
  if (action.type === 'type') {
    return defaultTypes[action.data as 'usage' | 'versions' | 'tree']
  }

  return { ...state, [action.type]: action.data }
}

const getReport = async ({
  type,
  depType,
  packageNamePattern,
  source,
  versionRange,
}: any) => {
  versionRange = versionRange || undefined
  const result = await reportService.getReport(type, {
    depType,
    packageNamePattern,
    source,
    versionRange,
  })

  downloadObjectAsJson(result, `${type}Report`)
}

export const Reporter = () => {
  const [data, setData] = useReducer(reducer, treeDefault)
  const [execute, status] = useAsync(getReport)
  return (
    <Flex mt={6}>
      <Block css={{ width: '100%', padding: '48px' }}>
        <Card width={1} height={14} mb={'32px'}>
          <HeaderMenu>
            {[
              {
                title: 'tree',
                active: data.type === 'tree',
                onClick: () => setData({ type: 'type', data: 'tree' }),
              },
              {
                title: 'usage',
                active: data.type === 'usage',
                onClick: () => setData({ type: 'type', data: 'usage' }),
              },
              {
                title: 'versions',
                active: data.type === 'versions',
                onClick: () => setData({ type: 'type', data: 'versions' }),
              },
            ]}
          </HeaderMenu>
        </Card>
        {
          {
            tree: (
              <TreeReportForm
                data={data as TReportProps['data']}
                setData={setData}
              />
            ),
            usage: (
              <UsageReportForm
                data={data as TReportProps['data']}
                setData={setData}
              />
            ),
            versions: (
              <VersionsReportForm
                data={data as TReportProps['data']}
                setData={setData}
              />
            ),
          }[data.type as 'usage' | 'versions' | 'tree']
        }
        <Box width={64}>
          <Button
            loading={status === 'pending'}
            disabled={status === 'pending'}
            type="button"
            kind="brand"
            size="normal"
            text="Получить отчет"
            onClick={() => execute(data)}
          />
        </Box>
      </Block>
    </Flex>
  )
}
