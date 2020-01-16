import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Grid,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { useReduxData, useTitle, useWindowSize } from "../hooks/";
import { Icon, Loader } from "./UI/";
import logo from "../logo.svg";
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
} from "/";

const PrivateRoute = ({
  component: Component,
  title,
  loggedIn = false,
  ...rest
}) => {
  useTitle({ title, deps: [Component] });
  return (
    (loggedIn && (
      <Route render={props => <Component {...props} {...rest} />} {...rest} />
    )) || <Route render={props => <Landing {...props} {...rest} />} {...rest} />
  );
};

const PublicOnlyRoute = ({
  component: Component,
  title,
  loggedIn = false,
  ...rest
}) => {
  useTitle({ title, deps: [Component] });
  return (
    (!loggedIn && (
      <Route render={props => <Component {...props} {...rest} />} {...rest} />
    )) || <Route render={props => <Landing {...props} {...rest} />} {...rest} />
  );
};

const PublicRoute = ({ component: Component, title, ...rest }) => {
  useTitle({ title, deps: [Component] });
  return (
    <Route render={props => <Component {...props} {...rest} />} {...rest} />
  );
};

const App = props => {

  const auth = useSelector(state => state.auth);

  // Redux data
  const { errors } = useReduxData({ items: ["fetchAuth"], deps: [] });

  // Destructure and rename data
  const { data: user, loaded } = auth;
  const { accountType, credits, loggedIn } = user;

  // When to show loader
  const showLoader = !loaded;

  return (
    <Layout errors={errors} showLoader={showLoader} user={user}>
      <Switch>
        <PrivateRoute
          loggedIn={loggedIn}
          exact
          path="/dashboard"
          component={Dashboard}
          title="Dashboard"
          credits={credits || 0}
        />
        <PrivateRoute
          loggedIn={loggedIn}
          exact
          path="/match"
          component={Match}
        />
        <PrivateRoute
          loggedIn={loggedIn}
          exact
          path="/credits"
          component={Checkout}
          title="Buy Credits"
        />
        <PrivateRoute
          loggedIn={loggedIn}
          accountType={accountType}
          path="/profile"
          component={Profile}
          title="Profile"
        />
        <PublicRoute path="/about" component={About} title="About" />
        <PublicRoute path="/terms" component={Terms} title="Terms" />
        <PublicOnlyRoute
          loggedIn={loggedIn}
          exact
          path="/auth/google"
          render={() => <Redirect to="/auth/google" />}
        />
        <PublicOnlyRoute
          loggedIn={loggedIn}
          exact
          path="/register"
          component={Register}
          title="Sign Up"
        />
        <PublicOnlyRoute
          loggedIn={loggedIn}
          exact
          path="/verify/:secret"
          component={Verify}
          title="Verify"
        />
        <PublicOnlyRoute
          loggedIn={loggedIn}
          exact
          path="/lost"
          component={Lost}
          title="Recovery"
        />
        <PublicOnlyRoute
          loggedIn={loggedIn}
          exact
          path="/reset/:secret"
          component={Reset}
          title="Reset"
        />
        <PublicOnlyRoute
          loggedIn={loggedIn}
          exact
          path="/login"
          component={Login}
          title="Login"
        />
        <PublicRoute component={Landing} title="Home" />
      </Switch>
    </Layout>
  );
};

export default withRouter(App);

const Layout = ({ children, errors, showLoader, user }) => {
  const [state, setState] = useState({ fixTopMenu: false, showSidebar: false });
  const { fixTopMenu, showSidebar } = state;

  const stickTopMenu = () => {
    setState(prevState => {
      return {
        ...prevState,
        fixTopMenu: true
      };
    });
  };

  const unstickTopMenu = () => {
    setState(prevState => {
      return {
        ...prevState,
        fixTopMenu: false
      };
    });
  };

  const hideSidebar = () => {
    setState(prevState => {
      return {
        ...prevState,
        ...(prevState.showSidebar && { showSidebar: false })
      };
    });
  };

  const toggleMenu = () => {
    setState(prevState => {
      return {
        ...prevState,
        showSidebar: !prevState.showSidebar
      };
    });
  };

  return (
    <Sidebar.Pushable className={fixTopMenu ? "menu-is-fixed" : undefined}>
      <SidebarNav onItemClick={hideSidebar} visible={showSidebar} {...user} />
      <Sidebar.Pusher
        dimmed={showSidebar}
        onClick={showSidebar ? hideSidebar : null}
      >
        <HeaderNav fixTopMenu={fixTopMenu} onMenuClick={toggleMenu} {...user} />
        <Visibility
          as="div"
          className="page-wrapper"
          onTopPassed={stickTopMenu}
          onTopPassedReverse={unstickTopMenu}
          offset={0}
          once={false}
        >
          {(errors && <pre>{JSON.stringify(errors, null, 4)}</pre>) ||
            (showLoader && <Loader />) ||
            children}
        </Visibility>
        <Footer />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  errors: PropTypes.any,
  showLoader: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
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
      key: "dashboard",
      as: Link,
      to: "/dashboard",
      content: "Dashboard",
      position: "left",
      loggedIn: true
    },
    {
      key: "buy",
      as: Link,
      to: "/credits",
      content: "Buy Credits",
      position: "left",
      loggedIn: true
    },
    {
      key: "profile",
      as: Link,
      to: "/profile",
      content: NavProfile({ googlePicture, username }),
      position: "left",
      loggedIn: true
    },
    {
      key: "logout",
      as: "a",
      href: "/api/logout",
      content: "Logout",
      position: "left",
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
        animation="push"
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
  fixTopMenu,
  googlePicture,
  loggedIn,
  onMenuClick,
  username
}) => {
  const { isMobile } = useWindowSize();

  const navItems = [
    {
      key: "logo",
      as: Link,
      to: "/dashboard",
      content: <Image size="mini" src={logo} />,
      position: "left",
      loggedIn: true,
      mobile: true
    },
    {
      key: "logo",
      as: Link,
      to: "/",
      content: <Image size="mini" src={logo} />,
      position: "left",
      loggedIn: false,
      mobile: true
    },
    {
      key: "dashboard",
      as: Link,
      to: "/dashboard",
      content: "Dashboard",
      position: "left",
      loggedIn: true,
      mobile: false
    },
    {
      key: "credits",
      as: null,
      to: null,
      content: `Credits: ${credits}`,
      position: "left",
      loggedIn: true,
      mobile: true
    },
    {
      key: "buy",
      as: Link,
      to: "/credits",
      content: "Buy Credits",
      position: "left",
      loggedIn: true,
      mobile: false
    },
    {
      key: "profile",
      as: Link,
      to: "/profile",
      content: NavProfile({ googlePicture, username }),
      position: "left",
      loggedIn: true,
      mobile: false
    },
    {
      key: "logout",
      as: "a",
      href: "/api/logout",
      content: isMobile ? <Icon name="logout" /> : "Logout",
      position: "right",
      loggedIn: true,
      mobile: true
    },
    {
      key: "register",
      as: Link,
      to: "/register",
      content: "Register",
      position: "right",
      loggedIn: false,
      mobile: true
    },
    {
      key: "login",
      as: Link,
      to: "/login",
      content: "Login",
      position: "right",
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
    <Menu
      as="nav"
      borderless
      fixed={fixTopMenu ? "top" : undefined}
      inverted
      size="massive"
    >
      {loggedIn && isMobile && (
        <Menu.Item key="sidebar" as="a" position="left" onClick={onMenuClick}>
          <Icon name="menu" />
        </Menu.Item>
      )}
      <Container>{headerItems}</Container>
    </Menu>
  );
};

HeaderNav.propTypes = {
  credits: PropTypes.any,
  fixTopMenu: PropTypes.bool.isRequired,
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
    <Segment as="footer" id="footer" inverted vertical>
      <Container textAlign="center">
        <Grid columns={3} stackable inverted verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <List divided horizontal inverted link size="big">
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
              <List divided horizontal inverted link size="big">
                <List.Item
                  as="a"
                  href="https://twitter.com/quizdini"
                  key="twitter"
                  style={{ fill: "#ffffff" }}
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
                  style={{ fill: "#ffffff" }}
                  tabIndex={-1}
                  target="_blank"
                  title="Check us out on YouTube"
                >
                  <Icon name="youtube" />
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List horizontal inverted divided link size="big">
                <List.Item>Copyright &copy; Quizdini, 2013-2020</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};
