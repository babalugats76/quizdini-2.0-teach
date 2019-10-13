import React from 'react';
import { Switch, Route, Link, matchPath } from 'react-router-dom';
import { Segment, Menu, Grid } from 'semantic-ui-react';
import Values from './Values';
import Team from './Team';
import FAQ from './FAQ';

//const Dummy = () => <h1>Dummy!</h1>;

const routes = [
  {
    path: 'team',
    text: 'The Team',
    exact: false,
    component: Team,
    displayOrder: 0
  },
  {
    path: 'faq',
    text: 'FAQ',
    exact: false,
    component: FAQ,
    displayOrder: 2
  },
  {
    path: '',
    text: 'Our Values',
    exact: false,
    component: Values,
    displayOrder: 1
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
  );
};

export default index;
