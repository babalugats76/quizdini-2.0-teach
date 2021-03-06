import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch, matchPath } from 'react-router-dom';
import { Container, List } from 'semantic-ui-react';
import { Badge } from '../UI/';
import Account from './Account';
import Payment from './Payment';
import Password from './Password';

/**
 * Ordering of routes is important!
 * This is the order they will be listed in the Switch
 *
 * Use `displayOrder` property to control menu order
 */
const routes = [
  {
    path: 'payments',
    text: 'Payments',
    exact: false,
    component: Payment,
    displayOrder: 1,
    localOnly: false,
    icon: 'credit-card',
    id: 'payments'
  },
  {
    path: 'password',
    text: 'Change Password',
    exact: false,
    component: Password,
    displayOrder: 2,
    localOnly: true,
    icon: 'key'
  },
  {
    path: '',
    text: 'Account',
    exact: false,
    component: Account,
    displayOrder: 0,
    localOnly: false,
    icon: 'avatar'
  }
];

const Profile = ({ match, history, accountType }) => {
  const { path: basePath } = match || {};

  const { path: activePath } = routes.find(route => {
    let { location: { pathname } = {} } = history || {},
      { path, exact } = route || {},
      routePath = `${basePath}/${path}`;
    return matchPath(pathname, { path: routePath, exact });
  });

  const renderMenu = accountType => {
    return (
      <List
        className="icon-menu-list"
        horizontal
        link
        selection
        size="large"
        verticalAlign="top"
      >
        {routes
          .filter(route => {
            return !(route.localOnly && accountType === 'google');
          })
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(({ text, path, icon }, idx) => {
            return (
              <List.Item
                key={idx}
                as={Link}
                to={`${basePath}/${path}`}
                active={path === activePath}
              >
                <Badge icon={icon} />
                <List.Content>
                  <List.Header>{text}</List.Header>
                </List.Content>
              </List.Item>
            );
          })}
      </List>
    );
  };

  const renderPage = accountType => {
    return (
      <Switch>
        {routes
          .filter(route => {
            return !(route.localOnly && accountType === 'google');
          })
          .map(({ path, exact, component }, idx) => {
            return (
              <Route
                component={component}
                exact={exact}
                key={idx}
                path={`${basePath}/${path}`}
              />
            );
          })}
      </Switch>
    );
  };

  return (
    <Container className="page" fluid id="profile">
      {renderMenu(accountType)}
      {renderPage(accountType)}
    </Container>
  );
};

Profile.propTypes = {
  accountType: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default Profile;
