import { cache, CacheProvider, ThemeProvider, themes } from '@qiwi/pijma-core'
import React from 'react'

import { Dashboard } from '../page/dashboard'
import { Content } from './content'
import { Root } from './root'
import { Spreader } from './spreader'

function App() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={themes.orange}>
        <Root>
          <Content>
            <Spreader>
              <Dashboard />
            </Spreader>
          </Content>
        </Root>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
