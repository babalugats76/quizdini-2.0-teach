import React from 'react';
import { Switch, Route, Link, matchPath } from 'react-router-dom';
import { Container, Grid, Menu, Segment } from 'semantic-ui-react';
import Team from './Team';
import Philosophy from './Philosophy';
import FAQ from './FAQ';
import Attribution from './Attribution';
import Dedication from './Dedication';

const routes = [
  {
    path: 'philosophy',
    text: 'Philosophy',
    exact: false,
    component: Philosophy,
    displayOrder: 1
  },
  {
    path: 'faq',
    text: 'FAQ',
    exact: false,
    component: FAQ,
    displayOrder: 2
  },
  {
    path: 'attribution',
    text: 'Attribution',
    exact: false,
    component: Attribution,
    displayOrder: 3
  },
  {
    path: 'dedication',
    text: 'Dedication',
    exact: false,
    component: Dedication,
    displayOrder: 4
  },
  {
    path: '',
    text: 'The Team',
    exact: false,
    component: Team,
    displayOrder: 0
  }
];

const index = ({ match, history }) => {
  const { path: basePath } = match || {};

  const { path: activePath } = routes.find(route => {
    let { location: { pathname } = {} } = history || {},
      { path, exact } = route || {},
      routePath = `${basePath}/${path}`;
    return matchPath(pathname, { path: routePath, exact });
  });

  return (
    <Container as="main" className="page">
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
          <Segment as="section" className="about" padded="very">
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

export default index;
