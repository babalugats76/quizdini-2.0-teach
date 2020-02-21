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
    displayOrder: 1,
    id: 'philosophy'
  },
  {
    path: 'faq',
    text: 'FAQ',
    exact: false,
    component: FAQ,
    displayOrder: 2,
    id: 'faq'
  },
  {
    path: 'attribution',
    text: 'Attribution',
    exact: false,
    component: Attribution,
    displayOrder: 3,
    id: 'attribution'
  },
  {
    path: 'dedication',
    text: 'Dedication',
    exact: false,
    component: Dedication,
    displayOrder: 4,
    id: 'dedication'
  },
  {
    path: '',
    text: 'The Team',
    exact: false,
    component: Team,
    displayOrder: 0,
    id: 'team'
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
    <Container as="section" className="page large" id="about" fluid>
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
            {routes.map(({ path, exact, component: Component, id }, idx) => {
              return (
                <Route
                  key={idx}
                  path={`${basePath}/${path}`}
                  exact={exact}
                  render={() => (
                    <Component
                      as="section"
                      className="about"
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

export default index;
