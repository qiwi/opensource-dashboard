import { Box, Flex, FlexItem, Lnk } from '@qiwi/pijma-core'
import { Header as PijmaHeader, HeaderMenu } from '@qiwi/pijma-desktop'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const Header = () => {
  const { pathname } = useLocation()
  const history = useHistory()
  return (
    <PijmaHeader underline={true}>
      <Flex width={1} height={1} justify="space-between">
        <FlexItem ml={6}>
          <Flex height={1}>
            <FlexItem align="center" shrink={0} mr={11}>
              <Lnk href={window.location.href}>
                <Box
                  as="img"
                  // @ts-ignore
                  src="https://static.qiwi.com/img/qiwi_com/header/qiwi-wallet-logo.svg"
                  width={24}
                  height={12}
                />
              </Lnk>
            </FlexItem>
            <FlexItem shrink={0} mr={6}>
              <HeaderMenu>
                {[
                  {
                    title: 'Reporter',
                    active: pathname === '/',
                    onClick: () => history.push('/'),
                  },
                  {
                    title: 'Crawler',
                    onClick: () => history.push('/crawler'),
                    active: pathname === '/crawler',
                  },
                ]}
              </HeaderMenu>
            </FlexItem>
          </Flex>
        </FlexItem>
      </Flex>
    </PijmaHeader>
  )
}
