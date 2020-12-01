import { Card, FlexItem, Striper } from '@qiwi/pijma-core'
import { BlockContent } from '@qiwi/pijma-desktop'
import React, { useEffect, useState } from 'react'

import { treeReportService } from '../../../../../service'

export const DashboardList = () => {
  const [report, setReport] = useState([])
  useEffect(() => {
    // @ts-ignore
    treeReportService.getTreeReport().then(data => setReport(data))
  }, [])

  return (
    <Card m={20} r={12} pl={12} pr={12} pt={4} pb={4} bg="#fff" s="0 1px 2px 0 rgba(0, 0, 0, 0.12)">
         <Striper>
          {report.map(item => (
            <BlockContent key={Math.random()}>
            <Card r={10}>
              {/* @ts-ignore */}
              <FlexItem>{`VSC: ${item.vcs}, repo: ${item.repo.replaceAll('%2F', '/')}`}</FlexItem>
            </Card>
            </BlockContent>
          ))}
         </Striper>
    </Card>
  )
}
