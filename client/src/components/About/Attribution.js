import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      <Header.Content>Attribution</Header.Content>
    </Header>
    <br />
  </Segment>
);
