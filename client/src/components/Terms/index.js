import React from 'react';
import { Switch, Route, Link, matchPath } from 'react-router-dom';
import { Container, Grid, Menu, Segment } from 'semantic-ui-react';
import Conditions from './Conditions';
import Cookie from './Cookie';
import Privacy from './Privacy';

const routes = [
  {
    path: 'cookies',
    text: 'Cookie Policy',
    exact: false,
    component: Cookie,
    displayOrder: 1
  },
  {
    path: 'privacy',
    text: 'Privacy Policy',
    exact: false,
    component: Privacy,
    displayOrder: 2
  },
  {
    path: '',
    text: 'Terms of Use',
    exact: false,
    component: Conditions,
    displayOrder: 0
  }
];

const Terms = ({ match, history }) => {
  const { path: basePath } = match || {};

  const { path: activePath } = routes.find(route => {
    let { location: { pathname } = {} } = history || {},
      { path, exact } = route || {},
      routePath = `${basePath}/${path}`;
    return matchPath(pathname, { path: routePath, exact });
  });

  return (
    <Container as="main" className="page" id="terms" fluid>
      <Grid stackable columns={2}>
        <Grid.Column width={5}>
          <Segment textAlign="center">
            <Menu fluid vertical>
              {routes
                .concat()
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map(({ text, path }, idx) => {
                  return (
                    <Menu.Item
                      key={idx}
                      as={Link}
                      to={`${basePath}/${path}`}
                      active={path === activePath}
                    >
                      {text}
                    </Menu.Item>
                  );
                })}
            </Menu>
          </Segment>
        </Grid.Column>
        <Grid.Column width={11}>
          <Segment as="section" padded="very">
            <Switch>
              {routes.map(({ path, exact, component }, idx) => {
                return (
                  <Route
                    key={idx}
                    path={`${basePath}/${path}`}
                    exact={exact}
                    component={component}
                  />
                );
              })}
            </Switch>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Terms;
