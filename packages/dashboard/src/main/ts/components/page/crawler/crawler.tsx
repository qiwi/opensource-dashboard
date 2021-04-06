import { Block, Box, Flex } from '@qiwi/pijma-core'
import { Button, TextField } from '@qiwi/pijma-desktop'
import React, { useState, useEffect, Fragment } from 'react'
import { crawlerService } from '../../../service'
import { useAsync } from '../../../hooks/useAsyncExecutor'

export const Crawler = () => {
  const [getStatus, statusStatus, isRunning] = useAsync(
    crawlerService.getStatus,
  )
  const [stopCrawler, statusStopCrawler] = useAsync(crawlerService.stop)
  const [startCrawler, statusStartCrawler] = useAsync(crawlerService.stop)
  const [secret, setSecret] = useState('')

  useEffect(() => {
    getStatus()
  }, [])

  return (
    <Flex mt={6}>
      <Block css={{ width: '100%', padding: '48px' }}>
        {statusStatus === 'pending' ||
        statusStopCrawler === 'pending' ||
        statusStartCrawler === 'pending' ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            <Box mb={'24px'} width={64}>
              <TextField
                title={'Secret'}
                type="password"
                value={secret}
                onChange={setSecret}
              />
            </Box>
            <Box width={64}>
              <Button
                type="button"
                kind="brand"
                size="normal"
                text={
                  isRunning === true
                    ? 'Остановить круалинг'
                    : '"Начать крулинг"'
                }
                onClick={
                  isRunning === true
                    ? () => stopCrawler(secret)
                    : () => startCrawler(secret)
                }
              />
            </Box>
          </Fragment>
        )}
      </Block>
    </Flex>
  )
}
