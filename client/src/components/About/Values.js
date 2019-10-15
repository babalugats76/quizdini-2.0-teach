import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import logo from '../../logo.svg';
import payToPlay from '../../pay-to-play.svg';

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
      <Image
        alt="Quizdini Logo"
        floated="right"
        className="pay-to-play"
        size="medium"
        src={payToPlay}
      />
      <p>Better stuff</p>
    </Segment>
  </div>
);
