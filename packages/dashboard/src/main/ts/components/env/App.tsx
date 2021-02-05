import { cache, CacheProvider, ThemeProvider, themes } from '@qiwi/pijma-core'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Header } from '../org/header'
import { Crawler } from '../page/crawler'
import { Reporter } from '../page/reporter'
import { Content } from './content'
import { Root } from './root'
import { Spreader } from './spreader'
function App() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={themes.orange}>
        <Router>
          <Root>
            <Content>
              <Header />
              <Spreader>
                <Switch>
                  <Route path="/crawler">
                    <Crawler />
                  </Route>
                  <Route path="/">
                    <Reporter />
                  </Route>
                </Switch>
              </Spreader>
            </Content>
          </Root>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
