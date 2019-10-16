import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import logo from '../../logo.svg';
import payToPlay from '../../pay-to-play.svg';
import easel from '../../easel.svg';

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
      <Image
        alt="Quizdini Logo"
        floated="right"
        className="easel"
        size="medium"
        src={easel}
      />
      <p>Better stuff</p>
    </Segment>
  </div>
);
