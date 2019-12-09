import React, { Component, useEffect } from 'react';
import { withRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import withSizes from 'react-sizes';
import { Visibility } from 'semantic-ui-react';
import MatchGame from './Match';
import Register from './Register';
import Verify from './Verify/';
import Profile from './Profile/';
import Terms from './Terms/';
import About from './About/';
import Landing from './Landing/';
import Dashboard from './Dashboard/';
import Footer from './Footer';
import NavBar from './NavBar';
import { Checkout, Login, Lost, Reset } from '/';

const PrivateRoute = ({
  component: Component,
  title,
  loggedIn = false,
  ...rest
}) => {
  useEffect(() => {
    title &&
      (document.title = [process.env.REACT_APP_WEBSITE_NAME, title].join(
        ' | '
      ));
  });
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
  useEffect(() => {
    title &&
      (document.title = [process.env.REACT_APP_WEBSITE_NAME, title].join(
        ' | '
      ));
  });
  return (
    (!loggedIn && (
      <Route render={props => <Component {...props} {...rest} />} {...rest} />
    )) || <Route render={props => <Landing {...props} {...rest} />} {...rest} />
  );
};

const PublicRoute = ({ component: Component, title, ...rest }) => {
  useEffect(() => {
    title &&
      (document.title = [process.env.REACT_APP_WEBSITE_NAME, title].join(
        ' | '
      ));
  });
  return (
    <Route render={props => <Component {...props} {...rest} />} {...rest} />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixTopMenu: false
    };
  }
  componentDidMount() {
    this.props.fetchAuth();
  }

  stickTopMenu = () => {
    this.setState({ fixTopMenu: true });
  };

  unstickTopMenu = () => {
    this.setState({ fixTopMenu: false });
  };

  render() {
    const { fixTopMenu } = this.state;

    const {
      accountType,
      credits,
      googlePicture,
      error,
      isMobile,
      loaded,
      loggedIn,
      username
    } = this.props;

    if (!loaded) return null;
    if (error) return <div>Error component here...</div>;

    return (
      <NavBar
        credits={credits}
        fixTopMenu={fixTopMenu}
        googlePicture={googlePicture}
        isMobile={isMobile}
        loggedIn={loggedIn}
        username={username}
      >
        <Visibility
          as="div"
          className="page-wrapper"
          onTopPassed={this.stickTopMenu}
          onTopPassedReverse={this.unstickTopMenu}
          offset={0}
          once={false}
        >
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
              component={MatchGame}
              isMobile={isMobile}
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
            <PublicRoute component={Landing} />
          </Switch>
        </Visibility>
        <Footer />
      </NavBar>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768
});

export default connect(
  mapStateToProps,
  actions
)(withRouter(withSizes(mapSizesToProps)(App)));
