import React from 'react'
import { PijmaContext } from '../../../../pijmaContext'
import { render } from '@testing-library/react'
import { UsageReportForm } from '../../../../../../main/ts/components/org/reportForm/'
import '@testing-library/jest-dom/extend-expect'
import { usageDefault } from '../../../../../../main/ts/components/page/reporter'

describe('UsageReportForm', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PijmaContext>
        <UsageReportForm
          data={usageDefault}
          setData={() => {
            /* noop */
          }}
        />
      </PijmaContext>,
    )
    expect(container).toMatchSnapshot()
  })
})
