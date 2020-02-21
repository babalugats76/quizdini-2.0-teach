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
    displayOrder: 1,
    id: 'cookies'
  },
  {
    path: 'privacy',
    text: 'Privacy Policy',
    exact: false,
    component: Privacy,
    displayOrder: 2,
    id: 'privacy'
  },
  {
    path: '',
    text: 'Terms & Conditions',
    exact: false,
    component: Conditions,
    displayOrder: 0,
    id: 'conditions'
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
    <Container as="section" className="page large" id="terms" fluid>
      <Grid columns={2} container stackable>
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
          <Switch>
            {routes.map(({ exact, component: Component, id, path }, idx) => {
              return (
                <Route
                  key={idx}
                  path={`${basePath}/${path}`}
                  exact={exact}
                  render={() => (
                    <Component
                      as="section"
                      className="terms"
                      id={id}
                      padded="very"
                    />
                  )}
                />
              );
            })}
          </Switch>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Terms;
