import React from 'react'
import { PijmaContext } from '../../../pijmaContext'
import { render } from '@testing-library/react'
import { Reporter } from '../../../../../main/ts/components/page/reporter/reporter'
import '@testing-library/jest-dom/extend-expect'

describe('Reporter', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PijmaContext>
        <Reporter />
      </PijmaContext>,
    )
    expect(container).toMatchSnapshot()
  })
})
