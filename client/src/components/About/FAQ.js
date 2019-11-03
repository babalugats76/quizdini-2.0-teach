import React from 'react';
import { Link } from 'react-router-dom';
import { Header, List, Segment, Step, Table } from 'semantic-ui-react';
import Icon from '../UI/Icon';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      Frequently Asked Questions
    </Header>
    <br />
    <details id="what-is-quizdini">
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
    <details id="what-can-i-do">
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
    <details id="how-to-create-an-activity">
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
          <Icon name="mouse-pointer" />
          <Step.Content>
            <Step.Title>Pick Activity</Step.Title>
            <Step.Description>Select From Dashboard</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Icon name="edit" />
          <Step.Content>
            <Step.Title>Enter Data</Step.Title>
            <Step.Description>Load Manually or Bulk</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Icon name="play" />
          <Step.Content>
            <Step.Title>Save &amp; Test</Step.Title>
            <Step.Description>Perfect Your Activity</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Icon name="link" />
          <Step.Content>
            <Step.Title>Copy URL</Step.Title>
            <Step.Description>Grab &amp; Shorten Link</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Icon name="share" />
          <Step.Content>
            <Step.Title>Share</Step.Title>
            <Step.Description>Provide to Students</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    </details>
    <details id="technical-requirements">
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
        &nbsp;that your browser should support:
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
    <details id="what-does-it-cost">
      <summary>What Does It Cost?</summary>
      <p>
        Yup, with Quizdini,&nbsp;
        <Link to="/about/philosophy#pay-to-play">you gotta pay to play</Link>.
        We don&apos;t charge to get rich. Instead, we charge to keep this&nbsp;
        <strong>passion project</strong>&nbsp;alive and to&nbsp;
        <strong>cover our costs</strong>. In spirit, this project is kind of
        like an&nbsp;<strong>educational cooperative</strong> in which we, as
        teachers,&nbsp;<strong>pool our resources</strong> and chip in relative
        to what we use.
      </p>
      <p>
        To achieve this end, we employ a model in which&nbsp;
        <strong>users buy credits</strong> that can be&nbsp;
        <strong>exchanged for services</strong>&nbsp;on the site, e.g., each
        Match Game costs 1 credit. When it comes to purchasing credits, you
        receive a&nbsp;<strong>price break</strong> the more you spend:
      </p>
      <Table id="rate-schedule" celled stackable textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Header size="medium">
                Quizdini - Rate Schedule&nbsp;
                <sup>[1]</sup>
                <sup>[2]</sup>
              </Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              Effective Jan. 1<sup>st</sup>, 2020
            </Table.HeaderCell>
            <Table.HeaderCell collapsing>Credits</Table.HeaderCell>
            <Table.HeaderCell collapsing>Cost</Table.HeaderCell>
            <Table.HeaderCell collapsing>Unit Cost</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              <strong>Option #1</strong>
            </Table.Cell>
            <Table.Cell collapsing>5</Table.Cell>
            <Table.Cell collapsing>$5</Table.Cell>
            <Table.Cell collapsing>$1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <strong>Option #2</strong>
            </Table.Cell>
            <Table.Cell collapsing>12</Table.Cell>
            <Table.Cell collapsing>$10</Table.Cell>
            <Table.Cell collapsing>83&#162;</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <strong>Option #3</strong>
            </Table.Cell>
            <Table.Cell collapsing>20</Table.Cell>
            <Table.Cell collapsing>$15</Table.Cell>
            <Table.Cell collapsing>75&#162;</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <strong>Option #4</strong>
            </Table.Cell>
            <Table.Cell collapsing>30</Table.Cell>
            <Table.Cell collapsing>$20</Table.Cell>
            <Table.Cell collapsing>67&#162;</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row textAlign="left">
            <Table.HeaderCell colSpan="4">
              <p id="lifetime-members">
                <sup>[1]</sup>&nbsp;Our payment model has changed with the
                latest release of Quizdini.&nbsp;
                <strong>Charter members</strong> of Quizdini&mdash;those who
                signed up between 2013 and 2019&mdash;have been&nbsp;
                <strong>grandfathered in</strong>&nbsp;and have been
                issued&nbsp;
                <strong>100 credits</strong>.
              </p>
              <p id="credit-expiration">
                <sup>[2]</sup>&nbsp;Our goal is to honor credits for as long as
                humanly possible. At the same time, we must set forth a
                reasonable policy that frees us from having to honor credits
                until the end of time. From a contractual standpoint, we will
                honor all credits&nbsp;
                <strong>
                  for&nbsp;<u>at least</u>&nbsp;365 calendar days
                </strong>
                &nbsp;from the date of purchase. Any change impacting
                users&apos; ability to use their credits will be communicated
                promptly, in advance.
              </p>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </details>
    <details id="student-results">
      <summary>Why Can't I See My Students' Results?</summary>
      <p>
        Because we have no interest in storing&nbsp;
        <strong>Personally Identifiable Information</strong>&nbsp;of students.
        In fact, we have gone to great lengths to protect and honor students'
        privacy throughout the development of Quizdini. If you want to learn
        more, please see our&nbsp;<Link to="/terms/privacy">privacy</Link>
        &nbsp;policy.
      </p>
      <p>
        That notwithstanding, it is our view that&nbsp;
        <Link to="/about/philosophy#formative">everything is formative</Link>.
        As educators, we want to promote the use of the kind of&nbsp;
        <strong>informal feedback</strong>
        &nbsp;that kids find most valuable. Ultimately, we want to make tools
        that put students in the driver's seat so that they can take charge via
        self-grading and self-assessment. Nowadays, there is no shortage of
        analytical and summative tools that, unfortunately, do a great job
        of&nbsp;
        <strong>boiling kids down to numbers</strong>. In the end, we just
        don&apos;t want to be one of them.
      </p>
    </details>
    <details id="student-and-shared-accounts">
      <summary>Can I Create Student Accounts? Shared Accounts?</summary>
      <p>
        The creation and/or use of either student or so-called &quot;shared
        accounts&quot; violates both the letter and spirit of our&nbsp;
        <Link to="/terms">terms of service</Link>. As such, we reserve the right
        to&nbsp;<strong>remove accounts</strong>&nbsp;that violate this policy.
      </p>
    </details>
    <details id="whats-new">
      <summary>Quizdini Looks Different. What&apos;s New?</summary>
      <p>
        After seven years, Quizdini really&nbsp;
        <strong>needed an overhaul</strong>. The original implementation of
        Quizdini was really just a&nbsp;<strong>rock-solid prototype</strong>,
        and it truly worked well! At the same time, technology was passing her
        by, so it was time to make her a little more&nbsp;
        <strong>bad and boujee</strong>, so to speak.
      </p>
      <p>
        What&apos;s changed with Quizdini? In a word:&nbsp;
        <strong>everything</strong>. Notwithstanding the countless
        behind-the-scenes upgrades, long-time users should note the following
        developments:
      </p>
      <Table id="whats-new" celled stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Change</Table.HeaderCell>
            <Table.HeaderCell>Rationale</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>OAuth Support</Table.Cell>
            <Table.Cell>
              In addition to supporting local accounts, we now support&nbsp;
              <strong>logging in with Google</strong>&nbsp;via OAuth 2.0. We
              added this because you don't need yet another password!
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Credit-based Model</Table.Cell>
            <Table.Cell>
              We switched to a&nbsp;<strong>pay-for-what-you-use</strong>
              &nbsp;structure. Our goal was to put Quizdini on a sustainable
              path and respect the fact that some people use the service more
              than others.
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>New Payment Processor</Table.Cell>
            <Table.Cell>
              We switched from PayPal to&nbsp;
              <a
                href="https://stripe.com/"
                rel="noopener noreferrer"
                target="_blank"
                title="Online payment processing for internet businesses - Stripe"
              >
                Stripe
              </a>
              . This was done to provide users a&nbsp;
              <strong>secure</strong>, one-click checkout experience. We now
              accept&nbsp;
              <strong>all major credit cards</strong>, worldwide.
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Match Game Redesign</Table.Cell>
            <Table.Cell>
              <p>
                The&nbsp;<strong>Match Game</strong>&nbsp;activity has been
                completely redesigned.
              </p>
              <p>
                We added the ability to&nbsp;<strong>bulk load</strong> whether
                by comma-delimited file (.csv) or through the bulk-text editor.
                Now, you can create an activity&nbsp;<strong>in seconds</strong>
                .
              </p>
              <p>
                You&apos;ll also notice additional game play&nbsp;
                <strong>options</strong>:
              </p>
              <List bulleted relaxed>
                <List.Item>
                  <strong>Timer</strong>
                </List.Item>
                <List.Item>
                  <strong>Flexible Layouts</strong>
                </List.Item>
                <List.Item>
                  <strong>Color Schemes</strong>
                </List.Item>
              </List>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Multiple Choice Game Removal</Table.Cell>
            <Table.Cell>
              The&nbsp;<strong>Multiple Choice</strong>&nbsp;activity was&nbsp;
              <strong>not brought forward</strong>&nbsp;as part of this new
              generation of Quizdini. We simply were not able to recreate
              everything in one fell swoop. It is our intention, however, to
              bring back&nbsp;
              <strong>a reimagined version</strong> of it in the&nbsp;
              <strong>near future</strong>.
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <p>
        The&nbsp;<strong>biggest impact</strong>&nbsp;to existing users will be
        the fact that they will have to&nbsp;
        <strong>recreate existing activities</strong>&nbsp;within the new
        system. The hope was that our new bulk-editing capabilites would make
        this process as painless as possible. We consider all this&nbsp;
        <strong>the cost of progress</strong>, but at the same time apologize
        for the inconvenience!
      </p>
    </details>
  </Segment>
);
