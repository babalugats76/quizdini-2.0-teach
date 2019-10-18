import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      Frequently Asked Questions
    </Header>
    <br />
    <details style={{ marginBottom: '2em' }}>
      <summary
        style={{
          fontSize: '1.71428571rem',
          fontFamily: 'marcher-semibold',
          marginBottom: '.5em'
        }}
      >
        Who should use it?
      </summary>
      <p style={{ fontSize: '1.1em' }}>
        As an evolving tool, Quizdini allows YOU to create the material your
        students will use. Will we write your questions for you? No. Will we
        support you as you build a collection of activities that help your
        students learn, practice, and review? Heck, yes!
      </p>
    </details>
    <details style={{ marginBottom: '2em' }}>
      <summary
        style={{
          fontSize: '1.71428571rem',
          fontFamily: 'marcher-semibold',
          marginBottom: '.5em'
        }}
      >
        Who should use it?
      </summary>
      <p style={{ fontSize: '1.1em' }}>
        As an evolving tool, Quizdini allows YOU to create the material your
        students will use. Will we write your questions for you? No. Will we
        support you as you build a collection of activities that help your
        students learn, practice, and review? Heck, yes!
      </p>
    </details>
  </Segment>
);
