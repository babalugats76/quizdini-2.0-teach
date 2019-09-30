import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Sidebar, Image, Icon, Menu } from 'semantic-ui-react';

import logo from '../logo.svg';

const navStyles = {
  backgroundColor: '#1a1c57',
  // eslint-disable-next-line
  backgroundColor: 'rgb(26, 28, 87)',
  color: '#ffffff',
  borderRadius: '0',
  marginBottom: '2em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handlePusherClick = () => {
    console.log('handle pushed clicked!');
    const { visible } = this.state;
    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => {
    console.log('toggle clicked...');
    this.setState({ visible: !this.state.visible });
  };

  // conditional render of bars, based upon Responsive
  render() {
    const { children, loggedIn, credits, isMobile } = this.props;
    const { visible } = this.state;
    const navItems = [
      {
        key: 'logo',
        as: Link,
        to: '/dashboard',
        content: <Image size="mini" src={logo} />,
        position: 'left',
        loggedIn: true,
        sidebar: false
      },
      {
        key: 'logo',
        as: Link,
        to: '/',
        content: <Image size="mini" src={logo} />,
        position: 'left',
        loggedIn: false,
        sidebar: false
      },
      {
        key: 'dashboard',
        as: Link,
        to: '/dashboard',
        content: 'Dashboard',
        position: 'left',
        loggedIn: true,
        sidebar: true
      },
      {
        key: 'credits',
        as: null,
        to: null,
        content: `Credits: ${credits}`,
        position: 'left',
        loggedIn: true,
        sidebar: false
      },
      {
        key: 'buy',
        as: Link,
        to: '/credits',
        content: 'Buy Credits',
        position: 'left',
        loggedIn: true,
        sidebar: true
      },
      {
        key: 'profile',
        as: Link,
        to: '/profile',
        content: 'Profile',
        position: 'left',
        loggedIn: true,
        sidebar: true
      },
      {
        key: 'logout',
        as: 'a',
        href: '/api/logout',
        content: 'Logout',
        position: 'right',
        loggedIn: true,
        sidebar: false
      },
      {
        key: 'register',
        as: Link,
        to: '/register',
        content: 'Register',
        position: 'right',
        loggedIn: false,
        sidebar: false
      },
      {
        key: 'login',
        as: Link,
        to: '/login',
        content: 'Login',
        position: 'right',
        loggedIn: false,
        sidebar: false
      }
    ];

    const sidebarItems = navItems
      .filter(item => {
        return item.sidebar && loggedIn === item.loggedIn;
      })
      .map(item => {
        const { key, as, position, content, loggedIn, sidebar, ...rest } = item;
        return (
          <Menu.Item
            link={!!as}
            key={key}
            as={as}
            position={position}
            content={content}
            tabIndex={-1}
            {...rest}
          />
        );
      });

    const topbarItems = navItems
      .filter(item => {
        return (
          loggedIn === item.loggedIn &&
          ((isMobile && !item.sidebar) || !isMobile)
        );
      })
      .map(item => {
        const { key, as, position, content, loggedIn, sidebar, ...rest } = item;
        return (
          <Menu.Item
            link={!!as}
            key={key}
            as={as}
            position={position}
            content={content}
            tabIndex={-1}
            {...rest}
          />
        );
      });

    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="left"
          inverted
          vertical
          style={{ width: '240px' }}
          visible={visible}
          size="massive"
        >
          {sidebarItems}
        </Sidebar>
        <Sidebar.Pusher
          dimmed={visible}
          onClick={isMobile && visible ? this.handlePusherClick : null}
        >
          <Menu
            style={navStyles}
            as="nav"
            fixed="top"
            borderless
            inverted
            size="massive"
          >
            {sidebarItems.length > 0 && isMobile && (
              <Menu.Item
                key="sidebar"
                as="a"
                position="left"
                onClick={this.handleToggle}
              >
                <Icon name="sidebar" />
              </Menu.Item>
            )}
            <Container>{topbarItems}</Container>
          </Menu>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

NavBar.propTypes = {
  children: PropTypes.any,
  credits: PropTypes.number,
  loggedIn: PropTypes.bool,
  isMobile: PropTypes.bool.isRequired
};

export default NavBar;
