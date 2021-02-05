import React from 'react'
import { PijmaContext } from '../../../../pijmaContext'
import { render } from '@testing-library/react'
import { TreeReportForm } from '../../../../../../main/ts/components/org/reportForm/'
import '@testing-library/jest-dom/extend-expect'
import { treeDefault } from '../../../../../../main/ts/components/page/reporter'

describe('TreeReportForm', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PijmaContext>
        <TreeReportForm
          data={treeDefault}
          setData={() => {
            /* noop */
          }}
        />
      </PijmaContext>,
    )
    expect(container).toMatchSnapshot()
  })
})
