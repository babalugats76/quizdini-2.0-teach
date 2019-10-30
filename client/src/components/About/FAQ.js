import React from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      Frequently Asked Questions
    </Header>
    <br />
    <details>
      <summary>What is Quizdini?</summary>
      <p>
        Quizdini is an&nbsp;<strong>online learning tool</strong> that was
        created by James Colestock in 2013. In those days, there was a dearth of
        edtech tools available to provide students with practice opportunities
        and which gave teachers the ability to gauge their progress.
      </p>
      <p>
        A practice and learning tool made&nbsp;
        <strong>by teachers for teachers</strong>, Quizdini is targeted at
        educators of all content areas and levels. Quizdini is browser-based and
        works on most any classroom device/up-to-date browser combination.
        Designed to be&nbsp;<strong>simple</strong>,&nbsp;
        <strong>straightforward</strong>, and to protect students&apos; privacy,
        Quizdini is something that any teacher can put to productive use,&nbsp;
        <strong>quickly</strong>.
      </p>
    </details>
    <details>
      <summary>What Can I Do With Quizdini?</summary>
      <p>
        The possibilities are endless; after all, creativity is in the
        constraints. Quizdini shines as reinforcement in that sweet spot between
        introduction and application of new material. In practice, here are the
        most popular use cases:
      </p>
      <Table celled stackable collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Use Case</Table.HeaderCell>
            <Table.HeaderCell>Example</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <strong>Class Competitions</strong>
            </Table.Cell>
            <Table.Cell>Design a group race or row challenge in which students engage in friendly competition</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Whole-Class Review</strong>
            </Table.Cell>
            <Table.Cell>
              Use your projector or interactive whiteboard as part of a teacher- or student-led think-aloud
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Individualized Instruction</strong>
            </Table.Cell>
            <Table.Cell>
              Build an activity, customized for a struggling student
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Unit Review</strong>
            </Table.Cell>
            <Table.Cell>Take your class to the computer lab for a day of study and reinforcement prior to &quot;The Big Test&quot;</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </details>
    <details>
      <summary>How do I create an activity?</summary>
      <p>
        Pick the game type. Currently, 'match' is the only option. Enter game
        information, e.g., enter terms/definitions, upload vocab list, etc.,
        save your work, share the link; alternatively use a URL shortener
        (perhaps include links in body of this response)
      </p>
    </details>
    <details>
      <summary>What are the technical requirements?</summary>
      <p>
        Computing device. Internet connection. Up-to-date browser. Whilelist of
        quizdini domains inside your oppressive educational organization.
      </p>
    </details>
    <details>
      <summary>What does it cost?</summary>
      <p>
        Explain credit-based, pay-to-create model. Refer to philosophy and
        include verbiage about how credits cannot last forever.
      </p>
    </details>
    <details>
      <summary>Why can't I see my students' results?</summary>
      <p style={{ fontSize: '1.1em' }}>
        Privacy. Refer to Formative in Philosophy.
      </p>
    </details>
    <details>
      <summary>Can I create student accounts? Shared accounts?</summary>
      <p style={{ fontSize: '1.1em' }}>No and no...explanation</p>
    </details>
    <details>
      <summary>Quizdini looks different. What's new?</summary>
      <p>Short list of what is new</p>
    </details>
  </Segment>
);
