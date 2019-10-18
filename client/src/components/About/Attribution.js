import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
export default ({ id }) => (
  <Segment as="section" id={id} padded="very">
    <Header size="huge" textAlign="center">
      Attribution
    </Header>
    <br />
  </Segment>
);
