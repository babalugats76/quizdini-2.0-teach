import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Image,
  List,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react';
import { useReduxData, useTitle, useWindowSize } from '../hooks/';
import { ErrorMessage, Icon, Loader } from './UI/';
import logo from '../logo.svg';
import {
  About,
  Checkout,
  Dashboard,
  Landing,
  Login,
  Lost,
  Match,
  Profile,
  Register,
  Reset,
  Terms,
  Verify
} from '/';

const PrivateRoute = ({
  component: Component,
  errors,
  layout: Layout,
  loggedIn = false,
  showLoader,
  title,
  user,
  ...rest
}) => {
  useTitle({ title, deps: [Component] });
  return (
    (loggedIn && (
      <Route
        render={props => (
          <Layout errors={errors} showLoader={showLoader} user={user}>
            <Component {...props} {...rest} />
          </Layout>
        )}
        {...rest}
      />
    )) || (
      <Route
        render={props => (
          <DefaultLayout errors={errors} showLoader={showLoader} user={user}>
            <Landing {...props} {...rest} />
          </DefaultLayout>
        )}
        {...rest}
      />
    )
  );
};

const PublicOnlyRoute = ({
  component: Component,
  errors,
  layout: Layout,
  loggedIn = false,
  title,
  showLoader,
  user,
  ...rest
}) => {
  useTitle({ title, deps: [Component] });
  return (
    (!loggedIn && (
      <Route
        render={props => (
          <Layout errors={errors} showLoader={showLoader} user={user}>
            <Component {...props} {...rest} />
          </Layout>
        )}
        {...rest}
      />
    )) || (
      <Route
        render={props => (
          <DefaultLayout errors={errors} showLoader={showLoader} user={user}>
            <Landing {...props} {...rest} />
          </DefaultLayout>
        )}
        {...rest}
      />
    )
  );
};

const PublicRoute = ({
  component: Component,
  errors,
  layout: Layout,
  showLoader,
  title,
  user,
  ...rest
}) => {
  useTitle({ title, deps: [Component] });
  return (
    <Route
      render={props => (
        <Layout errors={errors} showLoader={showLoader} user={user}>
          <Component {...props} {...rest} />
        </Layout>
      )}
      {...rest}
    />
  );
};

const App = props => {
  const auth = useSelector(state => state.auth);

  // Redux data
  const { errors } = useReduxData({ items: ['fetchAuth'], deps: [] });

  // Destructure and rename data
  const { data: user, loaded } = auth;
  const { accountType, credits, loggedIn } = user;

  // When to show loader
  const showLoader = !loaded;

  const layoutProps = { errors, showLoader, user };

  return (
    <Switch>
      <PrivateRoute
        loggedIn={loggedIn}
        exact
        path="/dashboard"
        component={Dashboard}
        title="Dashboard"
        credits={credits || 0}
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PrivateRoute
        loggedIn={loggedIn}
        path="/match"
        component={Match}
        layout={FullPageLayout}
        {...layoutProps}
      />
      <PrivateRoute
        loggedIn={loggedIn}
        exact
        path="/credits"
        component={Checkout}
        title="Buy Credits"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PrivateRoute
        loggedIn={loggedIn}
        accountType={accountType}
        path="/profile"
        component={Profile}
        title="Profile"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicRoute
        path="/about"
        component={About}
        title="About"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicRoute
        path="/terms"
        component={Terms}
        title="Terms"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicOnlyRoute
        loggedIn={loggedIn}
        exact
        path="/auth/google"
        render={() => <Redirect to="/auth/google" />}
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicOnlyRoute
        loggedIn={loggedIn}
        exact
        path="/register"
        component={Register}
        title="Sign Up"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicOnlyRoute
        loggedIn={loggedIn}
        exact
        path="/verify/:secret"
        component={Verify}
        title="Verify"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicOnlyRoute
        loggedIn={loggedIn}
        exact
        path="/lost"
        component={Lost}
        title="Recovery"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicOnlyRoute
        loggedIn={loggedIn}
        exact
        path="/reset/:secret"
        component={Reset}
        title="Reset"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicOnlyRoute
        loggedIn={loggedIn}
        exact
        path="/login"
        component={Login}
        title="Login"
        layout={DefaultLayout}
        {...layoutProps}
      />
      <PublicRoute
        component={Landing}
        title="Home"
        layout={DefaultLayout}
        {...layoutProps}
      />
    </Switch>
  );
};

export default withRouter(App);

const DefaultLayout = ({ children, errors, showLoader, user }) => {
  const [showSidebar, setSidebar] = useState(false);
  const hideSidebar = () => {
    setSidebar(p => p && false);
  };

  const toggleMenu = () => {
    setSidebar(p => !p);
  };

  return (
    <Sidebar.Pushable>
      <Sidebar.Pusher
        className="page-wrapper"
        dimmed={showSidebar}
        onClick={showSidebar ? hideSidebar : null}
      >
        <HeaderNav onMenuClick={toggleMenu} {...user} />
        <div id="content">
          {(errors && <pre>{JSON.stringify(errors, null, 4)}</pre>) ||
            (showLoader && <Loader />) ||
            children}
        </div>
        <Footer />
      </Sidebar.Pusher>
      <SidebarNav onItemClick={hideSidebar} visible={showSidebar} {...user} />
    </Sidebar.Pushable>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.any,
  errors: PropTypes.any,
  showLoader: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const FullPageLayout = ({ children, errors, showLoader, user }) => {
  return (
    <div className="full-page-wrapper">
      <div id="content">
        <div className="side-menu">
          This is where full page menu would go...
        </div>
        {(errors && <ErrorMessage details={errors} />) ||
          (showLoader && <Loader />) ||
          children}
      </div>
    </div>
  );
};

const SidebarNav = ({
  googlePicture,
  loggedIn,
  onItemClick,
  username,
  visible
}) => {
  const navItems = [
    {
      key: 'dashboard',
      as: Link,
      to: '/dashboard',
      content: 'Dashboard',
      position: 'left',
      loggedIn: true
    },
    {
      key: 'buy',
      as: Link,
      to: '/credits',
      content: 'Buy Credits',
      position: 'left',
      loggedIn: true
    },
    {
      key: 'profile',
      as: Link,
      to: '/profile',
      content: NavProfile({ googlePicture, username }),
      position: 'left',
      loggedIn: true
    },
    {
      key: 'logout',
      as: 'a',
      href: '/api/logout',
      content: 'Logout',
      position: 'left',
      loggedIn: true
    }
  ];

  const sidebarItems = navItems
    .filter(item => loggedIn === item.loggedIn)
    .map(item => {
      const { key, as, position, content, loggedIn, ...rest } = item;
      return (
        <Menu.Item
          link={!!as}
          key={key}
          as={as}
          onClick={onItemClick}
          position={position}
          content={content}
          tabIndex={-1}
          {...rest}
        />
      );
    });

  return (
    (sidebarItems.length > 0 && (
      <Sidebar
        as={Menu}
        animation="overlay"
        direction="left"
        inverted
        vertical
        visible={visible}
        size="massive"
      >
        {sidebarItems}
      </Sidebar>
    )) ||
    null
  );
};

SidebarNav.propTypes = {
  googlePicture: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
  username: PropTypes.string,
  visible: PropTypes.bool.isRequired
};

const HeaderNav = ({
  credits,
  googlePicture,
  loggedIn,
  onMenuClick,
  username
}) => {
  const { isMobile } = useWindowSize();

  const navItems = [
    {
      key: 'logo',
      as: Link,
      to: '/dashboard',
      content: <Image size="mini" src={logo} />,
      position: 'left',
      loggedIn: true,
      mobile: true
    },
    {
      key: 'logo',
      as: Link,
      to: '/',
      content: <Image size="mini" src={logo} />,
      position: 'left',
      loggedIn: false,
      mobile: true
    },
    {
      key: 'dashboard',
      as: Link,
      to: '/dashboard',
      content: 'Dashboard',
      position: 'left',
      loggedIn: true,
      mobile: false
    },
    {
      key: 'credits',
      as: null,
      to: null,
      content: `Credits: ${credits}`,
      position: 'left',
      loggedIn: true,
      mobile: true
    },
    {
      key: 'buy',
      as: Link,
      to: '/credits',
      content: 'Buy Credits',
      position: 'left',
      loggedIn: true,
      mobile: false
    },
    {
      key: 'profile',
      as: Link,
      to: '/profile',
      content: NavProfile({ googlePicture, username }),
      position: 'left',
      loggedIn: true,
      mobile: false
    },
    {
      key: 'logout',
      as: 'a',
      href: '/api/logout',
      content: isMobile ? <Icon name="logout" /> : 'Logout',
      position: 'right',
      loggedIn: true,
      mobile: true
    },
    {
      key: 'register',
      as: Link,
      to: '/register',
      content: 'Register',
      position: 'right',
      loggedIn: false,
      mobile: true
    },
    {
      key: 'login',
      as: Link,
      to: '/login',
      content: 'Login',
      position: 'right',
      loggedIn: false,
      mobile: true
    }
  ];

  const headerItems = navItems
    .filter(
      item =>
        loggedIn === item.loggedIn && (!isMobile || isMobile === item.mobile)
    )
    .map(item => {
      const { key, as, position, content, loggedIn, mobile, ...rest } = item;
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
    <Menu as="header" borderless inverted size="massive">
      <Container as="nav">
        {loggedIn && isMobile && (
          <Menu.Item key="sidebar" as="a" position="left" onClick={onMenuClick}>
            <Icon name="menu" />
          </Menu.Item>
        )}
        {headerItems}
      </Container>
    </Menu>
  );
};

HeaderNav.propTypes = {
  credits: PropTypes.any,
  googlePicture: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  username: PropTypes.string
};

const NavProfile = ({ googlePicture, username }) => {
  return (
    (username && <span>{username}</span>) ||
    (googlePicture && (
      <>
        <span>Profile</span>
        <Image
          avatar
          className="profile"
          size="mini"
          spaced="right"
          src={googlePicture}
        />
      </>
    ))
  );
};

NavProfile.propTypes = {
  googlePicture: PropTypes.string,
  username: PropTypes.string
};

const Footer = props => {
  return (
    <Segment as="footer" inverted vertical>
      <Container textAlign="center">
        <Grid columns={3} stackable inverted verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <List divided horizontal inverted link size="large">
                <List.Item key="about" as={Link} to="/about" tabIndex={-1}>
                  About
                </List.Item>
                <List.Item key="terms" as={Link} to="/terms" tabIndex={-1}>
                  Terms
                </List.Item>
                <List.Item
                  key="contact"
                  href="mailto:james@colestock.com"
                  tabIndex={-1}
                >
                  Contact Us
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List divided horizontal inverted link size="large">
                <List.Item
                  as="a"
                  href="https://twitter.com/quizdini"
                  key="twitter"
                  style={{ fill: '#ffffff' }}
                  tabIndex={-1}
                  target="_blank"
                  title="Follow us on Twitter"
                >
                  <Icon name="twitter" />
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.youtube.com/user/quizdini"
                  key="youtube"
                  style={{ fill: '#ffffff' }}
                  tabIndex={-1}
                  target="_blank"
                  title="Check us out on YouTube"
                >
                  <Icon name="youtube" />
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List horizontal inverted divided link size="large">
                <List.Item>Copyright &copy; Quizdini, 2013-2020</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};
