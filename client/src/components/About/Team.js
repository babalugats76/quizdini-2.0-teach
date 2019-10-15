import React from 'react';
import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';

import SVG from '../UI/SVG';

export default () => (
  <div id="team">
    <Segment basic textAlign="center">
      <Header as="h1">The Team</Header>
    </Segment>
    <Grid className="member" stackable>
      <Grid.Row columns={2}>
        <Grid.Column className="member-title" floated="left">
          <Header as="h2">
            James Colestock
            <Header.Subheader>Creator &bull; Developer</Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column
          className="member-contact"
          floated="right"
          textAlign="right"
        >
          <a
            href="http://www.colestock.com"
            target="_blank"
            title="Visit James' Website"
          >
            <SVG name="globe" width="40px" height="40px" />
          </a>
          <a
            href="mailto:james@colestock.com"
            target="_blank"
            title="Email James"
          >
            <SVG name="mail" width="40px" height="40px" />
          </a>
          <a
            href="https://twitter.com/jamescolestock"
            target="_blank"
            title="@JamesColestock"
          >
            <SVG name="twitter" width="40px" height="40px" />
          </a>
          <a
            href="https://www.youtube.com/c/jamescolestock"
            target="_blank"
            title="YouTube - Colestock's Channel"
          >
            <SVG name="youtube" width="40px" height="40px" />
          </a>
          <a
            href="https://github.com/babalugats76"
            target="_blank"
            title="GitHub - babalugats76"
          >
            <SVG name="github" width="40px" height="40px" />
          </a>
          <a
            href="https://www.linkedin.com/in/jamescolestock/"
            target="_blank"
            title="Connect on LinkedIn"
          >
            <SVG name="linkedin" width="40px" height="40px" />
          </a>
          <a
            href="https://www.udemy.com/user/jamescolestock/"
            target="_blank"
            title="Connect on Udemy"
          >
            <SVG name="udemy" viewBox="0 0 144 64" width="40px" height="40px" />
          </a>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column className="member-bio">
          <Image
            alt="James Colestock with Dooder"
            circular
            floated="right"
            fluid
            inline
            spaced
            src="https://static.quizdini.com/images/james-and-dooder.jpg"
            style={{ maxWidth: '200px', marginTop: '4em' }}
          />
          <p>
            James Colestock is originally from&nbsp;
            <a
              href="https://www.visitfortwayne.com/"
              target="_blank"
              title="Visit Fort Wayne, IN"
            >
              Fort Wayne, IN
            </a>
            &nbsp;, a Midwestern town equidistant from Chicago, Detroit, and
            Cincinnati.
          </p>
          <p>
            He is a graduate of&nbsp;
            <a
              href="http://homestead.sacs.k12.in.us/"
              target="_blank"
              title="Homestead High School"
            >
              Homestead High School
            </a>
            &nbsp;and of nearby&nbsp;
            <a
              href="https://www.pfw.edu/"
              target="_blank"
              title="Purdue University Fort Wayne"
            >
              Indiana-Purdue at Fort Wayne
            </a>
            &nbsp;where he studied Business Administration and Computer Science.
          </p>
          <p>
            Before seguing into Education, James had a successful Information
            Technology career, primarily as a Database Administrator and
            Developer. He worked within organizations of every conceivable
            size&mdash;from startup to Fortune 500&mdash; and gained experience
            within nearly every sector of the economy.
          </p>
          <p>
            He holds multiple industry certifications and is a licensed teacher
            (grades 6-12) as well as Career and Technical Education (CTE)
            educator.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider section clearing />
  </div>
);
