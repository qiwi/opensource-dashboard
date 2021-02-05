import React from 'react'
import { PijmaContext } from '../../../pijmaContext'
import { render } from '@testing-library/react'
import { Crawler } from '../../../../../main/ts/components/page/crawler'
import '@testing-library/jest-dom/extend-expect'

describe('Crawler', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PijmaContext>
        <Crawler />
      </PijmaContext>,
    )
    expect(container).toMatchSnapshot()
  })
})
