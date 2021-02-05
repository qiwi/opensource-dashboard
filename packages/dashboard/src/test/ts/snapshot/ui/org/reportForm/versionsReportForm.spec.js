import React from 'react'
import { PijmaContext } from '../../../../pijmaContext'
import { render } from '@testing-library/react'
import { VersionsReportForm } from '../../../../../../main/ts/components/org/reportForm/'
import { versionsDefault } from '../../../../../../main/ts/components/page/reporter'
import '@testing-library/jest-dom/extend-expect'

describe('VersionsReportForm', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PijmaContext>
        <VersionsReportForm
          data={versionsDefault}
          setData={() => {
            /* noop */
          }}
        />
      </PijmaContext>,
    )
    expect(container).toMatchSnapshot()
  })
})
