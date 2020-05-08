import React from 'react'
import Link from 'next/link'
import { Heading } from '@codeday/topo/Atom/Text';
import Header, { SiteLogo, Menu } from '@codeday/topo/Organism/Header';
import { CsFest } from '@codeday/topo/Atom/Logo';
import Content from '@codeday/topo/Molecule/Content';

const Layout = ({children, extendMenu}) => (
  <div>
    <Header underscore>
      <SiteLogo>
        <CsFest as="a" href="/" fontSize="4xl" withText text="Quick Deploy" />
      </SiteLogo>
      <Menu>
        {extendMenu}
      </Menu>
    </Header>
    <Content>
      {children}
    </Content>
  </div>
)


export default Layout
