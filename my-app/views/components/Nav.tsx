import React from 'react'

import { Affix, Button, Layout, Menu, Space } from 'antd'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

const { Header } = Layout

const { Item } = Menu

const Nav = () => {
  const [session] = useSession()
  const subMenuLogin =
    session && session.user.name ? (
      <Space>
        <Button onClick={signOut} type='primary'>
          Sign Out
        </Button>
      </Space>
    ) : (
      <Item key='/login'>
        <Button onClick={signIn} type='primary'>
          Sign In
        </Button>
      </Item>
    )

  return (
    <Affix offsetTop={0} className='app__affix-header'>
      <Header className='app-header'>
        <div className='app-header__logo-search-section'>
          <div className='app-header__logo'>
            <Link href='/'>
              <img
                src='https://avatars.githubusercontent.com/u/64237612?s=200&v=4'
                alt='App logo'
              />
            </Link>
          </div>
        </div>
        {session && session.user.name ? (
          <h1 className='signIn-name'>Hello, {session.user.name}</h1>
        ) : (
          <div></div>
        )}
        <div className='app-header__menu-section'>
          <Menu mode='vertical' selectable={false} className='menu'>
            {subMenuLogin}
          </Menu>
        </div>
      </Header>
    </Affix>
  )
}

export default Nav
