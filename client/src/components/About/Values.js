import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import logo from '../../logo.svg';

export default () => (
  <div>
    <Header as="h1" attached="top">
      <Header.Content>Our Values</Header.Content>
    </Header>
    <Segment Divider>
      <Image
        alt="Quizdini Logo"
        floated="right"
        className="logo"
        size="medium"
        src={logo}
      />
      <p>Better stuff</p>
    </Segment>
  </div>
);
