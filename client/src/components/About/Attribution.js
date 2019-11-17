import React from 'react';
import { Divider, Header, Image, List, Segment } from 'semantic-ui-react';
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
      better place!
    </p>
    <p>
      Practically speaking, it would be nearly impossible to credit everyone
      that deserves it here; instead, this page lists the contributions most
      instrumental to the delivery of Quizdini.
    </p>
    <Divider />
    <Header size="large">Software</Header>
    <List as="ul" bulleted>
      <List.Item as="li">
        <a
          href="https://expressjs.com/"
          rel="noopener noreferrer"
          target="_blank"
          title="Express - Node.js web application framework"
        >
          Express
        </a>
        &nbsp;and related projects of the&nbsp;
        <a
          href="https://openjsf.org/"
          rel="noopener noreferrer"
          target="_blank"
          title="OpenJS Foundation"
        >
          OpenJS Foundation
        </a>
      </List.Item>
      <List.Item as="li">
        <a
          href="https://reactjs.org/"
          rel="noopener noreferrer"
          target="_blank"
          title="React – A JavaScript library for building user interfaces"
        >
          React
        </a>
        &nbsp;and related&nbsp;
        <a
          href="https://opensource.facebook.com/"
          rel="noopener noreferrer"
          target="_blank"
          title="Facebook Open Source"
        >
          Facebook Open Source
        </a>
        &nbsp;projects
      </List.Item>
      <List.Item as="li">
        <a
          href="https://semantic-ui.com/"
          rel="noopener noreferrer"
          target="_blank"
          title="Semantic UI"
        >
          Semantic UI
        </a>
        ,&nbsp;
        <a
          href="https://react.semantic-ui.com/"
          rel="noopener noreferrer"
          target="_blank"
          title="Semantic UI React"
        >
          Semantic UI React
        </a>
        , and&nbsp;
        <a
          href="https://fomantic-ui.com/"
          rel="noopener noreferrer"
          target="_blank"
          title="Fomantic UI"
        >
          Fomantic UI
        </a>
      </List.Item>
      <List.Item></List.Item>
      <List.Item></List.Item>
    </List>
    <br />
    <Header size="large">Creatives</Header>
    <p>
      Quizdini&apos;s <em>&quot;Rabbit Out of a Hat&quot;</em> logo was designed
      by&nbsp;
      <a
        href="https://www.kaylousberg.com/"
        rel="noopener noreferrer"
        target="_blank"
        title="Kay Lousberg - Freelance Vector Wizard"
      >
        Kay Lousberg
      </a>
      .
    </p>
  </Segment>
);
