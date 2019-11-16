import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      <Header.Content>Attribution</Header.Content>
      <Header.Subheader>Giving Credit Where Credit Is Due</Header.Subheader>
    </Header>
    <Header size="large" icon textAlign="center">
      <Image
        alt="You Da Real MVP"
        className="icon bitmoji"
        src="https://static.quizdini.com/images/you-da-real-mvp.png"
      />
    </Header>
    <p className="dropcap">
      But for the toil of countless open source developers, independent software
      projects, like Quizdini, would not be possible. We wish to express our
      sincerest thanks and gratitude to those who have so selflessly developed
      and generously licensed their innovations: you truly make the world a
      better place! It would be nearly impossible to credit everyone that
      deserves it here. Instead, this page lists the projects that most directly
      impact the delivery of Quizdini.
    </p>
  </Segment>
);
