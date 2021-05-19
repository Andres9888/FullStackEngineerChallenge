import React from 'react'
import Link from 'next/link'
import { Layout, Avatar, Affix, Input, Button, Icon, Menu } from 'antd'
import { signIn, signOut, useSession } from 'next-auth/client'



const { Header } = Layout

const { Item, SubMenu } = Menu

const NavBlank = ({  }) =>{
  const [session, loading] = useSession()
  const subMenuLogin =
    session && session.user.name ? (
      <SubMenu title={<Avatar />}>
        {session.user.name}
        <Button onClick={signOut} type="primary">Sign Out</Button>
      </SubMenu>
    ) : (
      <Item key="/login">
          <Button onClick={signIn} type="primary">Sign In</Button>
      </Item>
    );
  
  
  return(
    <Affix offsetTop={0} className='app__affix-header'>
      <Header className='app-header'>
        <div className='app-header__logo-search-section'>
          <div className='app-header__logo'>
          <Link href="/">
              <h1>home</h1>
            </Link>
          </div>
        </div>
        <div className="app-header__menu-section">
        <Menu mode="horizontal" selectable={false} className="menu">
        {subMenuLogin}
    </Menu>
        </div>
      </Header>
    </Affix>)}
    


export default NavBlank

