import { cache, CacheProvider, ThemeProvider, themes } from '@qiwi/pijma-core'
import React from 'react'

export function PijmaContext({ children }: { children: React.Component }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={themes.orange}>{children}</ThemeProvider>
    </CacheProvider>
  )
}
