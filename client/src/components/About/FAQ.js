import React from 'react';
import { Link } from 'react-router-dom';
import { Header, List, Segment, Step, Table } from 'semantic-ui-react';
import SVG from '../UI/SVG';

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
        created by <Link to="/about/team#james">James Colestock</Link> in 2013.
        In those days, there was a dearth of edtech tools available to provide
        students with practice opportunities and which gave teachers the ability
        to gauge their progress.
      </p>
      <p>
        A practice and learning tool made&nbsp;
        <strong>by teachers for teachers</strong>, Quizdini is targeted at
        educators of all content areas and levels.
      </p>
      <p>
        Quizdini is browser-based and works on most any classroom device/browser
        combination. Designed to be&nbsp;
        <strong>simple</strong>,&nbsp;
        <strong>straightforward</strong>, and to protect students&apos; privacy,
        Quizdini is something that any teacher can put to productive use,&nbsp;
        <strong>quickly</strong>.
      </p>
    </details>
    <details>
      <summary>What Can I Do With Quizdini?</summary>
      <p>
        The possibilities are endless; after all,&nbsp;
        <Link to="/about/philosophy#creativity">
          creativity is in the constraints
        </Link>
        . Quizdini shines as reinforcement in that sweet spot between
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
            <Table.Cell>
              Design a group race or row challenge in which students engage in
              friendly competition
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Whole-Class Review</strong>
            </Table.Cell>
            <Table.Cell>
              Use your projector or interactive whiteboard as part of a teacher-
              or student-led think-aloud
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
            <Table.Cell>
              Take your class to the computer lab for a day of study and
              reinforcement prior to &quot;The Big Test&quot;
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </details>
    <details>
      <summary>How Do I Create an Activity?</summary>
      <p>
        Currently, our classic&nbsp;<strong>Match Game</strong> is the only
        available activity.
      </p>
      <p>
        Assuming that you have&nbsp;<Link to="/register">registered</Link>
        &nbsp;and&nbsp;<Link to="/credits">purchased</Link> a handful of
        credits, the steps remain the same:
      </p>
      <Step.Group fluid vertical ordered>
        <Step>
          <SVG name="mouse-pointer" />
          <Step.Content>
            <Step.Title>Pick Activity</Step.Title>
            <Step.Description>Select From Dashboard</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <SVG name="database" />
          <Step.Content>
            <Step.Title>Enter Data</Step.Title>
            <Step.Description>Load Manually or Bulk</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <SVG name="play" />
          <Step.Content>
            <Step.Title>Save &amp; Test</Step.Title>
            <Step.Description>Perfect Your Activity</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <SVG name="link" />
          <Step.Content>
            <Step.Title>Copy URL</Step.Title>
            <Step.Description>Grab &amp; Shorten Link</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <SVG name="share" />
          <Step.Content>
            <Step.Title>Share</Step.Title>
            <Step.Description>Provide to Students</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    </details>
    <details>
      <summary>What Are the Technical Requirements?</summary>
      <Header size="small">TL;DR</Header>
      <p>
        With a couple of minor caveats, an Internet-connected&nbsp;
        <strong>computing device</strong> with an up-to-date&nbsp;
        <strong>browser</strong> is all students need to use Quizdini.
      </p>
      <Header size="small">Network Considerations:</Header>
      <p>
        If you are used to working in a school, then chances are that you are no
        stranger to aggressive, often draconian,&nbsp;
        <strong>Internet filtering</strong>. This could potentially impact your
        access to Quizdini.
      </p>
      <p>
        Should your students not be able to access your activities at school,
        then request that your organization&apos;s network administrator&nbsp;
        <strong>whitelist our domain</strong>, i.e., ask them to allow traffic
        from the&nbsp;<code>quizdini.com</code> second-level domain and its
        subdomains,&nbsp;<code>*.quizdini.com</code>. Refer them to our&nbsp;
        <Link to="/terms/privacy">privacy</Link> and&nbsp;
        <Link to="/terms/cookies">cookie</Link> policies to assuage their
        concerns.
      </p>
      <Header size="small">Recommended Computing Devices:</Header>
      <p>
        Although we strive for great mobile support, the truth is that&nbsp;
        <strong>Quizdini works best on tablets and desktops</strong>. Consider
        the target computing device when creating any activity and&nbsp;
        <strong>test in advance</strong> how things will work.
      </p>
      <Header size="small">Browser Compatibility:</Header>
      <p>
        Browser support can be tricky business; luckily, we have&nbsp;
        <a
          href="https://www.caniuse.com"
          rel="noopener noreferrer"
          target="_blank"
          title="Can I use... Support tables for HTML5, CSS3, etc"
        >
          caniuse
        </a>
        . The following lists the&nbsp;<strong>major features</strong>
        &nbsp; that your browser should support:
      </p>
      <List as="ul" bulleted relaxed>
        <List.Item as="li">
          <a
            href="https://caniuse.com/#feat=mdn-javascript_builtins_set"
            rel="noopener noreferrer"
            target="_blank"
            title="JavaScript built-in: Set"
          >
            JavaScript built-in: Set
          </a>
        </List.Item>
        <List.Item as="li">
          <a
            href="https://caniuse.com/#feat=mdn-javascript_builtins_map"
            rel="noopener noreferrer"
            target="_blank"
            title="JavaScript built-in: Map"
          >
            JavaScript built-in: Map
          </a>
        </List.Item>
        <List.Item as="li">
          <a
            href="https://caniuse.com/#feat=flexbox"
            rel="noopener noreferrer"
            target="_blank"
            title="CSS Flexible Box Layout Module"
          >
            CSS Flexible Box Layout Module
          </a>
        </List.Item>
        <List.Item as="li">
          <a
            href="https://caniuse.com/#feat=css-grid"
            rel="noopener noreferrer"
            target="_blank"
            title="CSS Grid Layout (level 1)"
          >
            CSS Grid Layout (level 1)
          </a>
        </List.Item>
        <List.Item as="li">
          <a
            href="https://caniuse.com/#feat=css-line-clamp"
            rel="noopener noreferrer"
            target="_blank"
            title="CSS line-clamp"
          >
            CSS line-clamp
          </a>
        </List.Item>
      </List>
    </details>
    <details>
      <summary>What Does It Cost?</summary>
      <p>
        Explain credit-based, pay-to-create model. Refer to philosophy and
        include verbiage about how credits cannot last forever.
      </p>
    </details>
    <details>
      <summary>Why Can't I See My Students' Results?</summary>
      <p>
        Privacy. Refer to Formative in Philosophy. Boiling kids down to numbers.  Taking the fun out of things. It is important that students self-grade and own their learning.
      </p>
    </details>
    <details>
      <summary>Can I create student accounts? Shared accounts?</summary>
      <p>No and no...explanation</p>
    </details>
    <details>
      <summary>Quizdini looks different. What's new?</summary>
      <p>Short list of what is new</p>
    </details>
  </Segment>
);
